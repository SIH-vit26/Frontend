"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import type { Student } from "@/lib/types"

export function TopAtRiskList({
  students,
  onStudentClick,
}: {
  students: Student[]
  onStudentClick: (s: Student) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top At-Risk Students</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center space-x-4 cursor-pointer hover:bg-muted/30 p-2 rounded-md"
            onClick={() => onStudentClick(student)}
          >
            <Avatar>
              <AvatarFallback>
                {student.name
                  ? student.name
                      .split(" ")
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join("")
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">
                {student.name || "Unnamed Student"}
              </p>
              <p className="text-sm text-muted-foreground">
                {student.program || "Unknown Program"}
              </p>
            </div>
            <div className="flex items-center space-x-2 w-32">
              <Progress
                value={student.compositeRiskScore}
                className="w-full"
              />
              <span className="text-sm font-medium">
                {student.compositeRiskScore}
              </span>
            </div>
          </div>
        ))}
        {students.length === 0 && (
          <p className="text-sm text-muted-foreground">No students at risk.</p>
        )}
      </CardContent>
    </Card>
  )
}
