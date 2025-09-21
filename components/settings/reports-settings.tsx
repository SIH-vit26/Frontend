"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calendar, Mail, FileText, Users } from "lucide-react"

export function ReportsSettings() {
  const [settings, setSettings] = useState({
    autoReports: true,
    reportFrequency: "weekly",
    reportFormat: "pdf",
    includeCharts: true,
    includeRawData: false,
    emailReports: true,
    reportRecipients: "admin@school.edu",
    reportTime: "09:00",
    reportTypes: {
      riskSummary: true,
      attendanceReport: true,
      performanceReport: true,
      feeReport: false,
      complianceReport: true,
    },
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleReportTypeChange = (type: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      reportTypes: { ...prev.reportTypes, [type]: checked },
    }))
  }

  const reportTypes = [
    { id: "riskSummary", name: "Risk Summary Report", description: "Overview of student risk levels and trends" },
    { id: "attendanceReport", name: "Attendance Report", description: "Detailed attendance statistics and patterns" },
    { id: "performanceReport", name: "Performance Report", description: "Academic performance analysis and insights" },
    { id: "feeReport", name: "Fee Collection Report", description: "Fee payment status and outstanding amounts" },
    { id: "complianceReport", name: "Compliance Report", description: "DPDP compliance and audit information" },
  ]

  return (
    <div className="space-y-6">
      {/* Automated Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Automated Reports</span>
          </CardTitle>
          <CardDescription>Configure automatic report generation and delivery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-reports">Enable Automated Reports</Label>
              <p className="text-sm text-muted-foreground">Automatically generate and send reports</p>
            </div>
            <Switch
              id="auto-reports"
              checked={settings.autoReports}
              onCheckedChange={(checked) => handleSettingChange("autoReports", checked)}
            />
          </div>

          {settings.autoReports && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="report-frequency">Report Frequency</Label>
                <Select
                  value={settings.reportFrequency}
                  onValueChange={(value) => handleSettingChange("reportFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-time">Report Time</Label>
                <Input
                  id="report-time"
                  type="time"
                  value={settings.reportTime}
                  onChange={(e) => handleSettingChange("reportTime", e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Report Types</span>
          </CardTitle>
          <CardDescription>Select which reports to include in automated generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportTypes.map((reportType) => (
            <div key={reportType.id} className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id={reportType.id}
                checked={settings.reportTypes[reportType.id as keyof typeof settings.reportTypes]}
                onCheckedChange={(checked) => handleReportTypeChange(reportType.id, checked as boolean)}
              />
              <div className="flex-1">
                <Label htmlFor={reportType.id} className="font-medium cursor-pointer">
                  {reportType.name}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{reportType.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Report Format */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Report Format</span>
          </CardTitle>
          <CardDescription>Configure report format and content options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="report-format">Default Format</Label>
            <Select value={settings.reportFormat} onValueChange={(value) => handleSettingChange("reportFormat", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-charts">Include Charts</Label>
                <p className="text-sm text-muted-foreground">Add visual charts and graphs to reports</p>
              </div>
              <Switch
                id="include-charts"
                checked={settings.includeCharts}
                onCheckedChange={(checked) => handleSettingChange("includeCharts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="include-raw-data">Include Raw Data</Label>
                <p className="text-sm text-muted-foreground">Append raw data tables to reports</p>
              </div>
              <Switch
                id="include-raw-data"
                checked={settings.includeRawData}
                onCheckedChange={(checked) => handleSettingChange("includeRawData", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Report Distribution</span>
          </CardTitle>
          <CardDescription>Configure how reports are delivered to recipients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-reports">Email Reports</Label>
              <p className="text-sm text-muted-foreground">Send reports via email automatically</p>
            </div>
            <Switch
              id="email-reports"
              checked={settings.emailReports}
              onCheckedChange={(checked) => handleSettingChange("emailReports", checked)}
            />
          </div>

          {settings.emailReports && (
            <div className="space-y-2">
              <Label htmlFor="report-recipients">Report Recipients</Label>
              <Input
                id="report-recipients"
                value={settings.reportRecipients}
                onChange={(e) => handleSettingChange("reportRecipients", e.target.value)}
                placeholder="Enter email addresses separated by commas"
              />
              <p className="text-sm text-muted-foreground">Comma-separated list of email addresses</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Weekly Risk Summary", date: "2024-01-15", status: "delivered", recipients: 3 },
              { name: "Monthly Attendance Report", date: "2024-01-01", status: "delivered", recipients: 5 },
              { name: "Compliance Report", date: "2024-01-01", status: "delivered", recipients: 2 },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{report.recipients}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{report.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Settings</Button>
      </div>
    </div>
  )
}
