"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface HeatmapCell {
  cohort: string
  week: string
  riskLevel: "green" | "amber" | "red"
  count: number
  reasons: string[]
}

const heatmapData: HeatmapCell[] = [
  // Computer Science cohorts
  { cohort: "CS-A", week: "Week-1", riskLevel: "green", count: 28, reasons: [] },
  { cohort: "CS-A", week: "Week-2", riskLevel: "green", count: 26, reasons: [] },
  { cohort: "CS-A", week: "Week-3", riskLevel: "amber", count: 24, reasons: ["Attendance decline in 3 students"] },
  { cohort: "CS-A", week: "Week-4", riskLevel: "red", count: 22, reasons: ["Major assessment failures", "Fee delays"] },

  { cohort: "CS-B", week: "Week-1", riskLevel: "green", count: 30, reasons: [] },
  { cohort: "CS-B", week: "Week-2", riskLevel: "amber", count: 28, reasons: ["2 students with low test scores"] },
  { cohort: "CS-B", week: "Week-3", riskLevel: "amber", count: 27, reasons: ["Continued assessment concerns"] },
  { cohort: "CS-B", week: "Week-4", riskLevel: "amber", count: 26, reasons: ["Attendance patterns concerning"] },

  // Electronics cohorts
  { cohort: "ECE-A", week: "Week-1", riskLevel: "green", count: 25, reasons: [] },
  { cohort: "ECE-A", week: "Week-2", riskLevel: "green", count: 25, reasons: [] },
  { cohort: "ECE-A", week: "Week-3", riskLevel: "green", count: 24, reasons: [] },
  { cohort: "ECE-A", week: "Week-4", riskLevel: "amber", count: 23, reasons: ["Lab attendance dropping"] },

  { cohort: "ECE-B", week: "Week-1", riskLevel: "amber", count: 22, reasons: ["Starting with fee issues"] },
  {
    cohort: "ECE-B",
    week: "Week-2",
    riskLevel: "red",
    count: 20,
    reasons: ["Multiple fee defaults", "Poor attendance"],
  },
  { cohort: "ECE-B", week: "Week-3", riskLevel: "red", count: 19, reasons: ["Situation worsening"] },
  { cohort: "ECE-B", week: "Week-4", riskLevel: "red", count: 18, reasons: ["Critical intervention needed"] },

  // Mechanical cohorts
  { cohort: "MECH-A", week: "Week-1", riskLevel: "green", count: 32, reasons: [] },
  { cohort: "MECH-A", week: "Week-2", riskLevel: "green", count: 31, reasons: [] },
  { cohort: "MECH-A", week: "Week-3", riskLevel: "green", count: 30, reasons: [] },
  { cohort: "MECH-A", week: "Week-4", riskLevel: "green", count: 29, reasons: [] },

  { cohort: "MECH-B", week: "Week-1", riskLevel: "green", count: 28, reasons: [] },
  { cohort: "MECH-B", week: "Week-2", riskLevel: "amber", count: 27, reasons: ["Workshop attendance issues"] },
  { cohort: "MECH-B", week: "Week-3", riskLevel: "amber", count: 26, reasons: ["Practical exam concerns"] },
  { cohort: "MECH-B", week: "Week-4", riskLevel: "red", count: 24, reasons: ["Multiple students failing practicals"] },
]

const weeks = ["Week-1", "Week-2", "Week-3", "Week-4"]
const cohorts = ["CS-A", "CS-B", "ECE-A", "ECE-B", "MECH-A", "MECH-B"]

export function RiskHeatmap() {
  const getCellData = (cohort: string, week: string) => {
    return heatmapData.find((cell) => cell.cohort === cohort && cell.week === week)
  }

  const getCellColor = (riskLevel: "green" | "amber" | "red") => {
    switch (riskLevel) {
      case "green":
        return "bg-green-100 hover:bg-green-200 border-green-200 dark:bg-green-900 dark:hover:bg-green-800 dark:border-green-800"
      case "amber":
        return "bg-amber-100 hover:bg-amber-200 border-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 dark:border-amber-800"
      case "red":
        return "bg-red-100 hover:bg-red-200 border-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:border-red-800"
      default:
        return "bg-gray-100 hover:bg-gray-200 border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort Risk Heatmap</CardTitle>
        <CardDescription>Risk levels across cohorts and time periods</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header */}
              <div className="grid grid-cols-5 gap-2 mb-2">
                <div className="font-medium text-sm text-muted-foreground">Cohort</div>
                {weeks.map((week) => (
                  <div key={week} className="font-medium text-sm text-center text-muted-foreground">
                    {week}
                  </div>
                ))}
              </div>

              {/* Heatmap Grid */}
              <div className="space-y-2">
                {cohorts.map((cohort) => (
                  <div key={cohort} className="grid grid-cols-5 gap-2">
                    <div className="flex items-center font-medium text-sm">{cohort}</div>
                    {weeks.map((week) => {
                      const cellData = getCellData(cohort, week)
                      if (!cellData) return <div key={week} className="h-12 bg-gray-100 rounded border" />

                      return (
                        <Tooltip key={week}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "h-12 rounded border-2 cursor-pointer transition-colors flex items-center justify-center",
                                getCellColor(cellData.riskLevel),
                              )}
                            >
                              <span className="text-sm font-medium">{cellData.count}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              <p className="font-medium">
                                {cohort} - {week}
                              </p>
                              <p className="text-sm">Students: {cellData.count}</p>
                              <p className="text-sm capitalize">Risk: {cellData.riskLevel}</p>
                              {cellData.reasons.length > 0 && (
                                <div className="text-sm">
                                  <p className="font-medium">Reasons:</p>
                                  <ul className="list-disc list-inside">
                                    {cellData.reasons.map((reason, index) => (
                                      <li key={index}>{reason}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-200 border border-green-300 rounded" />
                  <span className="text-sm text-muted-foreground">Low Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-200 border border-amber-300 rounded" />
                  <span className="text-sm text-muted-foreground">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-200 border border-red-300 rounded" />
                  <span className="text-sm text-muted-foreground">High Risk</span>
                </div>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
