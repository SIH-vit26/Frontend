"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RiskBadge } from "@/components/ui/risk-badge"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import type { Student } from "@/lib/types"

interface StudentsDataTableProps {
  students: Student[]
}

export function StudentsDataTable({ students }: StudentsDataTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const router = useRouter()

  const totalPages = Math.ceil(students.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStudents = students.slice(startIndex, endIndex)

  const handleViewStudent = (studentId: string) => {
    router.push(`/students/${studentId}`)
  }

  const getFeeStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
      case "partial":
        return <Badge variant="outline">Partial</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-muted-foreground mb-2">No students found</div>
            <div className="text-sm text-muted-foreground">Try adjusting your filters</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Attempts/Backlogs</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.program}</div>
                        <div className="text-sm text-muted-foreground">{student.cohort}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <div className="font-medium">{student.attendancePercent}%</div>
                        <div
                          className={`text-sm ${
                            student.attendancePercent < 75
                              ? "text-red-600"
                              : student.attendancePercent < 85
                                ? "text-amber-600"
                                : "text-green-600"
                          }`}
                        >
                          {student.attendancePercent < 75 ? "Low" : student.attendancePercent < 85 ? "Fair" : "Good"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        <div className="font-medium">{student.avgScore}%</div>
                        <div
                          className={`text-sm ${
                            student.avgScore < 60
                              ? "text-red-600"
                              : student.avgScore < 75
                                ? "text-amber-600"
                                : "text-green-600"
                          }`}
                        >
                          {student.avgScore < 60 ? "Poor" : student.avgScore < 75 ? "Average" : "Good"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getFeeStatusBadge(student.feeStatus)}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">
                          {student.attemptsCount}/{student.backlogsCount}
                        </div>
                        <div className="text-sm text-muted-foreground">Attempts/Backlogs</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RiskBadge level={student.riskLevel} />
                    </TableCell>
                    <TableCell>
                      <div className="text-right font-medium">{student.compositeRiskScore}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewStudent(student.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, students.length)} of {students.length} students
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
