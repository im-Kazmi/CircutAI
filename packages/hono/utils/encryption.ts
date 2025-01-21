import crypto from "crypto";

interface EncryptedData {
  encryptedKey: string;
  iv: string;
  tag: string;
}

const ENCRYPTION_KEY_LENGTH = 32;

export function encryptApiKey(apiKey: string): EncryptedData {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }

  const key = Buffer.from(keyHex, "hex");
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
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) {
    throw new Error("ENCRYPTION_KEY is not set in environment variables");
  }

  const key = Buffer.from(keyHex, "hex");
  if (key.length !== ENCRYPTION_KEY_LENGTH) {
    throw new Error(
      `Encryption key must be ${ENCRYPTION_KEY_LENGTH} bytes long`,
    );
  }

  const iv = Buffer.from(encryptedData.iv, "hex");
  const tag = Buffer.from(encryptedData.tag, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedData.encryptedKey, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
