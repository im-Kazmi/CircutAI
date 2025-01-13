import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";
type ResponseType = InferResponseType<
  (typeof client.api.memory)[":id"]["$get"],
  200
>;

export const useGetMemory = (id: string) => {
  const query = useQuery<ResponseType, Error>({
    enabled: !!id,
    queryKey: ["memory", { id }],
    queryFn: async () => {
      const res = await client.api.memory[":id"].$get({
        param: {
          id,
        },
      });

      if (!res.ok) {
        throw new Error("error getting memory!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
