import crypto from "crypto";

interface EncryptedData {
  encryptedKey: string;
  iv: string;
  tag: string;
}

const ENCRYPTION_KEY_LENGTH = 32;

export function encryptApiKey(apiKey: string): EncryptedData {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }

  const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  if (key.length !== ENCRYPTION_KEY_LENGTH) {
    throw new Error(
      `Encryption key must be ${ENCRYPTION_KEY_LENGTH} bytes long`,
    );
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  let encrypted = cipher.update(apiKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  return {
    encryptedKey: encrypted,
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
  };
}

export function decryptApiKey(encryptedData: EncryptedData): string {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }

  const key: any = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  if (key.length !== ENCRYPTION_KEY_LENGTH) {
    throw new Error(
      `Encryption key must be ${ENCRYPTION_KEY_LENGTH} bytes long`,
    );
  }

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(encryptedData.iv, "hex") as any,
  );

  decipher.setAuthTag(Buffer.from(encryptedData.tag, "hex") as any);

  let decrypted = decipher.update(encryptedData.encryptedKey, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

export function generateEncryptionKey(): string {
  return crypto.randomBytes(ENCRYPTION_KEY_LENGTH).toString("hex");
}
