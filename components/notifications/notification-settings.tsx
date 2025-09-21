"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Phone, Shield, Clock, Settings, Bell, AlertTriangle } from "lucide-react"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    whatsappEnabled: false,
    pushEnabled: true,
    autoRiskAlerts: true,
    weeklyReports: true,
    feeReminders: true,
    attendanceAlerts: true,
    privacyMode: true,
    dataRetention: "90",
    rateLimit: "100",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Channel Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Notification Channels</span>
          </CardTitle>
          <CardDescription>Configure which notification channels are available</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="email-enabled">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
              </div>
              <Switch
                id="email-enabled"
                checked={settings.emailEnabled}
                onCheckedChange={(checked) => handleSettingChange("emailEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="sms-enabled">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                </div>
              </div>
              <Switch
                id="sms-enabled"
                checked={settings.smsEnabled}
                onCheckedChange={(checked) => handleSettingChange("smsEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="whatsapp-enabled">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via WhatsApp</p>
                </div>
              </div>
              <Switch
                id="whatsapp-enabled"
                checked={settings.whatsappEnabled}
                onCheckedChange={(checked) => handleSettingChange("whatsappEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="push-enabled">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                </div>
              </div>
              <Switch
                id="push-enabled"
                checked={settings.pushEnabled}
                onCheckedChange={(checked) => handleSettingChange("pushEnabled", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Automated Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Automated Notifications</span>
          </CardTitle>
          <CardDescription>Configure automatic notification triggers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-risk-alerts">High Risk Alerts</Label>
                <p className="text-sm text-muted-foreground">Automatically send alerts for high-risk students</p>
              </div>
              <Switch
                id="auto-risk-alerts"
                checked={settings.autoRiskAlerts}
                onCheckedChange={(checked) => handleSettingChange("autoRiskAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Send weekly progress reports</p>
              </div>
              <Switch
                id="weekly-reports"
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="fee-reminders">Fee Reminders</Label>
                <p className="text-sm text-muted-foreground">Send automatic fee payment reminders</p>
              </div>
              <Switch
                id="fee-reminders"
                checked={settings.feeReminders}
                onCheckedChange={(checked) => handleSettingChange("feeReminders", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
                <p className="text-sm text-muted-foreground">Send alerts for low attendance</p>
              </div>
              <Switch
                id="attendance-alerts"
                checked={settings.attendanceAlerts}
                onCheckedChange={(checked) => handleSettingChange("attendanceAlerts", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacy & Compliance</span>
          </CardTitle>
          <CardDescription>Configure privacy settings and data protection compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="privacy-mode">Privacy Mode</Label>
              <p className="text-sm text-muted-foreground">Enable enhanced privacy protection for notifications</p>
            </div>
            <Switch
              id="privacy-mode"
              checked={settings.privacyMode}
              onCheckedChange={(checked) => handleSettingChange("privacyMode", checked)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention (days)</Label>
              <Input
                id="data-retention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                placeholder="90"
              />
              <p className="text-sm text-muted-foreground">How long to retain notification data</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rate-limit">Rate Limit (per hour)</Label>
              <Input
                id="rate-limit"
                type="number"
                value={settings.rateLimit}
                onChange={(e) => handleSettingChange("rateLimit", e.target.value)}
                placeholder="100"
              />
              <p className="text-sm text-muted-foreground">Maximum notifications per hour</p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">DPDP Compliance</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  All notifications comply with Digital Personal Data Protection Act requirements. Student consent is
                  required for all communications.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Quiet Hours</span>
          </CardTitle>
          <CardDescription>Configure when notifications should not be sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">Prevent notifications during specified hours</p>
            </div>
            <Switch
              id="quiet-hours"
              checked={settings.quietHours}
              onCheckedChange={(checked) => handleSettingChange("quietHours", checked)}
            />
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quiet-start">Start Time</Label>
                <Input
                  id="quiet-start"
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => handleSettingChange("quietStart", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quiet-end">End Time</Label>
                <Input
                  id="quiet-end"
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => handleSettingChange("quietEnd", e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Settings</Button>
      </div>
    </div>
  )
}
