import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useMutation, useQueryClient } from "@repo/react-query";

type ResponseType = InferResponseType<
  (typeof client.api)["api-key"][":id"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api)["api-key"][":id"]["$put"]
>["json"];

export const useUpdateApiKey = (id: string, type: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api["api-key"][":id"]["$put"]({
        json: json,
        param: {
          id: id,
        },
      });

      if (!res.ok) {
        throw new Error("cannot update api Key!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys", { type }] });
    },
    onError: () => {},
  });

  return mutation;
};
