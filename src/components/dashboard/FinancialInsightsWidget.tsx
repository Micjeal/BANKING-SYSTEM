import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface UpcomingBill {
  name: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "overdue" | "paid";
}

interface FinancialRecommendation {
  id: string;
  title: string;
  description: string;
  type: "info" | "warning" | "success";
  icon: React.ReactNode;
}

interface FinancialInsightsWidgetProps {
  spendingCategories?: SpendingCategory[];
  upcomingBills?: UpcomingBill[];
  recommendations?: FinancialRecommendation[];
}

const FinancialInsightsWidget = ({
  spendingCategories = [
    { category: "Housing", amount: 1200, percentage: 40, color: "#4f46e5" },
    { category: "Food", amount: 450, percentage: 15, color: "#10b981" },
    {
      category: "Transportation",
      amount: 300,
      percentage: 10,
      color: "#f59e0b",
    },
    { category: "Entertainment", amount: 250, percentage: 8, color: "#ef4444" },
    { category: "Utilities", amount: 200, percentage: 7, color: "#8b5cf6" },
    { category: "Other", amount: 600, percentage: 20, color: "#6b7280" },
  ],
  upcomingBills = [
    { name: "Rent", amount: 1200, dueDate: "2023-06-01", status: "upcoming" },
    {
      name: "Electricity",
      amount: 85,
      dueDate: "2023-05-15",
      status: "upcoming",
    },
    { name: "Internet", amount: 65, dueDate: "2023-05-20", status: "upcoming" },
    { name: "Phone", amount: 45, dueDate: "2023-05-10", status: "overdue" },
    {
      name: "Car Insurance",
      amount: 120,
      dueDate: "2023-06-05",
      status: "upcoming",
    },
  ],
  recommendations = [
    {
      id: "rec1",
      title: "Reduce dining out expenses",
      description:
        "You've spent 30% more on restaurants this month compared to your average.",
      type: "warning",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "rec2",
      title: "Save on utility bills",
      description:
        "Consider our energy-saving tips to reduce your monthly utility expenses.",
      type: "info",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "rec3",
      title: "Investment opportunity",
      description:
        "Based on your savings, you might want to consider our new investment plan.",
      type: "success",
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
    },
  ],
}: FinancialInsightsWidgetProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Get status color for bills
  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "text-red-500";
      case "paid":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Financial Insights
        </CardTitle>
        <CardDescription>
          View your spending patterns and financial recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="spending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="spending" className="flex items-center gap-1">
              <PieChart className="h-4 w-4" /> Spending
            </TabsTrigger>
            <TabsTrigger value="bills" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Upcoming Bills
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="flex items-center gap-1"
            >
              <TrendingUp className="h-4 w-4" /> Recommendations
            </TabsTrigger>
          </TabsList>

          {/* Spending Patterns Tab */}
          <TabsContent value="spending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spending Chart Visualization */}
              <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden flex items-center justify-center">
                  {/* Simplified pie chart visualization */}
                  {spendingCategories.map((category, index) => {
                    const rotation =
                      index > 0
                        ? spendingCategories
                            .slice(0, index)
                            .reduce((acc, cat) => acc + cat.percentage, 0)
                        : 0;

                    return (
                      <div
                        key={category.category}
                        className="absolute inset-0"
                        style={{
                          clipPath: `conic-gradient(from ${rotation}deg, transparent ${category.percentage}%, transparent 0)`,
                          backgroundColor: category.color,
                        }}
                      />
                    );
                  })}
                  <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center z-10">
                    <span className="text-sm font-medium">Monthly</span>
                  </div>
                </div>
              </div>

              {/* Spending Categories List */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Top Spending Categories</h4>
                <div className="space-y-2">
                  {spendingCategories.map((category) => (
                    <div
                      key={category.category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="text-sm font-medium">
                        ${category.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Upcoming Bills Tab */}
          <TabsContent value="bills" className="space-y-4">
            <div className="space-y-3">
              {upcomingBills.map((bill) => (
                <div
                  key={bill.name}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{bill.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Due {formatDate(bill.dueDate)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">${bill.amount}</span>
                    <span className={`text-xs ${getStatusColor(bill.status)}`}>
                      {bill.status.charAt(0).toUpperCase() +
                        bill.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-sm text-blue-600 hover:underline">
                View all bills
              </button>
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{rec.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button className="text-xs text-gray-500 hover:underline">
                      Dismiss
                    </button>
                    <button className="text-xs text-blue-600 hover:underline">
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialInsightsWidget;
