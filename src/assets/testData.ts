import { Transaction } from "../interfaces/transaction";

export const TestTransactions: Transaction[] = [
  {
    id: "1",
    type: "send",
    amount: 2.5,
    date: "2025-02-16",
    to: "Fh3t...8H2P",
    from: "Lz9w...3M5N",
  },
  {
    id: "2",
    type: "receive",
    amount: 5.0,
    date: "2025-02-15",
    from: "Aq1x...9J0K",
    to: "Fh3t...8H2P",
  },
  {
    id: "3",
    type: "send",
    amount: 1.2,
    date: "2025-02-14",
    to: "Lz9w...3M5N",
    from: "Aq1x...9J0K",
  },
];

export const tokens = [
  {
    name: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
  {
    name: "Raydium",
    symbol: "RAY",
    image: "https://cryptologos.cc/logos/raydium-ray-logo.png",
  },
  {
    name: "Serum",
    symbol: "SRM",
    image: "https://cryptologos.cc/logos/serum-srm-logo.png",
  },
];

export const tokensForSale = [
  {
    name: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    totalSupply: 10000,
    sold: 3500,
    price: "0.1 SOL",
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    totalSupply: 50000,
    sold: 12000,
    price: "1 USDC",
  },
  {
    name: "Raydium",
    symbol: "RAY",
    image: "https://cryptologos.cc/logos/raydium-ray-logo.png",
    totalSupply: 20000,
    sold: 7000,
    price: "0.5 SOL",
  },
  {
    name: "Serum",
    symbol: "SRM",
    image: "https://cryptologos.cc/logos/serum-srm-logo.png",
    totalSupply: 15000,
    sold: 9000,
    price: "0.3 SOL",
  },
];
