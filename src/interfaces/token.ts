export interface TokenMetadata {
  name: string;
  symbol: string;
  image: IpfsFile;
  description?: string;
}

export interface IpfsFile {
  ipfsUrl: string;
  ipfsHash: string;
  pinataUrl: string;
  gatewayUrl: string;
}

export interface Token {
  name: string;
  symbol: string;
  metadata: any;
  mint: string;
  balance: string;
  decimals: string;
  description?: string;
  image: string;
  totalSupply: string;
  associatedTokenAddress?: string;
  price?: string;
  sold?: string;
}
