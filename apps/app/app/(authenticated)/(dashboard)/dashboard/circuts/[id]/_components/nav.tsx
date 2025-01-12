"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/design-system/lib/utils";
import {
  PipetteIcon as Pipe,
  Network,
  MessageSquare,
  BarChart2,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Pipe",
    href: "/pipe",
    icon: Pipe,
  },
  {
    title: "API",
    href: "/api",
    icon: Network,
  },
  {
    title: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Usage",
    href: "/usage",
    icon: BarChart2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 border-b px-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary py-4",
            pathname === item.href
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
