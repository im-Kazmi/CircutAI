import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useMutation, useQueryClient } from "@repo/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.circut)[":id"]["$put"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.circut)[":id"]["$put"]
>["json"];

export const useUpdateCircut = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.circut[":id"]["$put"]({
        json: json,
        param: {
          id: id,
        },
      });

      if (!res.ok) {
        throw new Error("cannot update circut!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["circuts"] });
    },
    onError: () => {},
  });

  return mutation;
};
