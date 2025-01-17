export type CircutUpdateInput = {
  id?: string;
  name?: string;
  apiKey?: string;
  privacy?: string;
  description?: string | null;
  systemInstructions?: string;
  jsonMode?: boolean;
  moderation?: boolean;
  streamMode?: boolean;
  storeMessages?: boolean;
  config?: any;
  version?: number;
  status?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
