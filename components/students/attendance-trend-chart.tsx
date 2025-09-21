"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingDown, TrendingUp, Users } from "lucide-react"

interface AttendanceTrendChartProps {
  studentId: string
}

export function AttendanceTrendChart({ studentId }: AttendanceTrendChartProps) {
  // Mock attendance data for the last 12 weeks
  const attendanceData = [
    { week: "W1", attendance: 95, movingAvg: 95 },
    { week: "W2", attendance: 92, movingAvg: 93.5 },
    { week: "W3", attendance: 88, movingAvg: 91.7 },
    { week: "W4", attendance: 85, movingAvg: 90 },
    { week: "W5", attendance: 78, movingAvg: 87.6 },
    { week: "W6", attendance: 72, movingAvg: 85 },
    { week: "W7", attendance: 68, movingAvg: 82.6 },
    { week: "W8", attendance: 65, movingAvg: 80.4 },
    { week: "W9", attendance: 58, movingAvg: 77.9 },
    { week: "W10", attendance: 52, movingAvg: 75.3 },
    { week: "W11", attendance: 48, movingAvg: 72.8 },
    { week: "W12", attendance: 45, movingAvg: 70.5 },
  ]

  const currentAttendance = attendanceData[attendanceData.length - 1].attendance
  const previousAttendance = attendanceData[attendanceData.length - 2].attendance
  const trend = currentAttendance - previousAttendance

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Attendance Trend
        </CardTitle>
        <CardDescription>
          Last 12 weeks with moving average
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm">Current: {currentAttendance}%</span>
            <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
              {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend)}% from last week
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value, name) => [`${value}%`, name === "attendance" ? "Attendance" : "Moving Avg"]}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="movingAvg"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
