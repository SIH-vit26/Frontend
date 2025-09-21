import { create } from "zustand"
import type { RiskThresholds } from "@/lib/types"

interface DashboardStats {
  studentsScanned: number
  redCount: number
  amberCount: number
  greenCount: number
  avgAttendance: number
  feeCompliance: number
  avgTestScore: number
}

interface DashboardState {
  stats: DashboardStats
  thresholds: RiskThresholds
  updateThresholds: (newThresholds: Partial<RiskThresholds>) => void
  resetThresholds: () => void
}

const defaultThresholds: RiskThresholds = {
  attendanceMinimum: 75,
  marksDropTolerance: 15,
  feeDelayDays: 30,
  attendanceWeight: 0.35,
  assessmentWeight: 0.35,
  attemptsWeight: 0.15,
  feesWeight: 0.15,
}

const defaultStats: DashboardStats = {
  studentsScanned: 180,
  redCount: 12,
  amberCount: 28,
  greenCount: 140,
  avgAttendance: 82,
  feeCompliance: 94,
  avgTestScore: 76,
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: defaultStats,
  thresholds: defaultThresholds,
  updateThresholds: (newThresholds) =>
    set((state) => ({
      thresholds: { ...state.thresholds, ...newThresholds },
      // Simulate stats update based on threshold changes
      stats: {
        ...state.stats,
        redCount: Math.max(
          0,
          state.stats.redCount +
            (newThresholds.attendanceMinimum ? (newThresholds.attendanceMinimum > 75 ? 2 : -2) : 0),
        ),
        greenCount: Math.min(
          180,
          state.stats.greenCount +
            (newThresholds.attendanceMinimum ? (newThresholds.attendanceMinimum > 75 ? -2 : 2) : 0),
        ),
      },
    })),
  resetThresholds: () =>
    set({
      thresholds: defaultThresholds,
      stats: defaultStats,
    }),
}))
