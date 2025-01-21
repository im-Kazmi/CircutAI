import { Badge } from "@repo/design-system/components/ui/badge";
import { LLMType } from "@repo/database";
import { useCheckApiKey } from "@repo/features/apiKey/queries";
import { PROVIDERS } from "@/app/utils/constants";
import { ReactNode } from "react";
import { useModelKeyDialog } from "@/app/store/use-model-key-dialog";

export function ProviderRow({
  name,
  type,
  icon,
}: {
  name: string;
  type: string;
  icon: ReactNode;
}) {
  const { data, isLoading } = useCheckApiKey(type);

  const { onOpen } = useModelKeyDialog();
  return (
    <div
      onClick={() =>
        onOpen({
          id: data?.apiKey?.id!,
          key: data?.apiKey?.key!,
          type: type,
        })
      }
      className="flex items-center justify-between cursor-pointer p-4 hover:bg-accent rounded-lg"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{name}</span>
      </div>
      {isLoading ? (
        <div className="h-6 w-16 animate-pulse bg-muted rounded" />
      ) : data?.exists ? (
        <Badge className="bg-green-500/15 text-green-500">LIVE</Badge>
      ) : (
        <div>no key</div>
      )}
    </div>
  );
}
