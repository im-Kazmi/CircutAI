import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";
type ResponseType = InferResponseType<
  (typeof client.api.circut)[":id"]["$get"],
  200
>;

export const useGetCircut = (id: string) => {
  const query = useQuery<ResponseType, Error>({
    enabled: !!id,
    queryKey: ["circuts", { id }],
    queryFn: async () => {
      const res = await client.api.circut[":id"].$get({
        param: {
          id,
        },
      });

      if (!res.ok) {
        throw new Error("error getting circut!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
