"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Download, RefreshCw, BarChart3 } from "lucide-react"

export function NotificationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  const notifications = [
    {
      id: "NOT-001",
      title: "High Risk Alert - Batch 2023",
      type: "alert",
      recipients: 45,
      sent: "2024-01-15 14:30",
      status: "delivered",
      delivered: 43,
      opened: 35,
      clicked: 12,
      openRate: "81%",
      clickRate: "28%",
      template: "High Risk Student Alert",
    },
    {
      id: "NOT-002",
      title: "Weekly Progress Report",
      type: "report",
      recipients: 156,
      sent: "2024-01-14 09:00",
      status: "delivered",
      delivered: 154,
      opened: 98,
      clicked: 45,
      openRate: "64%",
      clickRate: "29%",
      template: "Weekly Progress Report",
    },
    {
      id: "NOT-003",
      title: "Fee Payment Reminder",
      type: "reminder",
      recipients: 23,
      sent: "2024-01-12 16:45",
      status: "delivered",
      delivered: 23,
      opened: 20,
      clicked: 18,
      openRate: "87%",
      clickRate: "78%",
      template: "Fee Payment Reminder",
    },
    {
      id: "NOT-004",
      title: "Counseling Session Scheduled",
      type: "appointment",
      recipients: 12,
      sent: "2024-01-10 11:15",
      status: "delivered",
      delivered: 12,
      opened: 11,
      clicked: 9,
      openRate: "92%",
      clickRate: "75%",
      template: "Counseling Session Scheduled",
    },
    {
      id: "NOT-005",
      title: "Attendance Alert - Multiple Students",
      type: "alert",
      recipients: 67,
      sent: "2024-01-08 13:20",
      status: "failed",
      delivered: 45,
      opened: 32,
      clicked: 8,
      openRate: "71%",
      clickRate: "18%",
      template: "Attendance Alert",
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-800"
      case "report":
        return "bg-blue-100 text-blue-800"
      case "reminder":
        return "bg-yellow-100 text-yellow-800"
      case "appointment":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus
    const matchesType = filterType === "all" || notification.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="alert">Alerts</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
            <SelectItem value="reminder">Reminders</SelectItem>
            <SelectItem value="appointment">Appointments</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>Complete history of all sent notifications with delivery metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(notification.type)}>{notification.type}</Badge>
                  </TableCell>
                  <TableCell>{notification.recipients}</TableCell>
                  <TableCell className="text-sm">{notification.sent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(notification.status)}>{notification.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{notification.openRate}</span>
                      <span className="text-muted-foreground ml-1">
                        ({notification.opened}/{notification.delivered})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{notification.clickRate}</span>
                      <span className="text-muted-foreground ml-1">
                        ({notification.clicked}/{notification.opened})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
