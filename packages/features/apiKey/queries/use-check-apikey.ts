import { client } from "@repo/hono/client";
import type { InferRequestType, InferResponseType } from "@repo/hono";
import { useQuery } from "@repo/react-query";
import { LLMType } from "@/repo/database";

type CheckKeyResponse = InferResponseType<
  (typeof client.api)["api-key"][":type"]["$get"],
  200
>;

export const useCheckApiKey = (type: LLMType) => {
  return useQuery<CheckKeyResponse>({
    queryKey: ["api-keys", type],
    queryFn: async () => {
      const res = await client.api["api-key"][":type"].$get({
        param: {
          type,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to check API key status");
      }

      return res.json();
    },
  });
};
