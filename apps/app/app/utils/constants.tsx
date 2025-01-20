import { MistralIcon } from "@/app/icons/mistral";
import { AnthropicIcon } from "@/app/icons/anthropic";
import { MetaIcon } from "@/app/icons/meta";
import { OpenAIIcon } from "@/app/icons/openai";
import { DeepSeekIcon } from "@/app/icons/deepseek";
import { CohereIcon } from "@/app/icons/cohere";
import { GoogleIcon } from "@/app/icons/google";

export const iconMap: any = {
  mistral: <MistralIcon />,
  deepSeek: <DeepSeekIcon />,
  openAi: <OpenAIIcon />,
  google: <GoogleIcon />,
  meta: <MetaIcon />,
  anthropic: <AnthropicIcon />,
  xAi: <MistralIcon />,
  cohere: <MistralIcon />,
};

export const PROVIDERS = [
  { name: "OpenAI", type: "OPENAI", icon: <OpenAIIcon /> },
  { name: "Together", type: "TOGETHER", icon: <OpenAIIcon />},
  { name: "Anthropic", type: "ANTHROPIC", icon: <AnthropicIcon /> },
  { name: "Google", type: "GOOGLE", icon:  <GoogleIcon />},
  { name: "Groq", type: "GROQ", icon:  <OpenAIIcon />,
  { name: "Cohere", type: "COHERE", icon: <MistralIcon />},
  { name: "Fireworks AI", type: "FIREWORKS", icon:  <OpenAIIcon />},
] as const;
