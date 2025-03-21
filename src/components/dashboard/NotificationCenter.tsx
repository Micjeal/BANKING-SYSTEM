import React, { useState } from "react";
import { Bell, Check, AlertTriangle, CreditCard, Info, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type NotificationType = "transaction" | "security" | "account";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [
    {
      id: "1",
      type: "transaction",
      title: "Payment Received",
      message: "You received $1,250.00 from John Smith",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: "2",
      type: "security",
      title: "New Login Detected",
      message: "A new login was detected from Chicago, IL",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "account",
      title: "Account Update",
      message: "Your account details have been updated successfully",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "transaction",
      title: "Bill Payment Due",
      message: "Your electricity bill payment is due in 2 days",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "5",
      type: "security",
      title: "Security Alert",
      message: "Your password was changed successfully",
      time: "1 day ago",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onViewAll = () => {},
}) => {
  const [activeFilter, setActiveFilter] = useState<NotificationType | "all">(
    "all",
  );
  const [localNotifications, setLocalNotifications] =
    useState<Notification[]>(notifications);

  const unreadCount = localNotifications.filter(
    (notification) => !notification.read,
  ).length;

  const filteredNotifications =
    activeFilter === "all"
      ? localNotifications
      : localNotifications.filter(
          (notification) => notification.type === activeFilter,
        );

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
    onMarkAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
    onMarkAllAsRead();
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "transaction":
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "security":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "account":
        return <Info className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-full max-w-[350px] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-gray-700" />
          <h2 className="font-semibold text-lg text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          className="text-xs"
        >
          Mark all read
        </Button>
      </div>

      <div className="p-2 border-b border-gray-200 flex gap-1 overflow-x-auto">
        <Button
          variant={activeFilter === "all" ? "default" : "ghost"}
          size="sm"
          className="text-xs"
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
        <Button
          variant={activeFilter === "transaction" ? "default" : "ghost"}
          size="sm"
          className="text-xs"
          onClick={() => setActiveFilter("transaction")}
        >
          Transactions
        </Button>
        <Button
          variant={activeFilter === "security" ? "default" : "ghost"}
          size="sm"
          className="text-xs"
          onClick={() => setActiveFilter("security")}
        >
          Security
        </Button>
        <Button
          variant={activeFilter === "account" ? "default" : "ghost"}
          size="sm"
          className="text-xs"
          onClick={() => setActiveFilter("account")}
        >
          Account
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-3 rounded-md border flex gap-3",
                  notification.read
                    ? "bg-white border-gray-200"
                    : "bg-blue-50 border-blue-200",
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm text-gray-900">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mt-1 -mr-1"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
            <Bell className="h-10 w-10 mb-2 text-gray-300" />
            <p className="text-sm">No notifications found</p>
          </div>
        )}
      </ScrollArea>

      <div className="p-3 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full text-sm"
          onClick={onViewAll}
        >
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationCenter;
