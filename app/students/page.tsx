"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentsDataTable } from "@/components/students/students-data-table"
import { useStudentStore } from "@/lib/stores/student-store"
import { Search, Download, Users, UserCheck, AlertTriangle, GraduationCap } from "lucide-react"

export default function StudentsPage() {
  const { students } = useStudentStore()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [programFilter, setProgramFilter] = useState<string>("all")
  const [mentorFilter, setMentorFilter] = useState<string>("all")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter
    const matchesProgram = programFilter === "all" || student.program === programFilter
    const matchesMentor = mentorFilter === "all" || student.mentorId === mentorFilter

    return matchesSearch && matchesRisk && matchesProgram && matchesMentor
  })

  const handleExportData = () => {
    // Simulate CSV export
    const csvContent = [
      "ID,Name,Program,Attendance,Score,Fee Status,Risk Level,Risk Score",
      ...filteredStudents.map(
        (s) =>
          `${s.id},${s.name},${s.program},${s.attendancePercent}%,${s.avgScore}%,${s.feeStatus},${s.riskLevel},${s.compositeRiskScore}`,
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

  const uniquePrograms = [...new Set(students.map((s) => s.program))]
  const uniqueMentors = [...new Set(students.map((s) => s.mentorId).filter(Boolean))]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Management"
        description={`Manage and monitor ${students.length} students across all programs`}
      >
        <Button variant="outline" size="sm" onClick={handleExportData}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </PageHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="at-risk" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">At Risk</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Programs</span>
          </TabsTrigger>
          <TabsTrigger value="mentoring" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Mentoring</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="red">High Risk</SelectItem>
                  <SelectItem value="amber">Medium Risk</SelectItem>
                  <SelectItem value="green">Low Risk</SelectItem>
                </SelectContent>
              </Select>

              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {uniquePrograms.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={mentorFilter} onValueChange={setMentorFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Mentor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mentors</SelectItem>
                  {uniqueMentors.map((mentorId) => (
                    <SelectItem key={mentorId} value={mentorId!}>
                      {mentorId === "mentor-1" ? "Dr. Sarah Johnson" : "Prof. Michael Chen"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              <span>High Risk: {filteredStudents.filter((s) => s.riskLevel === "red").length}</span>
              <span>Medium Risk: {filteredStudents.filter((s) => s.riskLevel === "amber").length}</span>
              <span>Low Risk: {filteredStudents.filter((s) => s.riskLevel === "green").length}</span>
            </div>
          </div>

          {/* Data Table */}
          <StudentsDataTable students={filteredStudents} />
        </TabsContent>

        <TabsContent value="at-risk" className="space-y-6">
          <StudentsDataTable students={filteredStudents.filter((s) => s.riskLevel === "red")} />
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-4">
            {uniquePrograms.map((program) => {
              const programStudents = filteredStudents.filter((s) => s.program === program)
              return (
                <div key={program} className="space-y-4">
                  <h3 className="text-lg font-semibold">{program}</h3>
                  <StudentsDataTable students={programStudents} />
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="mentoring" className="space-y-6">
          <div className="grid gap-4">
            {uniqueMentors.map((mentorId) => {
              const mentorStudents = filteredStudents.filter((s) => s.mentorId === mentorId)
              const mentorName = mentorId === "mentor-1" ? "Dr. Sarah Johnson" : "Prof. Michael Chen"
              return (
                <div key={mentorId} className="space-y-4">
                  <h3 className="text-lg font-semibold">{mentorName}</h3>
                  <StudentsDataTable students={mentorStudents} />
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
