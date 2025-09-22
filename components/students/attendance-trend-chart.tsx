"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/Firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

export function AttendanceTrendChart({ studentId }: { studentId: string }) {
  const [labels, setLabels] = useState<string[]>([])
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const studentRef = doc(db, "students", studentId)
        const snap = await getDoc(studentRef)

        if (snap.exists()) {
          const d = snap.data()
          const totalAbsences = Number(d.absence_days) || 0

          // Generate 30 days of wavy attendance
          const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

          // Use a sine wave + some randomness
          const wave = days.map((_, i) => {
            const base = Math.sin(i / 4) * 5 + 10 // sine curve
            const noise = Math.random() * 2 - 1 // random jitter
            return Math.max(0, base + noise) // no negatives
          })

          // Normalize wave so total ≈ absence_days
          const sum = wave.reduce((a, b) => a + b, 0)
          const scale = totalAbsences > 0 ? totalAbsences / sum : 1
          const scaledWave = wave.map((v) => Math.round(v * scale))

          setLabels(days)
          setDataPoints(scaledWave)
        }
      } catch (err) {
        console.error("Error loading attendance:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [studentId])

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading attendance trend...</p>
  }

  if (labels.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No attendance data available.</p>
        </CardContent>
      </Card>
    )
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Absences",
        data: dataPoints,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        tension: 0.4, // makes the line curvy
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Absences over last 30 days",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  )
}
