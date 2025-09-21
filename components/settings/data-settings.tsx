"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Database, Download, Upload, Trash2, RefreshCw, Shield, Clock, HardDrive } from "lucide-react"

export function DataSettings() {
  const [settings, setSettings] = useState({
    autoSync: true,
    syncFrequency: "daily",
    dataRetention: "365",
    anonymizeData: true,
    encryptBackups: true,
    compressionLevel: "medium",
    maxStorageSize: "100",
    autoCleanup: true,
    cleanupThreshold: "90",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const storageUsage = {
    total: 100,
    used: 45,
    breakdown: [
      { category: "Student Data", size: 25, color: "bg-blue-500" },
      { category: "Attendance Records", size: 12, color: "bg-green-500" },
      { category: "Assessment Data", size: 5, color: "bg-yellow-500" },
      { category: "System Logs", size: 3, color: "bg-purple-500" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5" />
            <span>Storage Overview</span>
          </CardTitle>
          <CardDescription>Current data storage usage and breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Used</span>
              <span>
                {storageUsage.used} GB of {storageUsage.total} GB
              </span>
            </div>
            <Progress value={(storageUsage.used / storageUsage.total) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageUsage.breakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.size} GB</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Synchronization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Data Synchronization</span>
          </CardTitle>
          <CardDescription>Configure automatic data synchronization and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-sync">Automatic Synchronization</Label>
              <p className="text-sm text-muted-foreground">Enable automatic data sync with external sources</p>
            </div>
            <Switch
              id="auto-sync"
              checked={settings.autoSync}
              onCheckedChange={(checked) => handleSettingChange("autoSync", checked)}
            />
          </div>

          {settings.autoSync && (
            <div className="space-y-2">
              <Label htmlFor="sync-frequency">Sync Frequency</Label>
              <Select
                value={settings.syncFrequency}
                onValueChange={(value) => handleSettingChange("syncFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-800">Last Sync</h4>
                <p className="text-sm text-blue-600">January 15, 2024 at 2:30 PM</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Data Retention</span>
          </CardTitle>
          <CardDescription>Configure how long data is stored in the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="data-retention">Data Retention Period (days)</Label>
            <Input
              id="data-retention"
              type="number"
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Data older than this will be automatically archived</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-cleanup">Automatic Cleanup</Label>
              <p className="text-sm text-muted-foreground">Automatically remove old data based on retention policy</p>
            </div>
            <Switch
              id="auto-cleanup"
              checked={settings.autoCleanup}
              onCheckedChange={(checked) => handleSettingChange("autoCleanup", checked)}
            />
          </div>

          {settings.autoCleanup && (
            <div className="space-y-2">
              <Label htmlFor="cleanup-threshold">Cleanup Threshold (%)</Label>
              <Input
                id="cleanup-threshold"
                type="number"
                value={settings.cleanupThreshold}
                onChange={(e) => handleSettingChange("cleanupThreshold", e.target.value)}
                min="0"
                max="100"
              />
              <p className="text-sm text-muted-foreground">Start cleanup when storage usage exceeds this percentage</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Data Security</span>
          </CardTitle>
          <CardDescription>Configure data encryption and anonymization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="anonymize-data">Data Anonymization</Label>
              <p className="text-sm text-muted-foreground">Anonymize personal data in exports and reports</p>
            </div>
            <Switch
              id="anonymize-data"
              checked={settings.anonymizeData}
              onCheckedChange={(checked) => handleSettingChange("anonymizeData", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="encrypt-backups">Encrypt Backups</Label>
              <p className="text-sm text-muted-foreground">Enable encryption for all backup files</p>
            </div>
            <Switch
              id="encrypt-backups"
              checked={settings.encryptBackups}
              onCheckedChange={(checked) => handleSettingChange("encryptBackups", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="compression-level">Backup Compression</Label>
            <Select
              value={settings.compressionLevel}
              onValueChange={(value) => handleSettingChange("compressionLevel", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Compression</SelectItem>
                <SelectItem value="low">Low Compression</SelectItem>
                <SelectItem value="medium">Medium Compression</SelectItem>
                <SelectItem value="high">High Compression</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Operations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Data Operations</span>
          </CardTitle>
          <CardDescription>Perform data backup, export, and maintenance operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Download className="h-6 w-6 mb-2" />
              <span>Export All Data</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Upload className="h-6 w-6 mb-2" />
              <span>Import Data</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <RefreshCw className="h-6 w-6 mb-2" />
              <span>Sync Now</span>
            </Button>

            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Trash2 className="h-6 w-6 mb-2" />
              <span>Cleanup Old Data</span>
            </Button>
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
