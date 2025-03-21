import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import AccountOverviewPanel from "./dashboard/AccountOverviewPanel";
import QuickActionsBar from "./dashboard/QuickActionsBar";
import NotificationCenter from "./dashboard/NotificationCenter";
import FinancialInsightsWidget from "./dashboard/FinancialInsightsWidget";
import SecurityStatusIndicator from "./dashboard/SecurityStatusIndicator";
import { Dialog, DialogContent } from "./ui/dialog";
import TransferMoneyModal from "./modals/TransferMoneyModal";
import PayBillsModal from "./modals/PayBillsModal";
import LoanApplicationModal from "./modals/LoanApplicationModal";

const Home = () => {
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quick Actions Bar */}
        <section className="mb-6">
          <QuickActionsBar
            onTransferClick={() => handleOpenModal("transfer")}
            onPayBillsClick={() => handleOpenModal("payBills")}
            onLoanApplicationClick={() => handleOpenModal("loanApplication")}
          />
        </section>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Account Overview and Financial Insights */}
          <div className="lg:col-span-8 space-y-6">
            {/* Account Overview Panel */}
            <AccountOverviewPanel />

            {/* Financial Insights Widget */}
            <FinancialInsightsWidget />
          </div>

          {/* Right Column - Notification Center and Security Status */}
          <div className="lg:col-span-4 space-y-6">
            {/* Notification Center */}
            <NotificationCenter />

            {/* Security Status Indicator */}
            <SecurityStatusIndicator />
          </div>
        </div>
      </main>

      {/* Modals */}
      <Dialog open={activeModal === "transfer"} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <TransferMoneyModal onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={activeModal === "payBills"} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <PayBillsModal onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeModal === "loanApplication"}
        onOpenChange={handleCloseModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <LoanApplicationModal onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
