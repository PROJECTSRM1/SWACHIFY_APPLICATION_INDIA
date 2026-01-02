export interface WalletTxn {
  ticketId: string;
  service: string;
  amount: number;
  date: string;
  step: "COMPLETED" | "WITHDRAWN";
}

export interface WalletState {
  balance: number;
  pending: number;
  withdrawn: number;
  transactions: WalletTxn[];
}

const initialWallet: WalletState = {
  balance: 0,
  pending: 0,
  withdrawn: 0,
  transactions: [],
};

export const getWallet = (): WalletState => {
  try {
    return JSON.parse(localStorage.getItem("swachify_wallet") || "null") || initialWallet;
  } catch {
    return initialWallet;
  }
};

export const saveWallet = (wallet: WalletState) => {
  localStorage.setItem("swachify_wallet", JSON.stringify(wallet));
};

export const addEarnings = (ticketId: string, service: string, amount: number) => {
  const wallet = getWallet();

  // Add earnings
  wallet.balance += amount;

  // Pending mirrors balance until withdrawn
  wallet.pending = wallet.balance;

  // Add transaction entry
  wallet.transactions.unshift({
    ticketId,
    service,
    amount,
    date: new Date().toLocaleDateString("en-IN"),
    step: "COMPLETED",
  });

  saveWallet(wallet);
};

export const withdrawEarnings = () => {
  const wallet = getWallet();
  if (wallet.balance === 0) return wallet;

  // Add withdrawal record
  wallet.transactions.unshift({
    ticketId: `WD-${Date.now()}`,
    service: "Wallet Withdrawal",
    amount: wallet.balance,
    date: new Date().toLocaleDateString("en-IN"),
    step: "WITHDRAWN",
  });

  // Update withdrawn total
  wallet.withdrawn += wallet.balance;

  // Reset wallet after withdrawal
  wallet.balance = 0;
  wallet.pending = 0;

  saveWallet(wallet);
  return wallet;
};
