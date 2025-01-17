import { Pinecone } from "@pinecone-database/pinecone";
import { time } from "console";
const pc = new Pinecone({
  apiKey:
    "pcsk_wqbLD_HsGgvMtzUVpXteUhpwdPaHKWjjqob1YiYKbhC2GtKnpCWp8ntVVfkx9VqwHFx54",
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

  console.log(embeddings);

  const asdf = embeddings?.map((embedding, index) => ({
    id: data[index].id, // Use the original `id` from the `data` array
    values: embedding.values,
    metadata: { text: data[index].text }, // Access the `text` property correctly
  }));

  if (!asdf || !asdf.values) {
    console.log("there is no embedding data");
    return;
  }

  await storeEmbeddings(
    {
      embeddings: asdf,
      texts: data.map((d) => d.text),
      memoryId: "asdfasdfasdf",
      metadata: {},
    },
    "document.id",
  );
}

async function storeEmbeddings(data, documentId) {
  if (!data.embeddings) {
    console.log("there is no embedding");
    return;
  }

  const embeddingsWithMetadata = data.embeddings.map((embedding, index) => ({
    id: embedding.id,
    values: embedding.values,
    metadata: { text: data.texts[index], documentId },
  }));

  console.log(embeddingsWithMetadata);

  try {
    await index.namespace("test").upsert(embeddingsWithMetadata);

    console.log("vectors stored with metadata");
  } catch (err) {
    console.log(err);
  }
}

main();

async function query() {
  const userEmbedding = await pc.inference.embed(
    model,
    ["who was steve jobs?"],
    {
      inputType: "passage",
      truncate: "END",
    },
  );

  const matches = await queryIndex(userEmbedding.data[0].values);

  // Extract the text and other metadata from the matches
  const results = matches.map((match) => ({
    id: match.id,
    text: match.metadata, // Metadata includes the original text
    score: match.score, // Relevance score
  }));

  console.log("Results = ", results);
}

async function queryIndex(queryVector, topK = 5) {
  try {
    const results = await index.namespace("test").query({
      vector: queryVector,
      topK,
      includeMetadata: true,
    });

    return results.matches;
  } catch (err) {
    console.log("Error querying index:", err);
    return null;
  }
}

query();
