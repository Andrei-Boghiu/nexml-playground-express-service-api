import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.AWS_REGION!,
  endpoint: process.env.AWS_S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const bucketName = process.env.AWS_S3_BUCKET_NAME!;

export default s3Client;
