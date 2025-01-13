import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";
type ResponseType = InferResponseType<
  (typeof client.api.document)[":id"]["$get"],
  200
>;

export const useGetDocument = (id: string) => {
  const query = useQuery<ResponseType, Error>({
    enabled: !!id,
    queryKey: ["document", { id }],
    queryFn: async () => {
      const res = await client.api.document[":id"].$get({
        param: {
          id,
        },
      });

      if (!res.ok) {
        throw new Error("error getting document!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
