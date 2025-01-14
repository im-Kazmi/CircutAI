import { R2, Bucket } from "node-cloudflare-r2";

export class R2Service {
  private client: R2;
  private bucketName: string;
  private bucket: Bucket;

  constructor() {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
    const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.CLOUDFLARE_SECRET_ACCESS_KEY!;
    const bucketName = process.env.CLOUDFLARE_BUCKET_NAME!;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      throw new Error("Missing required Cloudflare R2 environment variables.");
    }

    this.client = new R2({
      accountId: accountId,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const bucket = this.client.bucket("<BUCKET_NAME>");

    this.bucketName = bucketName;
    this.bucket = bucket;
  }

  async uploadFile(filePath: string, filename: string): Promise<any> {
    const Key = filename;

    try {
      const upload = await this.bucket.uploadFile(filePath, filename);
    } catch (error) {
      throw new Error(`File upload failed: ${error}`);
    }
  }

  async getFileUrl(key: string) {
    try {
      const signedUrl = await this.bucket.getObjectSignedUrl(
        key,
        3600,
      );
      console.log(signedUrl);
      return signedUrl;
    } catch (err) {
      console.log(err)
    }
    }

  }
}
