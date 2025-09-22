"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StudentsDataTable } from "@/components/students/students-data-table"
import { useStudentStore } from "@/lib/stores/student-store"
import { Search, Download, Users } from "lucide-react"

export default function StudentsPage() {
  const { students } = useStudentStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRisk = riskFilter === "all" || student.risk_level === riskFilter
    return matchesSearch && matchesRisk
  })

  const handleExportData = () => {
    const csvContent = [
      "ID,Name,Email,Math,Physics,Chemistry,Absences,Fee Paid,Fee Pending,Fee Due Date,Risk Level,Reasons",
      ...filteredStudents.map(
        (s) =>
          `${s.id},${s.first_name} ${s.last_name},${s.email},${s.math_score},${s.physics_score},${s.chemistry_score},${s.absence_days},${s.fee_paid},${s.fee_pending},${s.fee_due_date},${s.risk_level},"${s.risk_reasons?.join("; ")}"`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students-export.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Management"
        description={`Manage and monitor ${students.length} students from Firestore`}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </PageHeader>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={riskFilter} onValueChange={setRiskFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="High Risk">High Risk</SelectItem>
            <SelectItem value="Medium Risk">Medium Risk</SelectItem>
            <SelectItem value="Low Risk">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>
            Showing {filteredStudents.length} of {students.length} students
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>
            High Risk:{" "}
            {filteredStudents.filter((s) => s.risk_level === "High Risk").length}
          </span>
          <span>
            Medium Risk:{" "}
            {filteredStudents.filter((s) => s.risk_level === "Medium Risk").length}
          </span>
          <span>
            Low Risk:{" "}
            {filteredStudents.filter((s) => s.risk_level === "Low Risk").length}
          </span>
        </div>
      </div>

      {/* Data Table */}
      <StudentsDataTable students={filteredStudents} />
    </div>
  )
}
