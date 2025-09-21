"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, RotateCcw, TrendingUp, TrendingDown } from "lucide-react"
import { useDashboardStore } from "@/lib/stores/dashboard-store"

export function WhatIfPanel() {
  const { stats, updateThresholds, resetThresholds } = useDashboardStore()
  const [attendanceMin, setAttendanceMin] = useState([75])
  const [marksDropTolerance, setMarksDropTolerance] = useState([15])
  const [feeDelayDays, setFeeDelayDays] = useState([30])

  const handleApplyChanges = () => {
    updateThresholds({
      attendanceMinimum: attendanceMin[0],
      marksDropTolerance: marksDropTolerance[0],
      feeDelayDays: feeDelayDays[0],
    })
  }

  const handleReset = () => {
    setAttendanceMin([75])
    setMarksDropTolerance([15])
    setFeeDelayDays([30])
    resetThresholds()
  }

  // Calculate impact preview
  const getImpactPreview = () => {
    const currentRed = stats.redCount
    const currentAmber = stats.amberCount
    const currentGreen = stats.greenCount

    // Simulate impact based on threshold changes
    let redChange = 0
    let amberChange = 0
    let greenChange = 0

    if (attendanceMin[0] < 75) {
      redChange -= 2
      greenChange += 2
    } else if (attendanceMin[0] > 75) {
      redChange += 1
      greenChange -= 1
    }

    if (marksDropTolerance[0] > 15) {
      redChange -= 1
      amberChange += 1
    } else if (marksDropTolerance[0] < 15) {
      redChange += 1
      amberChange -= 1
    }

    return { redChange, amberChange, greenChange }
  }

  const impact = getImpactPreview()

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          What-If Analysis
        </CardTitle>
        <CardDescription>Adjust thresholds to see real-time impact on risk classifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Attendance Threshold */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="attendance">Attendance Minimum</Label>
            <Badge variant="outline">{attendanceMin[0]}%</Badge>
          </div>
          <Slider
            id="attendance"
            min={50}
            max={95}
            step={5}
            value={attendanceMin}
            onValueChange={setAttendanceMin}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Students below this attendance % are flagged</p>
        </div>

        {/* Marks Drop Tolerance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="marks">Marks Drop Tolerance</Label>
            <Badge variant="outline">{marksDropTolerance[0]}%</Badge>
          </div>
          <Slider
            id="marks"
            min={5}
            max={30}
            step={5}
            value={marksDropTolerance}
            onValueChange={setMarksDropTolerance}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Score drops above this % trigger alerts</p>
        </div>

        {/* Fee Delay Days */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="fees">Fee Delay Days</Label>
            <Badge variant="outline">{feeDelayDays[0]} days</Badge>
          </div>
          <Slider
            id="fees"
            min={7}
            max={90}
            step={7}
            value={feeDelayDays}
            onValueChange={setFeeDelayDays}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Days overdue before fee risk is triggered</p>
        </div>

        {/* Impact Preview */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="font-medium text-sm">Projected Impact</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>High Risk</span>
              <div className="flex items-center space-x-1">
                <span>{stats.redCount + impact.redChange}</span>
                {impact.redChange !== 0 && (
                  <Badge variant={impact.redChange > 0 ? "destructive" : "default"} className="text-xs">
                    {impact.redChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(impact.redChange)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Medium Risk</span>
              <div className="flex items-center space-x-1">
                <span>{stats.amberCount + impact.amberChange}</span>
                {impact.amberChange !== 0 && (
                  <Badge variant="outline" className="text-xs">
                    {impact.amberChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(impact.amberChange)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Low Risk</span>
              <div className="flex items-center space-x-1">
                <span>{stats.greenCount + impact.greenChange}</span>
                {impact.greenChange !== 0 && (
                  <Badge variant="outline" className="text-xs">
                    {impact.greenChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(impact.greenChange)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4 border-t">
          <Button onClick={handleApplyChanges} className="flex-1">
            Apply Changes
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
