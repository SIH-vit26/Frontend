"use client"

import { useParams } from "next/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RiskBadge } from "@/components/ui/risk-badge"
import { AttendanceTrendChart } from "@/components/students/attendance-trend-chart"
import { SubjectScoresChart } from "@/components/students/subject-scores-chart"
import { FeeHistoryTimeline } from "@/components/students/fee-history-timeline"
import { RiskBreakdownChart } from "@/components/students/risk-breakdown-chart"
import { CommentEditor } from "@/components/students/comment-editor"
import { CaseManagement } from "@/components/students/case-management"
import { CounselingScheduler } from "@/components/students/counseling-scheduler"
import { StudyPlanPanel } from "@/components/students/study-plan-panel"
import { AuditTimeline } from "@/components/students/audit-timeline"
import { useStudentStore } from "@/lib/stores/student-store"
import { ArrowLeft, Phone, Mail, User, MapPin } from "lucide-react"
import Link from "next/link"

export default function StudentProfilePage() {
  const params = useParams()
  const studentId = params.id as string
  const { students } = useStudentStore()

  const student = students.find((s) => s.id === studentId)

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Student Not Found</h2>
          <p className="text-muted-foreground mb-4">The student with ID {studentId} could not be found.</p>
          <Link href="/students">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Students
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Student Profile" description={`Detailed view and case management for ${student.name}`}>
        <Link href="/students">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
        </Link>
      </PageHeader>

      {/* Student Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback className="text-lg">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <RiskBadge level={student.riskLevel} score={student.compositeRiskScore} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Student ID:</span>
                  <div className="font-medium">{student.id}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Program:</span>
                  <div className="font-medium">{student.program}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cohort:</span>
                  <div className="font-medium">{student.cohort}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Active:</span>
                  <div className="font-medium">{new Date(student.lastActiveAt).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            {/* Guardian Contact Mini Card */}
            <Card className="w-64">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Guardian Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">parent.{student.name.toLowerCase().replace(" ", ".")}@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">+91-XXXX-XXX-XXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">Mumbai, Maharashtra</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance Trend */}
          <AttendanceTrendChart studentId={student.id} />

          {/* Subject Scores */}
          <SubjectScoresChart studentId={student.id} />

          {/* Fee History */}
          <FeeHistoryTimeline studentId={student.id} />

          {/* Risk Breakdown */}
          <RiskBreakdownChart student={student} />
        </div>

        {/* Right Column - Management Tools */}
        <div className="space-y-6">
          {/* Why Now Explainer */}
          <Card>
            <CardHeader>
              <CardTitle>Why Now</CardTitle>
              <CardDescription>Current risk factors requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {student.reasons.length > 0 ? (
                <div className="space-y-2">
                  {student.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No immediate risk factors identified.</p>
              )}
            </CardContent>
          </Card>

          {/* Comment Editor */}
          <CommentEditor studentId={student.id} />

          {/* Case Management */}
          <CaseManagement studentId={student.id} />

          {/* Counseling Scheduler */}
          <CounselingScheduler studentId={student.id} />

          {/* Study Plan */}
          <StudyPlanPanel studentId={student.id} />
        </div>
      </div>

      {/* Audit Timeline */}
      <AuditTimeline studentId={student.id} />
    </div>
  )
}
