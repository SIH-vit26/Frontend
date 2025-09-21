"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Phone, Users, Calendar, Send, Eye } from "lucide-react"

interface CreateNotificationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateNotificationModal({ open, onOpenChange }: CreateNotificationModalProps) {
  const [activeTab, setActiveTab] = useState("compose")
  const [notification, setNotification] = useState({
    title: "",
    type: "",
    template: "",
    subject: "",
    message: "",
    channels: [] as string[],
    recipients: "all",
    customRecipients: "",
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
  })

  const templates = [
    { id: "high-risk-alert", name: "High Risk Student Alert", type: "alert" },
    { id: "weekly-report", name: "Weekly Progress Report", type: "report" },
    { id: "fee-reminder", name: "Fee Payment Reminder", type: "reminder" },
    { id: "counseling-session", name: "Counseling Session Scheduled", type: "appointment" },
  ]

  const channels = [
    { id: "email", name: "Email", icon: Mail },
    { id: "sms", name: "SMS", icon: MessageSquare },
    { id: "whatsapp", name: "WhatsApp", icon: Phone },
  ]

  const handleChannelChange = (channelId: string, checked: boolean) => {
    if (checked) {
      setNotification((prev) => ({
        ...prev,
        channels: [...prev.channels, channelId],
      }))
    } else {
      setNotification((prev) => ({
        ...prev,
        channels: prev.channels.filter((c) => c !== channelId),
      }))
    }
  }

  const handleSend = () => {
    // Handle notification sending logic here
    console.log("Sending notification:", notification)
    onOpenChange(false)
  }

  const handlePreview = () => {
    setActiveTab("preview")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>Compose and send notifications to students, parents, or mentors</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="recipients">Recipients</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input
                  id="title"
                  value={notification.title}
                  onChange={(e) => setNotification((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter notification title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={notification.type}
                  onValueChange={(value) => setNotification((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="report">Report</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                    <SelectItem value="appointment">Appointment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Template (Optional)</Label>
              <Select
                value={notification.template}
                onValueChange={(value) => setNotification((prev) => ({ ...prev, template: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template or create from scratch" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={notification.subject}
                onChange={(e) => setNotification((prev) => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject line"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={notification.message}
                onChange={(e) => setNotification((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message here..."
                rows={6}
              />
            </div>

            <div className="space-y-3">
              <Label>Delivery Channels</Label>
              <div className="flex flex-wrap gap-4">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <div key={channel.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={channel.id}
                        checked={notification.channels.includes(channel.id)}
                        onCheckedChange={(checked) => handleChannelChange(channel.id, checked as boolean)}
                      />
                      <Label htmlFor={channel.id} className="flex items-center space-x-2 cursor-pointer">
                        <Icon className="h-4 w-4" />
                        <span>{channel.name}</span>
                      </Label>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Select Recipients</Label>
                <Select
                  value={notification.recipients}
                  onValueChange={(value) => setNotification((prev) => ({ ...prev, recipients: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="high-risk">High Risk Students</SelectItem>
                    <SelectItem value="medium-risk">Medium Risk Students</SelectItem>
                    <SelectItem value="low-risk">Low Risk Students</SelectItem>
                    <SelectItem value="batch-2023">Batch 2023</SelectItem>
                    <SelectItem value="batch-2024">Batch 2024</SelectItem>
                    <SelectItem value="custom">Custom Selection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {notification.recipients === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-recipients">Custom Recipients</Label>
                  <Textarea
                    id="custom-recipients"
                    value={notification.customRecipients}
                    onChange={(e) => setNotification((prev) => ({ ...prev, customRecipients: e.target.value }))}
                    placeholder="Enter student IDs, email addresses, or phone numbers (one per line)"
                    rows={4}
                  />
                </div>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recipient Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Total Recipients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preview</CardTitle>
                <CardDescription>Preview how your notification will appear to recipients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{notification.subject || "Subject Line"}</h3>
                      <Badge>{notification.type || "Type"}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {notification.message || "Your message will appear here..."}
                    </div>
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <span className="text-xs text-muted-foreground">Channels:</span>
                      {notification.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Send immediately</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
