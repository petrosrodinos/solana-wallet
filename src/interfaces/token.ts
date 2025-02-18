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
