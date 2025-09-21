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
  stats: DashboardStats | null
  thresholds: RiskThresholds | null
  updateThresholds: (newThresholds: Partial<RiskThresholds>) => void
  resetThresholds: () => void
  fetchDashboardData: () => Promise<void>
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
  stats: null,
  thresholds: null,

  updateThresholds: (newThresholds) =>
    set((state) => ({
      thresholds: state.thresholds
        ? { ...state.thresholds, ...newThresholds }
        : newThresholds as RiskThresholds,
      stats: state.stats
        ? {
            ...state.stats,
            redCount: Math.max(
              0,
              state.stats.redCount +
                (newThresholds.attendanceMinimum
                  ? newThresholds.attendanceMinimum > 75
                    ? 2
                    : -2
                  : 0),
            ),
            greenCount: Math.min(
              180,
              state.stats.greenCount +
                (newThresholds.attendanceMinimum
                  ? newThresholds.attendanceMinimum > 75
                    ? -2
                    : 2
                  : 0),
            ),
          }
        : null,
    })),

  resetThresholds: () =>
    set({
      thresholds: defaultThresholds,
      stats: defaultStats,
    }),

  fetchDashboardData: async () => {
    try {
      const res = await fetch("/api/dashboard-data") 
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }
      const data = await res.json()
      set({
        stats: data.stats,
        thresholds: data.thresholds,
        
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data", error)
      set({
        stats: defaultStats,
        thresholds: defaultThresholds,
      })
    }
  },
}))
