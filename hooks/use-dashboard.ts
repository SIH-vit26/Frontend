"use client"

import { useMemo } from "react"
import { useStudents } from "./use-students"

export function useDashboard() {
  const { students, loading } = useStudents()

  const stats = useMemo(() => {
    if (!students || students.length === 0) {
      return {
        total: 0,
        redCount: 0,
        amberCount: 0,
        greenCount: 0,
        avgAttendance: 0,
        avgTestScore: 0,
        feeCompliance: 0,
      }
    }

    const redCount = students.filter((s) => s.riskLevel === "red").length
    const amberCount = students.filter((s) => s.riskLevel === "amber").length
    const greenCount = students.filter((s) => s.riskLevel === "green").length

    // Average attendance % from field absence_days (assuming 100 total days)
    const avgAttendance =
      students.reduce((sum, s: any) => sum + (100 - (parseInt(s.absence_days || "0") * 100) / 100), 0) /
      students.length

    // Avg test score from math/physics/chemistry
    const avgTestScore =
      students.reduce((sum, s: any) => {
        const scores = [
          parseFloat(s.math_score || "0"),
          parseFloat(s.physics_score || "0"),
          parseFloat(s.chemistry_score || "0"),
        ]
        return sum + scores.reduce((a, b) => a + b, 0) / scores.length
      }, 0) / students.length

    // Fee compliance %
    const feeCompliance =
      (students.filter((s: any) => parseFloat(s.fee_pending || "0") <= 0).length / students.length) *
      100

    return {
      total: students.length,
      redCount,
      amberCount,
      greenCount,
      avgAttendance: Math.round(avgAttendance),
      avgTestScore: Math.round(avgTestScore),
      feeCompliance: Math.round(feeCompliance),
    }
  }, [students])

  return { stats, loading }
}
