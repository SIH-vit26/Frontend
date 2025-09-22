"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Video, Phone, MapPin, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CounselingSchedulerProps {
  studentId: string
}

interface CounselingSession {
  id: string
  date: string
  time: string
  channel: "meet" | "teams" | "zoom" | "phone" | "in-person"
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

export function CounselingScheduler({ studentId }: CounselingSchedulerProps) {
  const [sessions, setSessions] = useState<CounselingSession[]>([
    {
      id: "1",
      date: "2024-03-20",
      time: "14:00",
      channel: "meet",
      status: "scheduled",
    },
    {
      id: "2",
      date: "2024-03-15",
      time: "10:30",
      channel: "in-person",
      status: "completed",
      notes: "Discussed study plan and attendance improvement strategies",
    },
  ])
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [newChannel, setNewChannel] = useState<string>("")
  const { toast } = useToast()

  const handleScheduleSession = () => {
    if (!newDate || !newTime || !newChannel) return

    const session: CounselingSession = {
      id: Date.now().toString(),
      date: newDate,
      time: newTime,
      channel: newChannel as CounselingSession["channel"],
      status: "scheduled",
    }

    setSessions([session, ...sessions])
    setNewDate("")
    setNewTime("")
    setNewChannel("")

    toast({
      title: "Session scheduled",
      description: `Counseling session scheduled for ${new Date(newDate).toLocaleDateString()} at ${newTime}`,
    })
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "meet":
      case "teams":
      case "zoom":
        return <Video className="h-3 w-3" />
      case "phone":
        return <Phone className="h-3 w-3" />
      case "in-person":
        return <MapPin className="h-3 w-3" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case "meet":
        return "Google Meet"
      case "teams":
        return "Microsoft Teams"
      case "zoom":
        return "Zoom"
      case "phone":
        return "Phone Call"
      case "in-person":
        return "In Person"
      default:
        return channel
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Counseling Sessions
        </CardTitle>
        <CardDescription>Schedule and track counseling sessions with the student</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Schedule New Session */}
        <div className="space-y-3 p-3 border rounded-lg">
          <h4 className="text-sm font-medium">Schedule New Session</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Date</label>
              <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Time</label>
              <Input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Channel</label>
            <Select value={newChannel} onValueChange={setNewChannel}>
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="meet">Google Meet</SelectItem>
                <SelectItem value="teams">Microsoft Teams</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
                <SelectItem value="in-person">In Person</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleScheduleSession} disabled={!newDate || !newTime || !newChannel} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>

        {/* Sessions List */}
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getChannelIcon(session.channel)}
                <div>
                  <div className="text-sm font-medium">
                    {new Date(session.date).toLocaleDateString()} at {session.time}
                  </div>
                  <div className="text-xs text-muted-foreground">{getChannelLabel(session.channel)}</div>
                  {session.notes && <div className="text-xs text-muted-foreground mt-1">{session.notes}</div>}
                </div>
              </div>
              {getStatusBadge(session.status)}
            </div>
          ))}
        </div>

        {sessions.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-sm">No counseling sessions scheduled</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
