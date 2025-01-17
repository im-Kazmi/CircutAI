import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: "",
});

const index = pc.index("myindex");
const model = "multilingual-e5-large";

const data = [
  {
    id: "vec1",
    text: "Apple is a popular fruit known for its sweetness and crisp texture.",
  },
  {
    id: "vec2",
    text: "The tech company Apple is known for its innovative products like the iPhone.",
  },
  { id: "vec3", text: "Many people enjoy eating apples as a healthy snack." },
  {
    id: "vec4",
    text: "Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.",
  },
  {
    id: "vec5",
    text: "An apple a day keeps the doctor away, as the saying goes.",
  },
  {
    id: "vec6",
    text: "Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.",
  },
];

async function main() {
  const embeddingsResponse = await pc.inference.embed(
    model,
    data.map((d) => d.text),
    { inputType: "passage", truncate: "END" },
  );

  const embeddings = embeddingsResponse?.data;

  if (!embeddings) {
    console.log("No embeddings generated");
    return;
  }

  const vectorsWithMetadata = embeddings.map((embedding, index) => ({
    id: data[index].id,
    values: embedding.values,
    metadata: {
      text: data[index].text,
      timestamp: new Date().toISOString(),
    },
  }));

  await storeEmbeddings({
    embeddings: vectorsWithMetadata,
    memoryId: "asdfasdfasdf",
  });
}

async function storeEmbeddings(data) {
  if (!data.embeddings || data.embeddings.length === 0) {
    console.log("No embeddings to store");
    return;
  }

  try {
    await index.namespace("test").upsert(data.embeddings);
    console.log("Vectors stored with metadata successfully");
  } catch (err) {
    console.error("Error storing vectors:", err);
  }
}

async function query() {
  try {
    const userEmbedding = await pc.inference.embed(
      model,
      ["who was steve jobs?"],
      {
        inputType: "passage",
        truncate: "END",
      },
    );

    if (!userEmbedding.data[0].values) {
      console.log("No query embedding generated");
      return;
    }

    const matches = await queryIndex(userEmbedding.data[0].values);

    if (!matches) {
      console.log("No matches found");
      return;
    }

    console.log("Query Results:");
    matches.forEach((match, index) => {
      console.log(`\nMatch ${index + 1}:`);
      console.log(`Text: ${match.text}`);
      console.log(`Score: ${match.score}`);
      console.log(`Document ID: ${match.documentId}`);
    });
  } catch (error) {
    console.error("Error during query:", error);
  }
}

async function queryIndex(queryVector, topK = 5) {
  try {
    const results = await index.namespace("test").query({
      vector: queryVector,
      topK,
      includeMetadata: true,
      includeValues: false,
    });

    return results.matches?.map((match) => match);
  } catch (err) {
    console.error("Error querying index:", err);
    return null;
  }
}

// Run the example
async function runExample() {
  console.log("Storing embeddings...");
  await main();

  console.log("\nQuerying embeddings...");
  await query();
}

runExample();
