import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
const CLOUDFLARE_ACCOUNT_ID = "060bfd194d2fcf0b4665b57dab183689";
const CLOUDFLARE_ACCESS_KEY_ID = "4bf03f01533b257b6c7dbe73d93c078d";
const CLOUDFLARE_SECRET_ACCESS_KEY =
  "05dce58f90c586591dbdc088308c2d5903d3a7d531d015d863e9d4cdb591d766";
const CLOUDFLARE_BUCKET_NAME = "circut-ai";

export const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});
export type SerializedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  content: number[];
};
export async function uploadFileToBucket(file: SerializedFile) {
  const Key = `uploads/${uuid()}_${file.name}`;

  const Bucket = CLOUDFLARE_BUCKET_NAME;

  let res;

  try {
    const uint8ArrayContent = new Uint8Array(file.content);
    const parallelUploads = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: uint8ArrayContent,
        ACL: "public-read",
        ContentType: file.type,
      },
      queueSize: 4,
      leavePartsOnError: false,
    });

    res = await parallelUploads.done();
  } catch (e) {
    throw e;
  }

  return res;
}

// export async function uploadFileToBucket(file: SerializedFile) {
//   const key = `uploads/${uuid()}_${file.name}`;

//   const uint8ArrayContent = new Uint8Array(file.content);

//   const command = new PutObjectCommand({
//     Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//     Key: key,
//     Body: uint8ArrayContent,
//     ContentType: file.type,
//   });

//   await s3Client.send(command);
//   return { key };
// }
// export async function getPresignedPostUrl(
//   objectName: string,
//   contentType: string,
// ) {
//   return await createPresignedPost(s3Client, {
//     Bucket: CLOUDFLARE_BUCKET_NAME!,
//     Key: objectName,
//     // Conditions: [
//     //   ["content-length-range", 0, 1024 * 1024 * 2],
//     //   ["starts-with", "$Content-Type", contentType],
//     // ],
//     Expires: 600, // 10 minutes
//     // Fields: {
//     //   // acl: "public-read",
//     //   "Content-Type": contentType,
//     // },
//   });
// }

export async function getFileUrl({ key }: { key: string }) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: CLOUDFLARE_BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 3600 },
  );
  return url;
}