import { useState } from "react";
import { toast } from "react-toastify";
import { createAndMintToken, getUserTokens } from "../services/token";
import { useWalletStore } from "../store/wallet";
import { uploadImageToPinata, uploadMetadataToPinata } from "../services/ipfs";
import { createMetadataJson } from "../utils/token";
import { decryptMnemonic } from "../utils/wallet";
import { getTokens, insertToken } from "../services/supabase";

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

      const tokenResult = await createAndMintToken(
        mnemonic,
        formData.quantity,
        formData.name,
        formData.symbol,
        metadataUploadResult.gatewayUrl
      );

      await insertToken({
        name: formData.name,
        symbol: formData.symbol,
        mint: tokenResult.mintAddress,
        tokenAccount: tokenResult.tokenAccount,
        metadata: metadataUploadResult.gatewayUrl,
        image: imageUploadResult.gatewayUrl,
        totalSupply: formData.quantity,
        decimals: tokenResult.decimals,
        tokenUri: metadataUploadResult.gatewayUrl,
      });

      toast.success("Token created successfully!");
    } catch (err) {
      console.error("Failed to create token.", err);
      setError("Failed to create token.");
    } finally {
      setLoading(false);
    }
  };

  const getUsersTokens = async () => {
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

  const getAllTokens = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokens = await getTokens();
      return tokens;
    } catch (error) {
      console.log("Error getting tokens from supabase", error);
      throw new Error("Error getting tokens from supabase");
    } finally {
      setLoading(false);
    }
  };

  return { createToken, getUsersTokens, getAllTokens, loading, error };
};
