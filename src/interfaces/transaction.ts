export interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  date: string;
  from: string;
  to: string;
}
