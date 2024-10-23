import { Storage } from '@google-cloud/storage';
import { GCP_PROJECT_ID, GCP_BUCKET_NAME } from "@env";
import decodeServiceAccountKey from './decodeServiceAccountKey';

function initializeGCPClient() {
  const serviceAccountKey = decodeServiceAccountKey();

  if (!serviceAccountKey) {
    throw new Error("Failed to decode service account key");
  }

  const storage = new Storage({
    projectId: GCP_PROJECT_ID,
    credentials: serviceAccountKey
  });

  const bucket = storage.bucket(GCP_BUCKET_NAME);

  return { storage, bucket };
}

export default initializeGCPClient;