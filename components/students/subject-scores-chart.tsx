"use client"

import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/Firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ScoreEntry {
  math: number
  physics: number
  chemistry: number
  createdAt: Date
}

export function SubjectScoresChart({ studentId }: { studentId: string }) {
  const [scores, setScores] = useState<ScoreEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // First: try to load subcollection "marks" (trend data)
        const marksRef = collection(db, "students", studentId, "marks")
        const qMarks = query(marksRef, orderBy("created_at", "asc"))
        const marksSnap = await getDocs(qMarks)

        if (!marksSnap.empty) {
          const scoreEntries: ScoreEntry[] = marksSnap.docs.map((doc) => {
            const d = doc.data()
            return {
              math: Number(d.math_score) || 0,
              physics: Number(d.physics_score) || 0,
              chemistry: Number(d.chemistry_score) || 0,
              createdAt: d.created_at?.toDate?.() || new Date(),
            }
          })
          setScores(scoreEntries)
        } else {
          // Fallback: just fetch current student document
          const studentRef = doc(db, "students", studentId)
          const studentSnap = await getDoc(studentRef)
          if (studentSnap.exists()) {
            const d = studentSnap.data()
            setScores([
              {
                math: Number(d.math_score) || 0,
                physics: Number(d.physics_score) || 0,
                chemistry: Number(d.chemistry_score) || 0,
                createdAt: d.updated_at?.toDate?.() || new Date(),
              },
            ])
          }
        }
      } catch (err) {
        console.error("Error fetching subject scores:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchScores()
  }, [studentId])

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading subject scores...</p>
  }

  if (scores.length === 0) {
    return <p className="text-sm text-muted-foreground">No subject scores available.</p>
  }

  // Prepare chart data
  const labels = scores.map((s) => s.createdAt.toLocaleDateString())
  const data = {
    labels,
    datasets: [
      {
        label: "Math",
        data: scores.map((s) => s.math),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Physics",
        data: scores.map((s) => s.physics),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Chemistry",
        data: scores.map((s) => s.chemistry),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} />
      </CardContent>
    </Card>
  )
}
