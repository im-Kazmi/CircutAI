import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";

type ResponseType = InferResponseType<typeof client.api.memory.list.$get, 200>;

export const useGetMemories = () => {
  const query = useQuery<ResponseType>({
    queryKey: ["memory"],
    queryFn: async () => {
      const res = await client.api.memory.list.$get({ query: {} });

      if (!res.ok) {
        throw new Error("error getting memories!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
