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
