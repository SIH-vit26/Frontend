"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Mail, MessageSquare, Calendar, Search, Filter, Plus, Eye, Edit, Trash2, Copy } from "lucide-react"

export function NotificationTemplates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const templates = [
    {
      id: 1,
      name: "High Risk Student Alert",
      type: "alert",
      category: "Risk Management",
      subject: "Urgent: Student {{student_name}} requires immediate attention",
      preview:
        "Student {{student_name}} has been flagged as high risk due to declining attendance and academic performance...",
      channels: ["email", "sms"],
      lastUsed: "2 days ago",
      usage: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Weekly Progress Report",
      type: "report",
      category: "Reports",
      subject: "Weekly Student Progress Report - {{date}}",
      preview: "Here is your weekly summary of student progress and risk indicators...",
      channels: ["email"],
      lastUsed: "1 week ago",
      usage: 156,
      status: "active",
    },
    {
      id: 3,
      name: "Fee Payment Reminder",
      type: "reminder",
      category: "Finance",
      subject: "Fee Payment Due - {{student_name}}",
      preview: "This is a friendly reminder that the fee payment for {{student_name}} is due...",
      channels: ["email", "sms", "whatsapp"],
      lastUsed: "3 days ago",
      usage: 89,
      status: "active",
    },
    {
      id: 4,
      name: "Counseling Session Scheduled",
      type: "appointment",
      category: "Counseling",
      subject: "Counseling Session Scheduled - {{date}}",
      preview: "A counseling session has been scheduled for {{student_name}} on {{date}}...",
      channels: ["email", "sms"],
      lastUsed: "5 days ago",
      usage: 23,
      status: "active",
    },
    {
      id: 5,
      name: "Attendance Alert",
      type: "alert",
      category: "Attendance",
      subject: "Low Attendance Alert - {{student_name}}",
      preview: "Student {{student_name}} has attendance below the required threshold...",
      channels: ["email", "sms"],
      lastUsed: "1 week ago",
      usage: 67,
      status: "draft",
    },
  ]

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert":
        return Bell
      case "report":
        return Mail
      case "reminder":
        return Calendar
      case "appointment":
        return Calendar
      default:
        return MessageSquare
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return Mail
      case "sms":
        return MessageSquare
      case "whatsapp":
        return MessageSquare
      default:
        return MessageSquare
    }
  }

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || template.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
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
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => {
          const TypeIcon = getTypeIcon(template.type)
          return (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <TypeIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getTypeColor(template.type)}>{template.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Subject</p>
                  <p className="text-sm">{template.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Preview</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.preview}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {template.channels.map((channel) => {
                      const ChannelIcon = getChannelIcon(channel)
                      return (
                        <div key={channel} className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <ChannelIcon className="h-3 w-3" />
                          <span>{channel}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-xs text-muted-foreground">Used {template.usage} times</div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Last used {template.lastUsed}</span>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
