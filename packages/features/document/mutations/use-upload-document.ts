import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useMutation, useQueryClient } from "@repo/react-query";

type ResponseType = InferResponseType<typeof client.api.document.$post, 200>;
// type RequestType = InferRequestType<typeof client.api.document.$post>["form"];

export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, any>({
    mutationFn: async (form) => {
      const res = await client.api.document.$post(form, {});

      if (!res.ok) {
        throw new Error("cannot create document!");
      }

      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["document"] });
    },
    onError: () => {},
  });

  return mutation;
};
