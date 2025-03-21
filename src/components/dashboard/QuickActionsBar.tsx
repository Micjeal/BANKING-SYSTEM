import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  BanknoteIcon,
  CreditCardIcon,
  PiggyBankIcon,
  ArrowRightLeftIcon,
  ReceiptIcon,
  FileTextIcon,
} from "lucide-react";

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
}

const QuickAction = ({
  icon,
  label,
  description,
  onClick = () => {},
}: QuickActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant="outline"
            className="flex flex-col items-center justify-center h-24 w-24 gap-2 p-2 bg-white hover:bg-blue-50 border-blue-100"
          >
            <div className="text-blue-600">{icon}</div>
            <span className="text-xs font-medium">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface QuickActionsBarProps {
  onTransferClick?: () => void;
  onPayBillsClick?: () => void;
  onLoanApplicationClick?: () => void;
  onInvestmentsClick?: () => void;
  onStatementsClick?: () => void;
  onCardsClick?: () => void;
}

const QuickActionsBar = ({
  onTransferClick = () => {},
  onPayBillsClick = () => {},
  onLoanApplicationClick = () => {},
  onInvestmentsClick = () => {},
  onStatementsClick = () => {},
  onCardsClick = () => {},
}: QuickActionsBarProps) => {
  const quickActions = [
    {
      icon: <ArrowRightLeftIcon size={24} />,
      label: "Transfer",
      description: "Transfer money between accounts or to other users",
      onClick: onTransferClick,
    },
    {
      icon: <ReceiptIcon size={24} />,
      label: "Pay Bills",
      description: "Pay your utility bills and other payments",
      onClick: onPayBillsClick,
    },
    {
      icon: <BanknoteIcon size={24} />,
      label: "Loans",
      description: "Apply for a new loan or manage existing loans",
      onClick: onLoanApplicationClick,
    },
    {
      icon: <PiggyBankIcon size={24} />,
      label: "Investments",
      description: "View and manage your investment portfolio",
      onClick: onInvestmentsClick,
    },
    {
      icon: <FileTextIcon size={24} />,
      label: "Statements",
      description: "View and download your account statements",
      onClick: onStatementsClick,
    },
    {
      icon: <CreditCardIcon size={24} />,
      label: "Cards",
      description: "Manage your credit and debit cards",
      onClick: onCardsClick,
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
      </div>
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {quickActions.map((action, index) => (
          <QuickAction
            key={index}
            icon={action.icon}
            label={action.label}
            description={action.description}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsBar;
