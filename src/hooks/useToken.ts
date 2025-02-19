import { useState } from "react";
import { toast } from "react-toastify";
import { createAndMintToken, getUserTokens } from "../services/token";
import { useWalletStore } from "../store/wallet";
import { uploadImageToPinata, uploadMetadataToPinata } from "../services/ipfs";
import { createMetadataJson } from "../utils/token";
import { decryptMnemonic } from "../utils/wallet";

export const useToken = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { publicKey, encryptedMnemonic } = useWalletStore();

  const createToken = async (
    pin: string,
    formData: { quantity: string; name: string; symbol: string },
    uploadedImage: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      const mnemonic = decryptMnemonic(encryptedMnemonic, pin);

      const imageUploadResult = await uploadImageToPinata(uploadedImage);

      const metadata = createMetadataJson({
        ...formData,
        image: imageUploadResult,
      });

      const metadataUploadResult = await uploadMetadataToPinata(metadata, formData.symbol);

      await createAndMintToken(
        mnemonic,
        formData.quantity,
        formData.name,
        formData.symbol,
        metadataUploadResult.gatewayUrl
      );
      toast.success("Token created successfully!");
    } catch (err) {
      console.error("Failed to create token.", err);
      setError("Failed to create token.");
    } finally {
      setLoading(false);
    }
  };

  const getTokens = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await getUserTokens(publicKey);
      return tokens;
    } catch (err) {
      console.error("Failed to fetch tokens.", err);
      setError("Failed to fetch tokens.");
      toast.error("Failed to fetch tokens.");
    } finally {
      setLoading(false);
    }
  };

  return { createToken, getTokens, loading, error };
};
