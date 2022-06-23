export interface Payment {
  uid: string;
  value: number;
  firstName: string;
  lastName: string;
  date: number;
  vakiKey: string;
}

export interface Vaki {
  name: string;
  uid: string;
  totalCollected: number;
  totalSupports: number;
  latestPayments: Payment[];
}
