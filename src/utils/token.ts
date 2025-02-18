import { TokenMetadata } from "../interfaces/token";

export const createMetadataJson = (data: TokenMetadata) => {
  const metadata = {
    name: data.name,
    symbol: data.symbol,
    description: `${data.name} token created with SPL Token Extensions`,
    image: data.image.gatewayUrl,
    external_url: "",
    properties: {
      tokenType: "utility",
      creationDate: new Date().toISOString().split("T")[0],
      ipfsImage: data.image.ipfsUrl,
    },
  };

  return metadata;
};
