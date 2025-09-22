"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { RiskHeatmap } from "@/components/dashboard/risk-heatmap";
import { TopAtRiskList } from "@/components/dashboard/top-at-risk-list";
import { WhatIfPanel } from "@/components/dashboard/what-if-panel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Loader2,
} from "lucide-react";
import type { Student } from "@/lib/types";
import { useStudents } from "@/hooks/use-students";

export default function DashboardPage() {
  const { students, loading } = useStudents();
  const [stats, setStats] = useState<any>(null);
  const [topAtRisk, setTopAtRisk] = useState<Student[]>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  useEffect(() => {
    if (!loading && students.length > 0) {
      const total = students.length;

      let high = 0,
        medium = 0,
        low = 0;
      let attendanceSum = 0;
      let scoreSum = 0;
      let fullyFeeCompliant = 0;

      const workingDays = 100; // assumption for attendance %

      const processed = students.map((s: any) => {
        // ✅ Fix: Firestore uses `risk_level`, our type might use `riskLevel`
        const level = s.risk_level ?? s.riskLevel;

        if (level === "High Risk") high++;
        else if (level === "Medium Risk") medium++;
        else if (level === "Low Risk") low++;

        const absence = Number(s.absence_days ?? 0);
        const attendance = Math.max(0, 100 - (absence / workingDays) * 100);
        attendanceSum += attendance;

        const math = Number(s.math_score ?? 0);
        const phy = Number(s.physics_score ?? 0);
        const chem = Number(s.chemistry_score ?? 0);
        const avg = (math + phy + chem) / 3;
        scoreSum += avg;

        const pending = Number(s.fee_pending ?? 0);
        if (pending === 0) fullyFeeCompliant++;

        return {
          ...s,
          riskLevel: level,
          compositeRiskScore: Math.round(avg), // proxy if not in DB
        };
      });

      setStats({
        total,
        redCount: high,
        amberCount: medium,
        greenCount: low,
        avgAttendance: Math.round(attendanceSum / total),
        feeCompliance: Math.round((fullyFeeCompliant / total) * 100),
        avgTestScore: Math.round(scoreSum / total),
      });

      const top = processed
        .filter((s) => s.riskLevel === "High Risk")
        .sort((a, b) => a.compositeRiskScore - b.compositeRiskScore)
        .slice(0, 10);

      setTopAtRisk(top as Student[]);
    }
  }, [students, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <div className="text-center">
              <p className="font-medium">Loading Dashboard</p>
              <p className="text-sm text-muted-foreground">
                Fetching student data from Firestore...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-8">
          <CardContent>No student data found.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <PageHeader
        title="Cohort Risk Overview"
        description="Monitor student risk levels and identify intervention opportunities"
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWhatIf(!showWhatIf)}
          >
            What-If Analysis
          </Button>
        </div>
      </PageHeader>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard title="Students Scanned" value={stats.total} icon={Users} />
        <StatCard title="High Risk" value={stats.redCount} icon={AlertTriangle} />
        <StatCard title="Medium Risk" value={stats.amberCount} icon={TrendingUp} />
        <StatCard title="Low Risk" value={stats.greenCount} icon={CheckCircle} />
        <StatCard
          title="Avg Attendance"
          value={`${stats.avgAttendance}%`}
          icon={Users}
        />
        <StatCard
          title="Fee Compliance"
          value={`${stats.feeCompliance}%`}
          icon={DollarSign}
        />
        <StatCard
          title="Avg Test Score"
          value={`${stats.avgTestScore}%`}
          icon={GraduationCap}
        />
      </div>

      {/* Heatmap + Top At-Risk + Optional What-If */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RiskHeatmap />
          <TopAtRiskList students={topAtRisk} onStudentClick={() => {}} />
        </div>
        {showWhatIf && (
          <div className="lg:col-span-1">
            <WhatIfPanel />
          </div>
        )}
      </div>
    </div>
  );
}
