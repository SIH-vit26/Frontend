"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../lib/firebaseClient"
import type { Student } from "@/lib/types"

// Helper to compute risk from Firestore field `debar_risk`
function mapRisk(debarRisk: string | undefined) {
  if (!debarRisk || debarRisk === "None") {
    return { riskLevel: "green" as const, compositeRiskScore: 10 }
  }
  if (debarRisk.includes("Admin Debar") || debarRisk.includes("High Risk")) {
    return { riskLevel: "red" as const, compositeRiskScore: 90 }
  }
  if (
    debarRisk.includes("Fee Default") ||
    debarRisk.includes("Low Attendance") ||
    debarRisk.includes("Multiple Failures")
  ) {
    return { riskLevel: "amber" as const, compositeRiskScore: 60 }
  }
  return { riskLevel: "green" as const, compositeRiskScore: 30 }
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "students"))
        const data = snapshot.docs.map((doc) => {
          const raw = doc.data()
          const { riskLevel, compositeRiskScore } = mapRisk(raw.debar_risk as string)
          return {
            id: doc.id,
            ...raw,
            name: `${raw.first_name ?? ""} ${raw.last_name ?? ""}`.trim() || "Unknown",
            riskLevel,
            compositeRiskScore,
          } as Student
        })
        setStudents(data)
      } catch (err) {
        console.error("❌ Error fetching students:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  return { students, loading }
}
