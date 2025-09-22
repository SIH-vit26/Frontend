"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings, Database, AlertTriangle, CheckCircle } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    systemName: "EduEWS - Early Warning System",
    timezone: "Asia/Kolkata",
    language: "en",
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    debugMode: false,
    apiRateLimit: "1000",
    sessionTimeout: "30",
    maxFileSize: "10",
    allowedFileTypes: "csv,xlsx,pdf",
    riskThresholds: {
      high: "80",
      medium: "60",
      low: "40",
    },
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleRiskThresholdChange = (level: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      riskThresholds: { ...prev.riskThresholds, [level]: value },
    }))
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>General Settings</span>
          </CardTitle>
          <CardDescription>Configure basic system settings and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="system-name">System Name</Label>
              <Input
                id="system-name"
                value={settings.systemName}
                onChange={(e) => handleSettingChange("systemName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="mr">Marathi</SelectItem>
                  <SelectItem value="gu">Gujarati</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange("sessionTimeout", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Risk Thresholds</span>
          </CardTitle>
          <CardDescription>Configure risk calculation thresholds and scoring parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="high-risk">High Risk Threshold (%)</Label>
              <Input
                id="high-risk"
                type="number"
                value={settings.riskThresholds.high}
                onChange={(e) => handleRiskThresholdChange("high", e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Students above this score are high risk</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medium-risk">Medium Risk Threshold (%)</Label>
              <Input
                id="medium-risk"
                type="number"
                value={settings.riskThresholds.medium}
                onChange={(e) => handleRiskThresholdChange("medium", e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Students above this score are medium risk</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="low-risk">Low Risk Threshold (%)</Label>
              <Input
                id="low-risk"
                type="number"
                value={settings.riskThresholds.low}
                onChange={(e) => handleRiskThresholdChange("low", e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Students above this score are low risk</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>System Maintenance</span>
          </CardTitle>
          <CardDescription>Configure backup, maintenance, and system health settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">Enable automatic system backups</p>
            </div>
            <Switch
              id="auto-backup"
              checked={settings.autoBackup}
              onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
            />
          </div>

          {settings.autoBackup && (
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select
                value={settings.backupFrequency}
                onValueChange={(value) => handleSettingChange("backupFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Enable maintenance mode to restrict access</p>
            </div>
            <Switch
              id="maintenance-mode"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
            </div>
            <Switch
              id="debug-mode"
              checked={settings.debugMode}
              onCheckedChange={(checked) => handleSettingChange("debugMode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Upload Settings */}
      <Card>
        <CardHeader>
          <CardTitle>File Upload Settings</CardTitle>
          <CardDescription>Configure file upload limits and allowed file types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
              <Input
                id="max-file-size"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange("maxFileSize", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-rate-limit">API Rate Limit (requests/hour)</Label>
              <Input
                id="api-rate-limit"
                type="number"
                value={settings.apiRateLimit}
                onChange={(e) => handleSettingChange("apiRateLimit", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="allowed-file-types">Allowed File Types</Label>
            <Input
              id="allowed-file-types"
              value={settings.allowedFileTypes}
              onChange={(e) => handleSettingChange("allowedFileTypes", e.target.value)}
              placeholder="csv,xlsx,pdf"
            />
            <p className="text-sm text-muted-foreground">Comma-separated list of allowed file extensions</p>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system health and status information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">API Services</p>
                <p className="text-sm text-muted-foreground">Operational</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
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
