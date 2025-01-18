import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useMutation, useQueryClient } from "@repo/react-query";

type ResponseType = InferResponseType<(typeof client.api.circut)["$post"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.circut)["$post"]
>["json"];

export const useCreateCircut = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.circut["$post"]({
        json: json,
      });

      if (!res.ok) {
        throw new Error("cannot create circut!");
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
