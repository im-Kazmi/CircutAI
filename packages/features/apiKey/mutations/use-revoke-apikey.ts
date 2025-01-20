import { client } from "@repo/hono/client";
import { useMutation, useQueryClient } from "@repo/react-query";

export const useRevokeApiKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await client.api["api-key"][":id"].$delete({
        param: {
          id,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to revoke API key");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    },
  });
};
