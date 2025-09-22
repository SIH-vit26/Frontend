"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import type { Student } from "@/lib/stores/student-store"

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
                  <TableHead>Email</TableHead>
                  <TableHead>Scores</TableHead>
                  <TableHead>Absences</TableHead>
                  <TableHead>Fee Pending</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStudents.map((student) => {
                  const fullName = `${student.first_name} ${student.last_name}`
                  return (
                    <TableRow key={student.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={"/placeholder.svg"} alt={fullName} />
                            <AvatarFallback>
                              {fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{fullName}</div>
                            <div className="text-sm text-muted-foreground">{student.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        Math: {student.math_score}, Phys: {student.physics_score}, Chem: {student.chemistry_score}
                      </TableCell>
                      <TableCell>{student.absence_days}</TableCell>
                      <TableCell>
                        {student.fee_pending ? (
                          <Badge variant="destructive">₹{student.fee_pending}</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Clear</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            student.risk_level === "High Risk"
                              ? "bg-red-100 text-red-800"
                              : student.risk_level === "Medium Risk"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {student.risk_level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewStudent(student.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
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
