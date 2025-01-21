import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { PROVIDERS } from "@/app/utils/constants";
import { ProviderRow } from "./provider-row";

export function Keysets() {
  return (
    <Card className="min-w-96 mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>Keysets</CardTitle>
        <CardDescription>Configure your LLM keys.</CardDescription>
      </CardHeader>
      <CardContent>
        {PROVIDERS.map((provider) => (
          <ProviderRow key={provider.type} {...provider} />
        ))}
      </CardContent>
    </Card>
  );
}
