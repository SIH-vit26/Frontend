"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RiskBadge } from "@/components/ui/risk-badge"
import { UserPlus, MessageSquare, FolderOpen, Calendar, Phone, Mail } from "lucide-react"
import type { Student } from "@/lib/types"

interface CaseDrawerProps {
  student: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CaseDrawer({ student, open, onOpenChange }: CaseDrawerProps) {
  const [note, setNote] = useState("")
  const [selectedMentor, setSelectedMentor] = useState("")
  const [caseStatus, setCaseStatus] = useState<"open" | "closed">("closed")

  if (!student) return null

  const handleAssignMentor = () => {
    // Handle mentor assignment
    console.log("Assigning mentor:", selectedMentor, "to student:", student.id)
  }

  const handleAddNote = () => {
    if (note.trim()) {
      // Handle adding note
      console.log("Adding note:", note, "for student:", student.id)
      setNote("")
    }
  }

  const handleOpenCase = () => {
    setCaseStatus("open")
    // Handle case opening logic
    console.log("Opening case for student:", student.id)
  }

  const handleScheduleCounseling = () => {
    // Handle counseling scheduling
    console.log("Scheduling counseling for student:", student.id)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{student.name}</SheetTitle>
              <SheetDescription>
                {student.program} • ID: {student.id}
              </SheetDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <RiskBadge level={student.riskLevel} score={student.compositeRiskScore} />
            <Badge variant={caseStatus === "open" ? "default" : "secondary"}>
              Case {caseStatus === "open" ? "Open" : "Closed"}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{student.attendancePercent}%</div>
              <div className="text-xs text-muted-foreground">Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{student.avgScore}%</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold capitalize">{student.feeStatus}</div>
              <div className="text-xs text-muted-foreground">Fee Status</div>
            </div>
          </div>

          {/* Why Now */}
          <div className="space-y-2">
            <h4 className="font-medium">Why Now</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              {student.reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Actions</h4>

            {/* Assign Mentor */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Mentor</label>
              <div className="flex space-x-2">
                <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentor-1">Dr. Sarah Johnson</SelectItem>
                    <SelectItem value="mentor-2">Prof. Michael Chen</SelectItem>
                    <SelectItem value="mentor-3">Dr. Priya Sharma</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" onClick={handleAssignMentor} disabled={!selectedMentor}>
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add Note */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Note</label>
              <div className="space-y-2">
                <Textarea
                  placeholder="Enter your observations or notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
                <Button size="sm" onClick={handleAddNote} disabled={!note.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>

            {/* Case Management */}
            <div className="flex space-x-2">
              <Button
                variant={caseStatus === "open" ? "secondary" : "default"}
                onClick={handleOpenCase}
                disabled={caseStatus === "open"}
                className="flex-1"
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                {caseStatus === "open" ? "Case Open" : "Open Case"}
              </Button>
              <Button variant="outline" onClick={handleScheduleCounseling} className="flex-1 bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Counseling
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{student.name.toLowerCase().replace(" ", ".")}@student.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91-XXXX-XXX-XXX</span>
              </div>
            </div>
          </div>

          {/* Guardian Contact */}
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Guardian Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>parent.{student.name.toLowerCase().replace(" ", ".")}@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91-XXXX-XXX-XXX</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
