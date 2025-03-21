import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Upload,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  loanType: z.string().min(1, { message: "Please select a loan type" }),
  amount: z.string().min(1, { message: "Please enter a loan amount" }),
  tenure: z.string().min(1, { message: "Please select a loan tenure" }),
  purpose: z
    .string()
    .min(5, { message: "Please provide a loan purpose (min 5 characters)" }),
  income: z.string().min(1, { message: "Please enter your monthly income" }),
});

interface LoanApplicationModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

const LoanApplicationModal = ({
  open = true,
  onOpenChange,
}: LoanApplicationModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: "",
      amount: "",
      tenure: "",
      purpose: "",
      income: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    form.reset();
    setStep(1);
    setIsSuccess(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-primary">
            {isSuccess ? "Application Submitted!" : "Loan Application"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess
              ? "Your loan application has been submitted successfully."
              : "Complete the form below to apply for a loan. All fields are required."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">
                Application Reference: #LN-
                {Math.floor(100000 + Math.random() * 900000)}
              </h3>
              <p className="text-sm text-gray-500">
                We will review your application and get back to you within 2
                business days.
              </p>
            </div>
            <Button onClick={resetForm} className="mt-4">
              Start New Application
            </Button>
          </div>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Loan Details</h3>
                    <span className="text-sm text-gray-500">Step 1 of 3</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="loanType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select loan type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="personal">
                              Personal Loan
                            </SelectItem>
                            <SelectItem value="home">Home Loan</SelectItem>
                            <SelectItem value="auto">Auto Loan</SelectItem>
                            <SelectItem value="education">
                              Education Loan
                            </SelectItem>
                            <SelectItem value="business">
                              Business Loan
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the type of loan you wish to apply for.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Amount</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              className="pl-10"
                              placeholder="Enter amount"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter the amount you wish to borrow.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Tenure</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select loan tenure" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="6">6 months</SelectItem>
                            <SelectItem value="12">12 months</SelectItem>
                            <SelectItem value="24">24 months</SelectItem>
                            <SelectItem value="36">36 months</SelectItem>
                            <SelectItem value="48">48 months</SelectItem>
                            <SelectItem value="60">60 months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the duration for loan repayment.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Purpose & Income</h3>
                    <span className="text-sm text-gray-500">Step 2 of 3</span>
                  </div>

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Purpose</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Describe the purpose of the loan"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Briefly explain why you need this loan.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="income"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Income</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              className="pl-10"
                              placeholder="Enter monthly income"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter your average monthly income.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Document Upload</h3>
                    <span className="text-sm text-gray-500">Step 3 of 3</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="id-proof">ID Proof</Label>
                      <div className="mt-1 flex items-center justify-center w-full">
                        <label
                          htmlFor="id-proof"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileText className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              Click to upload ID proof
                            </p>
                            <p className="text-xs text-gray-500">
                              Passport, Driver's License, or National ID
                            </p>
                          </div>
                          <input id="id-proof" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="income-proof">Income Proof</Label>
                      <div className="mt-1 flex items-center justify-center w-full">
                        <label
                          htmlFor="income-proof"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              Click to upload income proof
                            </p>
                            <p className="text-xs text-gray-500">
                              Salary slips, Tax returns, or Bank statements
                            </p>
                          </div>
                          <input
                            id="income-proof"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      By submitting this application, you agree to our terms and
                      conditions and authorize us to perform a credit check.
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter className="flex justify-between sm:justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </DialogFooter>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoanApplicationModal;
