import {
  EmbeddingsList,
  IndexModel,
  Pinecone,
} from "@pinecone-database/pinecone";

const pc = new Pinecone({
  // apiKey: process.env.PINECONE_API_KEY!,
  apiKey: "",
});

const index = pc.index("myindex");
const model = "multilingual-e5-large";

interface EmbeddingData {
  text: string;
  metadata?: {
    documentId?: string;
    chunkIndex?: number;
    fileName?: string;
    text?: string;
    [key: string]: any;
  };
}

export class PineconeService {
  async generateEmbeddings(
    data: EmbeddingData[],
  ): Promise<EmbeddingsList | null> {
    try {
      const embeddings = await pc.inference.embed(
        model,
        data.map((d) => d.text),
        { inputType: "passage", truncate: "END" },
      );

      return embeddings;
    } catch (err) {
      console.error("Error generating embeddings:", err);
      return null;
    }
  }

  async createIndex(name: string): Promise<void | IndexModel> {
    const index = await pc.createIndex({
      name: name,
      dimension: 1024,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });

    return index;
  }

  async storeEmbeddings(data: {
    embeddings: {
      id: string;
      values: number[];
      metadata: {
        text: string;
        documentId?: string;
        chunkIndex?: number;
        fileName?: string;
        [key: string]: any;
      };
    }[];
    memoryId: string;
  }) {
    if (!data.embeddings || data.embeddings.length === 0) {
      console.error("No embeddings provided for storage");
      return;
    }

    try {
      const vectorsWithMetadata = data.embeddings.map((embedding) => ({
        ...embedding,
        metadata: {
          ...embedding.metadata,
          text: embedding.metadata.text || "",
        },
      }));

      await index.namespace(data.memoryId).upsert(vectorsWithMetadata);
      console.log(
        `Successfully stored ${vectorsWithMetadata.length} vectors with metadata`,
      );
    } catch (err) {
      console.error("Error storing embeddings:", err);
      throw err;
    }
  }

  async queryIndex(
    memoryId: string,
    queryVector: number[],
    topK = 5,
    filter?: object,
  ) {
    try {
      const results = await index.namespace(memoryId).query({
        vector: queryVector,
        topK,
        includeMetadata: true,
        filter: filter,
      });

      return (
        results.matches?.map((match) => ({
          ...match,
          metadata: {
            ...match.metadata,
            text: match.metadata?.text || "",
          },
        })) || []
      );
    } catch (err) {
      console.error("Error querying index:", err);
      return null;
    }
  }
}
