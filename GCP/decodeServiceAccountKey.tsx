import { GCP_SERVICE_ACCOUNT_KEY } from "@env";
import base64 from 'react-native-base64';

function decodeServiceAccountKey() {
  try {
    // Decode the base64 encoded key
    const decodedKey = base64.decode(GCP_SERVICE_ACCOUNT_KEY);
    
    // Parse the JSON string
    const serviceAccountKey = JSON.parse(decodedKey);
    
    return serviceAccountKey;
  } catch (error) {
    console.error("Error decoding service account key:", error);
    return null;
  }
}

export default decodeServiceAccountKey;