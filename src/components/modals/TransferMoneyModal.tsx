import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, CheckCircle, DollarSign } from "lucide-react";

interface TransferMoneyModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (transferData: TransferData) => void;
}

interface TransferData {
  sourceAccount: string;
  destinationAccount: string;
  amount: string;
  description: string;
}

interface TransferMoneyModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (transferData: TransferData) => void;
  onClose?: () => void;
}

const TransferMoneyModal = ({
  open = true,
  onOpenChange = () => {},
  onComplete = () => {},
}: TransferMoneyModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [transferData, setTransferData] = useState<TransferData>({
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Mock data for accounts
  const accounts = [
    {
      id: "acc1",
      name: "Checking Account",
      balance: "$5,432.10",
      number: "**** 4321",
    },
    {
      id: "acc2",
      name: "Savings Account",
      balance: "$12,345.67",
      number: "**** 8765",
    },
    {
      id: "acc3",
      name: "Investment Account",
      balance: "$34,567.89",
      number: "**** 9876",
    },
  ];

  // Mock data for destination accounts
  const destinationOptions = [
    { id: "own1", name: "My Savings Account", number: "**** 8765" },
    { id: "own2", name: "My Investment Account", number: "**** 9876" },
    { id: "ext1", name: "John Smith", bank: "Chase Bank", number: "**** 1234" },
    {
      id: "ext2",
      name: "Jane Doe",
      bank: "Bank of America",
      number: "**** 5678",
    },
  ];

  const handleInputChange = (field: keyof TransferData, value: string) => {
    setTransferData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsComplete(true);
      // In a real app, you would submit the transfer data to the backend here
      setTimeout(() => {
        onComplete(transferData);
        resetForm();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setTransferData({
      sourceAccount: "",
      destinationAccount: "",
      amount: "",
      description: "",
    });
    setIsComplete(false);
  };

  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !transferData.sourceAccount;
      case 2:
        return !transferData.destinationAccount;
      case 3:
        return !transferData.amount || isNaN(Number(transferData.amount));
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isComplete
              ? "Transfer Complete!"
              : `Transfer Money - Step ${step} of 4`}
          </DialogTitle>
          {!isComplete && (
            <DialogDescription className="text-center">
              {step === 1 && "Select the account you want to transfer from"}
              {step === 2 && "Select where you want to send money"}
              {step === 3 && "Enter the amount you want to transfer"}
              {step === 4 && "Review and confirm your transfer details"}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Step 1: Select Source Account */}
        {step === 1 && (
          <div className="grid gap-4 py-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${transferData.sourceAccount === account.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"}`}
                onClick={() => handleInputChange("sourceAccount", account.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.number}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{account.balance}</p>
                    <p className="text-xs text-gray-500">Available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Select Destination */}
        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="mb-4">
              <Select
                value={transferData.destinationAccount}
                onValueChange={(value) =>
                  handleInputChange("destinationAccount", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Select destination</SelectItem>
                  {destinationOptions.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.name} - {dest.number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Selected Destination</h3>
              {transferData.destinationAccount && (
                <div className="text-sm">
                  <p className="font-medium">
                    {
                      destinationOptions.find(
                        (d) => d.id === transferData.destinationAccount,
                      )?.name
                    }
                  </p>
                  <p className="text-gray-500">
                    {
                      destinationOptions.find(
                        (d) => d.id === transferData.destinationAccount,
                      )?.number
                    }
                  </p>
                  {"bank" in
                    (destinationOptions.find(
                      (d) => d.id === transferData.destinationAccount,
                    ) || {}) && (
                    <p className="text-gray-500">
                      {
                        destinationOptions.find(
                          (d) => d.id === transferData.destinationAccount,
                        )?.bank
                      }
                    </p>
                  )}
                </div>
              )}
              {!transferData.destinationAccount && (
                <p className="text-gray-500 text-sm">No destination selected</p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Enter Amount */}
        {step === 3 && (
          <div className="grid gap-4 py-4">
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                type="text"
                placeholder="0.00"
                className="pl-10 text-lg font-medium"
                value={transferData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">
                Description (Optional)
              </label>
              <Input
                placeholder="What's this transfer for?"
                value={transferData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            <div className="border rounded-lg p-4 mt-4 bg-gray-50">
              <h3 className="font-medium mb-2">Transfer From</h3>
              <div className="text-sm">
                <p className="font-medium">
                  {
                    accounts.find((a) => a.id === transferData.sourceAccount)
                      ?.name
                  }
                </p>
                <p className="text-gray-500">
                  Available balance:{" "}
                  {
                    accounts.find((a) => a.id === transferData.sourceAccount)
                      ?.balance
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="grid gap-4 py-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-3">Transfer Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">From</span>
                  <span className="font-medium">
                    {
                      accounts.find((a) => a.id === transferData.sourceAccount)
                        ?.name
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">To</span>
                  <span className="font-medium">
                    {
                      destinationOptions.find(
                        (d) => d.id === transferData.destinationAccount,
                      )?.name
                    }
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">${transferData.amount}</span>
                </div>

                {transferData.description && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Description</span>
                    <span className="font-medium">
                      {transferData.description}
                    </span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-500">Transfer Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <p>
                By clicking "Confirm Transfer", you agree to the terms and
                conditions for money transfers.
              </p>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {isComplete && (
          <div className="py-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <p className="text-center mb-4">
              Your transfer of{" "}
              <span className="font-bold">${transferData.amount}</span> to{" "}
              <span className="font-bold">
                {
                  destinationOptions.find(
                    (d) => d.id === transferData.destinationAccount,
                  )?.name
                }
              </span>{" "}
              has been initiated successfully.
            </p>
            <div className="border rounded-lg p-4 w-full bg-gray-50 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-medium">
                  TRX{Math.floor(Math.random() * 1000000)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Completion</span>
                <span className="font-medium">Within 24 hours</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {!isComplete ? (
            <>
              {step > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button onClick={handleNext} disabled={isNextDisabled()}>
                {step < 4 ? (
                  <>
                    Next <ArrowRight className="ml-2" size={16} />
                  </>
                ) : (
                  "Confirm Transfer"
                )}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferMoneyModal;
