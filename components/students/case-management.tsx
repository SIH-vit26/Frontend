"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderOpen, FolderClosed, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CaseManagementProps {
  studentId: string
}

export function CaseManagement({ studentId }: CaseManagementProps) {
  const [caseStatus, setCaseStatus] = useState<"open" | "closed">("closed")
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")
  const [assignedTo, setAssignedTo] = useState<string>("")
  const [slaDueDate, setSlaDueDate] = useState<string>("")
  const { toast } = useToast()

  const handleOpenCase = () => {
    setCaseStatus("open")
    setSlaDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]) // 7 days from now
    toast({
      title: "Case opened",
      description: "Student case has been opened for intervention tracking",
    })
  }

  const handleCloseCase = () => {
    setCaseStatus("closed")
    setSlaDueDate("")
    toast({
      title: "Case closed",
      description: "Student case has been closed successfully",
    })
  }

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="outline">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low Priority</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {caseStatus === "open" ? <FolderOpen className="h-5 w-5" /> : <FolderClosed className="h-5 w-5" />}
          Case Management
        </CardTitle>
        <CardDescription>Track intervention cases and assign responsibilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Case Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Case Status:</span>
          <Badge variant={caseStatus === "open" ? "default" : "secondary"}>
            {caseStatus === "open" ? "Open" : "Closed"}
          </Badge>
        </div>

        {caseStatus === "open" && (
          <>
            {/* Severity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity Level</label>
              <Select value={severity} onValueChange={(value: "low" | "medium" | "high") => setSeverity(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              {getSeverityBadge(severity)}
            </div>

            {/* Owner Assignment */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assigned To</label>
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentor-1">Dr. Sarah Johnson</SelectItem>
                  <SelectItem value="mentor-2">Prof. Michael Chen</SelectItem>
                  <SelectItem value="mentor-3">Dr. Priya Sharma</SelectItem>
                  <SelectItem value="admin-1">Admin User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SLA Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">SLA Due Date</label>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={slaDueDate}
                  onChange={(e) => setSlaDueDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-input rounded-md text-sm"
                />
              </div>
            </div>

            {/* Case Info */}
            <div className="p-3 bg-muted/50 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Opened:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              {assignedTo && (
                <div className="flex items-center justify-between text-sm">
                  <span>Owner:</span>
                  <span>{assignedTo === "mentor-1" ? "Dr. Sarah Johnson" : "Prof. Michael Chen"}</span>
                </div>
              )}
              {slaDueDate && (
                <div className="flex items-center justify-between text-sm">
                  <span>Due:</span>
                  <span>{new Date(slaDueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {caseStatus === "closed" ? (
            <Button onClick={handleOpenCase} className="flex-1">
              <FolderOpen className="h-4 w-4 mr-2" />
              Open Case
            </Button>
          ) : (
            <Button onClick={handleCloseCase} variant="outline" className="flex-1 bg-transparent">
              <FolderClosed className="h-4 w-4 mr-2" />
              Close Case
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
