"use client";

import { useState } from "react";
import { Button } from "@repo/design-system/components/ui/button";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { FileText, History, User, Bot } from "lucide-react";
import { cn } from "@repo/design-system/lib/utils";

export function PromptEditor() {
  const [messageType, setMessageType] = useState<"user" | "assistant">("user");

  return (
    <Card className="rounded-xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-4 px-0">
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2 text-lg font-medium">
            <FileText className="h-5 w-5" />
            System Instructions
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Examples
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        <Textarea
          placeholder="You are a helpful AI assistant..."
          className="min-h-[300px] resize-none rounded-xl border-muted bg-muted/50 p-4"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                messageType === "user" && "bg-accent text-accent-foreground",
              )}
              onClick={() => setMessageType("user")}
            >
              <User className="h-4 w-4" />
              Add User Message
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                messageType === "assistant" &&
                  "bg-accent text-accent-foreground",
              )}
              onClick={() => setMessageType("assistant")}
            >
              <Bot className="h-4 w-4" />
              Add AI Response
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
