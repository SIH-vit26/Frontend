"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RiskBadge } from "@/components/ui/risk-badge"
import { AlertTriangle, Users, DollarSign, GraduationCap } from "lucide-react"
import type { Student } from "@/lib/types"

interface TopAtRiskListProps {
  students: Student[]
  onStudentClick: (student: Student) => void
}

export function TopAtRiskList({ students, onStudentClick }: TopAtRiskListProps) {
  const getRiskIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "attendance":
        return <Users className="h-3 w-3" />
      case "marks":
      case "assessment":
        return <GraduationCap className="h-3 w-3" />
      case "fees":
        return <DollarSign className="h-3 w-3" />
      default:
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const getRiskBadges = (reasons: string[]) => {
    const badges = []
    const hasAttendance = reasons.some((r) => r.toLowerCase().includes("attendance"))
    const hasMarks = reasons.some((r) => r.toLowerCase().includes("marks") || r.toLowerCase().includes("score"))
    const hasFees = reasons.some((r) => r.toLowerCase().includes("fee"))

    if (hasAttendance) badges.push({ type: "Attendance", icon: <Users className="h-3 w-3" /> })
    if (hasMarks) badges.push({ type: "Marks", icon: <GraduationCap className="h-3 w-3" /> })
    if (hasFees) badges.push({ type: "Fees", icon: <DollarSign className="h-3 w-3" /> })

    return badges
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Top 10 At-Risk Students
        </CardTitle>
        <CardDescription>Students requiring immediate attention and intervention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {students.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <p>No high-risk students found</p>
              <p className="text-sm">All students are performing well!</p>
            </div>
          ) : (
            students.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onStudentClick(student)}
              >
                <div className="flex-shrink-0 text-sm font-medium text-muted-foreground w-6">#{index + 1}</div>

                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium truncate">{student.name}</p>
                    <RiskBadge level={student.riskLevel} score={student.compositeRiskScore} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{student.program}</p>

                  {/* Risk Badges */}
                  <div className="flex items-center space-x-1 mb-2">
                    {getRiskBadges(student.reasons).map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="outline" className="text-xs">
                        {badge.icon}
                        <span className="ml-1">{badge.type}</span>
                      </Badge>
                    ))}
                  </div>

                  {/* Why Now Explanation */}
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Why now: </span>
                    {student.reasons.join(", ")}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
