import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  CreditCard,
  DollarSign,
  Check,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PayBillsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  onClose?: () => void;
}

const PayBillsModal = ({
  open = true,
  onOpenChange,
  onSuccess,
}: PayBillsModalProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPayee, setSelectedPayee] = useState<string>("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Mock data for payees and accounts
  const savedPayees = [
    { id: "1", name: "Electric Company" },
    { id: "2", name: "Water Utility" },
    { id: "3", name: "Internet Provider" },
    { id: "4", name: "Mobile Phone Service" },
    { id: "5", name: "Credit Card Company" },
  ];

  const accounts = [
    { id: "1", name: "Checking Account", balance: 5420.65 },
    { id: "2", name: "Savings Account", balance: 12750.33 },
    { id: "3", name: "Investment Account", balance: 8320.18 },
  ];

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitPayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCurrentStep(5);
      // Reset form after success
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Select Payee
        return (
          <div className="space-y-4">
            <FormField
              name="payee"
              render={() => (
                <FormItem>
                  <FormLabel>Select Payee</FormLabel>
                  <Select
                    value={selectedPayee}
                    onValueChange={setSelectedPayee}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {savedPayees.map((payee) => (
                        <SelectItem key={payee.id} value={payee.id}>
                          {payee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose from your saved payees or add a new one
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => alert("Add new payee functionality")}
            >
              + Add New Payee
            </Button>
          </div>
        );

      case 2: // Select Account
        return (
          <div className="space-y-4">
            <FormField
              name="account"
              render={() => (
                <FormItem>
                  <FormLabel>Select Account</FormLabel>
                  <Select
                    value={selectedAccount}
                    onValueChange={setSelectedAccount}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} (${account.balance.toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the account to pay from
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3: // Enter Amount
        return (
          <div className="space-y-4">
            <FormField
              name="amount"
              render={() => (
                <FormItem>
                  <FormLabel>Payment Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-9"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter the amount you want to pay
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 4: // Schedule Payment
        return (
          <div className="space-y-4">
            <FormField
              name="date"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={"w-full pl-3 text-left font-normal"}
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select when you want the payment to be processed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 5: // Confirmation
        return isSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-center">
              Payment Successful!
            </h3>
            <p className="text-center text-muted-foreground">
              Your payment of ${amount} to{" "}
              {savedPayees.find((p) => p.id === selectedPayee)?.name} has been
              scheduled for {date ? format(date, "PPP") : "today"}.
            </p>
            <p className="text-sm text-muted-foreground">
              Confirmation #:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Confirm Payment Details</h3>
            <div className="rounded-md border p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payee:</span>
                <span className="font-medium">
                  {savedPayees.find((p) => p.id === selectedPayee)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">From Account:</span>
                <span className="font-medium">
                  {accounts.find((a) => a.id === selectedAccount)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">${amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Date:</span>
                <span className="font-medium">
                  {date ? format(date, "PPP") : "Today"}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {isSuccess ? "Payment Complete" : "Pay Bills"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Your payment has been successfully scheduled."
              : "Pay your bills securely through our banking platform."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {!isSuccess && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {currentStep} of 5
                </span>
                <span className="text-sm text-muted-foreground">
                  {currentStep === 1
                    ? "Select Payee"
                    : currentStep === 2
                      ? "Select Account"
                      : currentStep === 3
                        ? "Enter Amount"
                        : currentStep === 4
                          ? "Schedule Payment"
                          : "Confirm Payment"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <Form>{renderStepContent()}</Form>
        </div>

        <DialogFooter>
          {!isSuccess ? (
            currentStep < 5 ? (
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 1 && !selectedPayee) ||
                    (currentStep === 2 && !selectedAccount) ||
                    (currentStep === 3 &&
                      (!amount || parseFloat(amount) <= 0)) ||
                    (currentStep === 4 && !date)
                  }
                >
                  Continue
                </Button>
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Payment"
                  )}
                </Button>
              </div>
            )
          ) : (
            <Button
              type="button"
              onClick={() => {
                if (onOpenChange) onOpenChange(false);
              }}
              className="w-full"
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PayBillsModal;
