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

export function Keysets() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Keysets</CardTitle>
        <CardDescription>
          Set profile or pipe level LLM API keyset
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="user" className="flex-1">
              USER LEVEL KEYS
            </TabsTrigger>
            <TabsTrigger value="pipe" className="flex-1">
              PIPE LEVEL KEYS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="user" className="space-y-1">
            {PROVIDERS.map((provider) => (
              <ProviderRow key={provider.type} {...provider} />
            ))}
          </TabsContent>
          <TabsContent value="pipe" className="space-y-1">
            {PROVIDERS.map((provider) => (
              <ProviderRow key={provider.type} {...provider} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
