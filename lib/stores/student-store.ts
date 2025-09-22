"use client"

import { create } from "zustand"

export interface Student {
  id: string
  first_name: string
  last_name: string
  email: string
  gender: string
  math_score: string
  physics_score: string
  chemistry_score: string
  path_time_job: string
  absence_days: string
  extracurricular_activities: string
  weekly_self_study_hours: string
  career_aspiration: string
  fee_paid: string
  fee_pending: string
  fee_due_date: string
  debar_risk: string
  risk_level: string
  risk_reasons: string[]
}

interface StudentStoreState {
  students: Student[]
  loading: boolean
  setStudents: (students: Student[], loading: boolean) => void
}

export const useStudentStore = create<StudentStoreState>((set) => ({
  students: [],
  loading: true,
  setStudents: (students, loading) => set({ students, loading }),
}))

export const setStudentData = (students: Student[], loading: boolean) => {
  useStudentStore.getState().setStudents(students, loading)
}
