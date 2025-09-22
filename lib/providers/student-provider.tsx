"use client"

import { ReactNode, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/Firebase" // adjust path if needed
import { setStudentData, Student } from "@/lib/stores/student-store"

export function StudentStoreProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "students"))
        const students: Student[] = snapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            first_name: data.first_name ?? "",
            last_name: data.last_name ?? "",
            email: data.email ?? "",
            gender: data.gender ?? "",
            math_score: data.math_score ?? "",
            physics_score: data.physics_score ?? "",
            chemistry_score: data.chemistry_score ?? "",
            path_time_job: data.path_time_job ?? "",
            absence_days: data.absence_days ?? "",
            extracurricular_activities: data.extracurricular_activities ?? "",
            weekly_self_study_hours: data.weekly_self_study_hours ?? "",
            career_aspiration: data.career_aspiration ?? "",
            fee_paid: data.fee_paid ?? "",
            fee_pending: data.fee_pending ?? "",
            fee_due_date: data.fee_due_date ?? "",
            debar_risk: data.debar_risk ?? "",
            risk_level: data.risk_level ?? "",
            risk_reasons: data.risk_reasons ?? [],
          }
        })
        setStudentData(students, false)
      } catch (err) {
        console.error("Error fetching students:", err)
        setStudentData([], false)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  return <>{children}</>
}
