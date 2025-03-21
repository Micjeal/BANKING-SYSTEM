import React from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Settings,
  LogOut,
  Users,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SecurityStatusIndicatorProps {
  securityScore?: number;
  securityStatus?: "ok" | "warning" | "danger";
  activeSessions?: Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    isCurrent?: boolean;
  }>;
  securityRecommendations?: Array<{
    id: string;
    text: string;
    severity: "low" | "medium" | "high";
  }>;
}

const SecurityStatusIndicator = ({
  securityScore = 85,
  securityStatus = "ok",
  activeSessions = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Just now",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "Boston, USA",
      lastActive: "2 hours ago",
    },
  ],
  securityRecommendations = [
    {
      id: "1",
      text: "Enable two-factor authentication",
      severity: "high",
    },
    {
      id: "2",
      text: "Update your password",
      severity: "medium",
    },
  ],
}: SecurityStatusIndicatorProps) => {
  // Determine the security icon and color based on status
  const getSecurityStatusIcon = () => {
    switch (securityStatus) {
      case "ok":
        return <ShieldCheck className="h-12 w-12 text-green-500" />;
      case "warning":
        return <ShieldAlert className="h-12 w-12 text-amber-500" />;
      case "danger":
        return <ShieldAlert className="h-12 w-12 text-red-500" />;
      default:
        return <Shield className="h-12 w-12 text-blue-500" />;
    }
  };

  const getSecurityStatusText = () => {
    switch (securityStatus) {
      case "ok":
        return "Your account is secure";
      case "warning":
        return "Your account needs attention";
      case "danger":
        return "Your account is at risk";
      default:
        return "Security status";
    }
  };

  const getSecurityScoreColor = () => {
    if (securityScore >= 80) return "text-green-500";
    if (securityScore >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="w-full max-w-[350px] bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Security Status</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>{getSecurityStatusText()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getSecurityStatusIcon()}
            <div>
              <p className="text-sm font-medium">Security Score</p>
              <p className={cn("text-2xl font-bold", getSecurityScoreColor())}>
                {securityScore}%
              </p>
            </div>
          </div>
        </div>

        {securityRecommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Recommendations</h4>
            <ul className="space-y-1">
              {securityRecommendations.map((rec) => (
                <li
                  key={rec.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span>{rec.text}</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      getSeverityColor(rec.severity),
                    )}
                  >
                    {rec.severity.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSessions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Active Sessions</h4>
              <Button variant="link" size="sm" className="h-auto p-0">
                <Users className="mr-1 h-3 w-3" />
                <span className="text-xs">View All</span>
              </Button>
            </div>
            <ul className="space-y-2">
              {activeSessions.slice(0, 2).map((session) => (
                <li
                  key={session.id}
                  className="flex items-center justify-between rounded-md bg-gray-50 p-2 text-xs"
                >
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-gray-500">
                      {session.location} • {session.lastActive}
                    </p>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <LogOut className="h-3 w-3 text-red-500" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full text-xs">
          Access Security Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityStatusIndicator;
