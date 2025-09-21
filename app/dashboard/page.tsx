"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { RiskHeatmap } from "@/components/dashboard/risk-heatmap"
import { TopAtRiskList } from "@/components/dashboard/top-at-risk-list"
import { WhatIfPanel } from "@/components/dashboard/what-if-panel"
import { CaseDrawer } from "@/components/dashboard/case-drawer"
import { Button } from "@/components/ui/button"
import { Calendar, Users, AlertTriangle, CheckCircle, DollarSign, GraduationCap, TrendingUp } from "lucide-react"
import { useDashboardStore } from "@/lib/stores/dashboard-store"
import { useStudentStore } from "@/lib/stores/student-store"
import type { Student } from "@/lib/types"
import { useEffect } from "react"



export default function DashboardPage() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showWhatIf, setShowWhatIf] = useState(false)
  
  const { students } = useStudentStore()
  const { stats, fetchDashboardData } = useDashboardStore()
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (!stats) {
    return <div>Loading dashboard data...</div>
  }

  const topAtRiskStudents = students
    .filter((s) => s.riskLevel === "red")
    .sort((a, b) => b.compositeRiskScore - a.compositeRiskScore)
    .slice(0, 10)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohort Risk Overview"
        description="Monitor student risk levels and identify intervention opportunities"
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowWhatIf(!showWhatIf)}>
            What-If Analysis
          </Button>
        </div>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard title="Students Scanned" value={stats.studentsScanned} icon={Users} />
        <StatCard
          title="High Risk"
          value={stats.redCount}
          icon={AlertTriangle}
          description="Immediate attention needed"
        />
        <StatCard title="Medium Risk" value={stats.amberCount} icon={TrendingUp} description="Monitor closely" />
        <StatCard title="Low Risk" value={stats.greenCount} icon={CheckCircle} description="On track" />
        <StatCard
          title="Avg Attendance"
          value={`${stats.avgAttendance}%`}
          icon={Users}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Fee Compliance"
          value={`${stats.feeCompliance}%`}
          icon={DollarSign}
          trend={{ value: -1.2, isPositive: false }}
        />
        <StatCard
          title="Avg Test Score"
          value={`${stats.avgTestScore}%`}
          icon={GraduationCap}
          trend={{ value: 0.8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Heatmap */}
          <RiskHeatmap />

          {/* Top At-Risk Students */}
          <TopAtRiskList students={topAtRiskStudents} onStudentClick={setSelectedStudent} />
        </div>

        {/* What-If Panel */}
        {showWhatIf && (
          <div className="lg:col-span-1">
            <WhatIfPanel />
          </div>
        )}
      </div>

      {/* Case Drawer */}
      <CaseDrawer student={selectedStudent} open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)} />
    </div>
  )
}
