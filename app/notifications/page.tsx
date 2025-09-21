"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Send, Mail, MessageSquare, Calendar, Plus, Eye, BarChart3 } from "lucide-react"
import { NotificationTemplates } from "@/components/notifications/notification-templates"
import { NotificationHistory } from "@/components/notifications/notification-history"
import { NotificationSettings } from "@/components/notifications/notification-settings"
import { CreateNotificationModal } from "@/components/notifications/create-notification-modal"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const stats = [
    { label: "Total Sent", value: "2,847", icon: Send, change: "+12%" },
    { label: "Delivered", value: "2,731", icon: Mail, change: "+8%" },
    { label: "Opened", value: "1,923", icon: Eye, change: "+15%" },
    { label: "Active Templates", value: "12", icon: MessageSquare, change: "+2" },
  ]

  const recentNotifications = [
    {
      id: 1,
      title: "High Risk Alert - Batch 2023",
      type: "alert",
      recipients: 45,
      sent: "2 hours ago",
      status: "delivered",
      openRate: "78%",
    },
    {
      id: 2,
      title: "Weekly Progress Report",
      type: "report",
      recipients: 156,
      sent: "1 day ago",
      status: "delivered",
      openRate: "65%",
    },
    {
      id: 3,
      title: "Fee Payment Reminder",
      type: "reminder",
      recipients: 23,
      sent: "3 days ago",
      status: "delivered",
      openRate: "89%",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return Bell
      case "report":
        return BarChart3
      case "reminder":
        return Calendar
      default:
        return MessageSquare
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Manage notification campaigns, templates, and delivery tracking"
        action={
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
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
                        <p className="text-xs text-green-600">{stat.change}</p>
                      </div>
                      <Icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Latest notification campaigns and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type)
                  return (
                    <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <TypeIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {notification.recipients} recipients • {notification.sent}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                        <span className="text-sm font-medium">{notification.openRate}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <NotificationTemplates />
        </TabsContent>

        <TabsContent value="history">
          <NotificationHistory />
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>
      </Tabs>

      <CreateNotificationModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
