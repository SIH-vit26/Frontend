"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Shield, Users, Database, AlertTriangle, CheckCircle, Eye, Lock } from "lucide-react"

export function AuditOverview() {
  const stats = [
    { label: "Total Activities", value: "2,847", icon: Activity, change: "+12%", color: "text-blue-600" },
    { label: "Data Access Events", value: "1,234", icon: Eye, change: "+8%", color: "text-green-600" },
    { label: "Security Events", value: "23", icon: Shield, change: "-15%", color: "text-yellow-600" },
    { label: "Failed Logins", value: "12", icon: Lock, change: "-25%", color: "text-red-600" },
  ]

  const riskEvents = [
    {
      type: "High Risk Data Export",
      count: 3,
      description: "Large data exports requiring review",
      status: "attention",
      lastOccurrence: "2 hours ago",
    },
    {
      type: "Failed Login Attempts",
      count: 12,
      description: "Multiple failed authentication attempts",
      status: "warning",
      lastOccurrence: "4 hours ago",
    },
    {
      type: "Unusual Access Patterns",
      count: 5,
      description: "Access outside normal hours or locations",
      status: "review",
      lastOccurrence: "1 day ago",
    },
  ]

  const complianceScore = 94

  const getStatusColor = (status: string) => {
    switch (status) {
      case "attention":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Compliance Score</span>
          </CardTitle>
          <CardDescription>Overall system compliance with DPDP Act and security standards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Compliance</span>
            <span className="text-2xl font-bold text-green-600">{complianceScore}%</span>
          </div>
          <Progress value={complianceScore} className="h-3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Data Protection</p>
                <p className="text-sm text-muted-foreground">98% compliant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Access Controls</p>
                <p className="text-sm text-muted-foreground">96% compliant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium">Audit Logging</p>
                <p className="text-sm text-muted-foreground">88% compliant</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Events</span>
          </CardTitle>
          <CardDescription>Events requiring attention or review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {riskEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{event.type}</h4>
                  <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Last: {event.lastOccurrence}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{event.count}</p>
                <p className="text-sm text-muted-foreground">events</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Users (24h)</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Login Sessions</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Access Events</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed Attempts</span>
                <span className="font-medium text-red-600">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Operations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Records Accessed</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Exports</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Calculations</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Notifications Sent</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
