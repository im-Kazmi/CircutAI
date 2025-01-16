import {
  EmbeddingsList,
  IndexModel,
  Pinecone,
} from "@pinecone-database/pinecone";
import { Embedding } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/inference";

const pc = new Pinecone({
  apiKey:
    "pcsk_wqbLD_HsGgvMtzUVpXteUhpwdPaHKWjjqob1YiYKbhC2GtKnpCWp8ntVVfkx9VqwHFx54",
});

const index = pc.index("myindex");

const model = "multilingual-e5-large";

export class PineconeService {
  async generateEmbeddings(
    data: {
      text: string;
    }[],
  ): Promise<EmbeddingsList | null> {
    try {
      const embeddings = await pc.inference.embed(
        model,
        data.map((d) => d.text),
        { inputType: "passage", truncate: "END" },
      );

      return embeddings;
    } catch (err) {
      console.log(err);
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

  async storeEmbeddings(
    data: {
      embeddings: { id: string; values: number[] }[];
      memoryId: string;
      metadata: any;
    },
    documentId: string,
  ) {
    if (!data.embeddings) {
      console.log("there is no embedding");
      return;
    }

    console.log(data);
    try {
      await index.namespace(data.memoryId).upsert(data.embeddings);

      console.log("vectors stored");
    } catch (err) {
      console.log(err);
    }
  }
}
