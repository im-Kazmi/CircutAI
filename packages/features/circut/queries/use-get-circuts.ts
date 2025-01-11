import { client } from "@repo/hono/client";
import type { InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";

type ResponseType = InferResponseType<typeof client.api.circut.list.$get, 200>;

export const useGetCircuts = () => {
  const query = useQuery<ResponseType>({
    queryKey: ["circuts"],
    queryFn: async () => {
      const res = await client.api.circut.list.$get({ query: {} });

      if (!res.ok) {
        throw new Error("error getting circuts!");
      }

      const data = await res.json();

      return data;
    },
  });

  return query;
};
