import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useMutation, useQuery, useQueryClient } from "@repo/react-query";
import { LLMType } from "@/repo/database";

type RequestType = InferRequestType<
  (typeof client.api)["api-key"]["$post"]
>["json"];

export const useCreateApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api["api-key"].$post({
        json,
      });

      if (!res.ok) {
        throw new Error("Failed to create API key");
      }

      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
};
