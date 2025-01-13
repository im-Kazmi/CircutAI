import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";

type ResponseType = InferResponseType<
  typeof client.api.document.list.$get,
  200
>;

export const useGetDocuments = (memoryId: string) => {
  const query = useQuery<ResponseType>({
    queryKey: ["document", { memoryId }],
    queryFn: async () => {
      const res = await client.api.document.list.$get({
        query: {},
        param: { memoryId },
      });

      if (!res.ok) {
        throw new Error("error getting documents!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
