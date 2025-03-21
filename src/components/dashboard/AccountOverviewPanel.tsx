import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";

interface AccountOverviewPanelProps {
  accounts?: AccountType[];
  recentTransactions?: TransactionType[];
  loansSummary?: LoanType[];
  investmentsSummary?: InvestmentType[];
}

interface AccountType {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  currency: string;
  type: "checking" | "savings" | "credit";
}

interface TransactionType {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
}

interface LoanType {
  id: string;
  name: string;
  amount: number;
  remainingAmount: number;
  interestRate: number;
  nextPaymentDate: string;
  status: "active" | "pending" | "paid";
}

interface InvestmentType {
  id: string;
  name: string;
  initialAmount: number;
  currentValue: number;
  returnRate: number;
  type: string;
}

const AccountOverviewPanel: React.FC<AccountOverviewPanelProps> = ({
  accounts = [
    {
      id: "1",
      name: "Primary Checking",
      accountNumber: "**** 4567",
      balance: 5280.42,
      currency: "USD",
      type: "checking",
    },
    {
      id: "2",
      name: "Savings Account",
      accountNumber: "**** 7890",
      balance: 12750.89,
      currency: "USD",
      type: "savings",
    },
    {
      id: "3",
      name: "Credit Card",
      accountNumber: "**** 1234",
      balance: -1250.6,
      currency: "USD",
      type: "credit",
    },
  ],
  recentTransactions = [
    {
      id: "t1",
      date: "2023-06-15",
      description: "Grocery Store",
      amount: -85.42,
      type: "debit",
      category: "Groceries",
    },
    {
      id: "t2",
      date: "2023-06-14",
      description: "Salary Deposit",
      amount: 3500.0,
      type: "credit",
      category: "Income",
    },
    {
      id: "t3",
      date: "2023-06-13",
      description: "Electric Bill",
      amount: -145.3,
      type: "debit",
      category: "Utilities",
    },
    {
      id: "t4",
      date: "2023-06-12",
      description: "Restaurant",
      amount: -65.8,
      type: "debit",
      category: "Dining",
    },
    {
      id: "t5",
      date: "2023-06-10",
      description: "Online Shopping",
      amount: -120.99,
      type: "debit",
      category: "Shopping",
    },
  ],
  loansSummary = [
    {
      id: "l1",
      name: "Home Mortgage",
      amount: 250000,
      remainingAmount: 185000,
      interestRate: 3.5,
      nextPaymentDate: "2023-07-01",
      status: "active",
    },
    {
      id: "l2",
      name: "Auto Loan",
      amount: 35000,
      remainingAmount: 12500,
      interestRate: 4.2,
      nextPaymentDate: "2023-06-25",
      status: "active",
    },
  ],
  investmentsSummary = [
    {
      id: "i1",
      name: "Retirement Fund",
      initialAmount: 50000,
      currentValue: 65000,
      returnRate: 8.5,
      type: "401k",
    },
    {
      id: "i2",
      name: "Stock Portfolio",
      initialAmount: 25000,
      currentValue: 32000,
      returnRate: 12.2,
      type: "Stocks",
    },
  ],
}) => {
  // Format currency
  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-background w-full max-w-[750px] h-[400px] overflow-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Account Balances Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Account Balances
            </CardTitle>
            <CardDescription>
              View your account balances and details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center">
                    {account.type === "checking" && (
                      <Wallet className="mr-3 h-5 w-5 text-blue-500" />
                    )}
                    {account.type === "savings" && (
                      <PiggyBank className="mr-3 h-5 w-5 text-green-500" />
                    )}
                    {account.type === "credit" && (
                      <CreditCard className="mr-3 h-5 w-5 text-purple-500" />
                    )}
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.accountNumber}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-right ${account.balance < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    <div className="font-semibold">
                      {formatCurrency(account.balance, account.currency)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {account.type.charAt(0).toUpperCase() +
                        account.type.slice(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              View All Accounts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Recent Transactions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Your last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)} • {transaction.category}
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto">
              View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Loans & Investments Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loans Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Loans Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loansSummary.map((loan) => (
                  <div key={loan.id} className="p-2 border rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">{loan.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${loan.status === "active" ? "bg-green-100 text-green-800" : loan.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {loan.status.charAt(0).toUpperCase() +
                          loan.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(loan.remainingAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Next Payment:
                        </span>
                        <span>{formatDate(loan.nextPaymentDate)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto text-xs">
                Details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>

          {/* Investments Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <PiggyBank className="mr-2 h-5 w-5" />
                Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {investmentsSummary.map((investment) => (
                  <div key={investment.id} className="p-2 border rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">{investment.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {investment.type}
                      </span>
                    </div>
                    <div className="mt-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Current Value:
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(investment.currentValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Return Rate:
                        </span>
                        <span className="text-green-600">
                          {investment.returnRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto text-xs">
                Details <ArrowUpRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountOverviewPanel;
