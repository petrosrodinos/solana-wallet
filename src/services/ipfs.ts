import axios from "axios";
import { IpfsFile } from "../interfaces/token";
import { PINATA_API_KEY, PINATA_API_SECRET } from "../constants";

export const uploadImageToPinata = async (file: any, filename = null): Promise<IpfsFile> => {
  try {
    const formData = new FormData();
    formData.append("file", file, filename || file.name);

    const metadata = JSON.stringify({
      name: filename || file.name,
      keyvalues: {
        type: "token-image",
        timestamp: Date.now(),
      },
    });
    formData.append("pinataMetadata", metadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": `multipart/form-data;`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    const ipfsHash = response.data.IpfsHash;

    return {
      ipfsHash,
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      gatewayUrl: `https://ipfs.io/ipfs/${ipfsHash}`,
      ipfsUrl: `ipfs://${ipfsHash}`,
    };
  } catch (error: any) {
    console.error("Error uploading to Pinata:", error);
    throw new Error(`Failed to upload to Pinata: ${error.message}`);
  }
};

export const uploadMetadataToPinata = async (metadata: any, name: string) => {
  try {
    const metadataString = JSON.stringify(metadata);

    const blob = new Blob([metadataString], { type: "application/json" });
    const file = new File([blob], `${name.toLowerCase().replace(/\s+/g, "-")}-metadata.json`, {
      type: "application/json",
    });

    return await uploadImageToPinata(file);
  } catch (error: any) {
    console.error("Error uploading metadata to Pinata:", error);
    throw new Error(`Failed to upload metadata: ${error.message}`);
  }
};
