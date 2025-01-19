import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Play, Copy } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/design-system/components/ui/tabs";
import { Circut } from "@prisma/client";

type CircutChanged = Omit<Circut, "createdAt" | "updatedAt">;

type Props = {
  circut: CircutChanged;
};

export function Playground({ circut }: Props) {
  return (
    <div className=" bg-muted/10 ">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          <h3 className="font-medium">Playground</h3>
        </div>
        <Button size="sm" className="gap-2">
          Run
          <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>⏎
          </kbd>
        </Button>
      </div>
      <div className="p-4">
        <Tabs defaultValue="code">
          <TabsList className="mb-4">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <Card className="w-[500px]">
              <CardHeader className="flex flex-row items-center justify-between py-2">
                <CardTitle className="text-sm font-medium">
                  JavaScript
                </CardTitle>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="text-sm text-muted-foreground">
                  <code>{`// Your code here
const response = await ai.chat.completions.create({
  messages: [{ role: "user", content: "Hello!" }],
  model: "gpt-4",
});`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="output">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  No output yet. Run your code to see results.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
