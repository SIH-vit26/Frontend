"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, FileText, MessageSquare, Calendar, Settings } from "lucide-react"

interface AuditTimelineProps {
  studentId: string
}

interface AuditEvent {
  id: string
  action: string
  actor: string
  actorRole: string
  timestamp: Date
  details?: string
  type: "profile" | "case" | "comment" | "session" | "system"
}

export function AuditTimeline({ studentId }: AuditTimelineProps) {
  // Mock audit events
  const auditEvents: AuditEvent[] = [
    {
      id: "1",
      action: "Case opened",
      actor: "Dr. Sarah Johnson",
      actorRole: "Mentor",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: "High priority case opened due to declining attendance",
      type: "case",
    },
    {
      id: "2",
      action: "Comment added",
      actor: "Dr. Sarah Johnson",
      actorRole: "Mentor",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      details: "Added note about counseling session outcomes",
      type: "comment",
    },
    {
      id: "3",
      action: "Counseling session scheduled",
      actor: "Admin User",
      actorRole: "Admin",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      details: "Google Meet session scheduled for March 20, 2024",
      type: "session",
    },
    {
      id: "4",
      action: "Profile viewed",
      actor: "Prof. Michael Chen",
      actorRole: "Mentor",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      type: "profile",
    },
    {
      id: "5",
      action: "Risk score updated",
      actor: "System",
      actorRole: "System",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      details: "Risk score increased from 72 to 85 due to attendance decline",
      type: "system",
    },
    {
      id: "6",
      action: "Study plan generated",
      actor: "Dr. Sarah Johnson",
      actorRole: "Mentor",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      details: "Personalized study plan created with focus on mathematics",
      type: "system",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "profile":
        return <User className="h-4 w-4" />
      case "case":
        return <FileText className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "session":
        return <Calendar className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "profile":
        return "text-blue-600"
      case "case":
        return "text-red-600"
      case "comment":
        return "text-green-600"
      case "session":
        return "text-purple-600"
      case "system":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Audit Timeline
        </CardTitle>
        <CardDescription>Complete history of actions performed on this student record</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {auditEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full bg-muted ${getEventColor(event.type)}`}>
                  {getEventIcon(event.type)}
                </div>
                {index < auditEvents.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium">{event.action}</h4>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(event.timestamp)}</span>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-xs">
                      {event.actor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {event.actor} ({event.actorRole})
                  </span>
                </div>
                {event.details && <p className="text-xs text-muted-foreground">{event.details}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
