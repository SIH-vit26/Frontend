"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, FileText, AlertTriangle, CheckCircle, Users } from "lucide-react"

export function PrivacySettings() {
  const [settings, setSettings] = useState({
    dpdpCompliance: true,
    dataMinimization: true,
    consentRequired: true,
    rightToErasure: true,
    dataPortability: true,
    privacyByDesign: true,
    anonymizeReports: true,
    logDataAccess: true,
    encryptSensitiveData: true,
    accessControlEnabled: true,
    dataRetentionPeriod: "365",
    consentValidityPeriod: "730",
    privacyOfficer: "privacy@school.edu",
    dataProcessingPurpose: "Educational analytics and early warning system for student success",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const complianceChecks = [
    {
      name: "DPDP Act 2023 Compliance",
      status: "compliant",
      description: "Adheres to Digital Personal Data Protection Act requirements",
    },
    { name: "Consent Management", status: "compliant", description: "Proper consent collection and management system" },
    {
      name: "Data Minimization",
      status: "compliant",
      description: "Only collects necessary data for specified purposes",
    },
    { name: "Right to Erasure", status: "compliant", description: "Provides mechanism for data deletion requests" },
    { name: "Data Portability", status: "compliant", description: "Allows users to export their personal data" },
    {
      name: "Breach Notification",
      status: "warning",
      description: "Automated breach detection and notification system",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "non-compliant":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "non-compliant":
        return AlertTriangle
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="space-y-6">
      {/* DPDP Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>DPDP Act 2023 Compliance</span>
          </CardTitle>
          <CardDescription>Digital Personal Data Protection Act compliance status and controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceChecks.map((check, index) => {
            const StatusIcon = getStatusIcon(check.status)
            return (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <StatusIcon
                  className={`h-5 w-5 mt-0.5 ${
                    check.status === "compliant"
                      ? "text-green-500"
                      : check.status === "warning"
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{check.name}</h4>
                    <Badge className={getStatusColor(check.status)}>{check.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{check.description}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Privacy Controls</span>
          </CardTitle>
          <CardDescription>Configure privacy protection mechanisms and data handling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-minimization">Data Minimization</Label>
                <p className="text-sm text-muted-foreground">Collect only necessary data</p>
              </div>
              <Switch
                id="data-minimization"
                checked={settings.dataMinimization}
                onCheckedChange={(checked) => handleSettingChange("dataMinimization", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="consent-required">Consent Required</Label>
                <p className="text-sm text-muted-foreground">Require explicit consent for data processing</p>
              </div>
              <Switch
                id="consent-required"
                checked={settings.consentRequired}
                onCheckedChange={(checked) => handleSettingChange("consentRequired", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="right-to-erasure">Right to Erasure</Label>
                <p className="text-sm text-muted-foreground">Allow users to request data deletion</p>
              </div>
              <Switch
                id="right-to-erasure"
                checked={settings.rightToErasure}
                onCheckedChange={(checked) => handleSettingChange("rightToErasure", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-portability">Data Portability</Label>
                <p className="text-sm text-muted-foreground">Enable data export for users</p>
              </div>
              <Switch
                id="data-portability"
                checked={settings.dataPortability}
                onCheckedChange={(checked) => handleSettingChange("dataPortability", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="anonymize-reports">Anonymize Reports</Label>
                <p className="text-sm text-muted-foreground">Remove personal identifiers from reports</p>
              </div>
              <Switch
                id="anonymize-reports"
                checked={settings.anonymizeReports}
                onCheckedChange={(checked) => handleSettingChange("anonymizeReports", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="log-data-access">Log Data Access</Label>
                <p className="text-sm text-muted-foreground">Maintain audit trail of data access</p>
              </div>
              <Switch
                id="log-data-access"
                checked={settings.logDataAccess}
                onCheckedChange={(checked) => handleSettingChange("logDataAccess", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Data Retention & Consent</span>
          </CardTitle>
          <CardDescription>Configure data retention periods and consent management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="data-retention-period">Data Retention Period (days)</Label>
              <Input
                id="data-retention-period"
                type="number"
                value={settings.dataRetentionPeriod}
                onChange={(e) => handleSettingChange("dataRetentionPeriod", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">How long to retain personal data</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="consent-validity-period">Consent Validity Period (days)</Label>
              <Input
                id="consent-validity-period"
                type="number"
                value={settings.consentValidityPeriod}
                onChange={(e) => handleSettingChange("consentValidityPeriod", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">How long consent remains valid</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="privacy-officer">Data Protection Officer</Label>
            <Input
              id="privacy-officer"
              value={settings.privacyOfficer}
              onChange={(e) => handleSettingChange("privacyOfficer", e.target.value)}
              placeholder="Enter DPO email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data-processing-purpose">Data Processing Purpose</Label>
            <Textarea
              id="data-processing-purpose"
              value={settings.dataProcessingPurpose}
              onChange={(e) => handleSettingChange("dataProcessingPurpose", e.target.value)}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">Clear statement of why data is being processed</p>
          </div>
        </CardContent>
      </Card>

      {/* Access Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Access Controls</span>
          </CardTitle>
          <CardDescription>Configure who can access personal data and under what conditions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="access-control-enabled">Role-Based Access Control</Label>
              <p className="text-sm text-muted-foreground">Restrict data access based on user roles</p>
            </div>
            <Switch
              id="access-control-enabled"
              checked={settings.accessControlEnabled}
              onCheckedChange={(checked) => handleSettingChange("accessControlEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="encrypt-sensitive-data">Encrypt Sensitive Data</Label>
              <p className="text-sm text-muted-foreground">Encrypt personal data at rest and in transit</p>
            </div>
            <Switch
              id="encrypt-sensitive-data"
              checked={settings.encryptSensitiveData}
              onCheckedChange={(checked) => handleSettingChange("encryptSensitiveData", checked)}
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800">Access Permissions</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Only authorized personnel can access student personal data. All access is logged and monitored.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy Notice</CardTitle>
          <CardDescription>Current privacy notice and data processing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 border rounded-lg">
            <h4 className="font-medium mb-2">Data Processing Notice</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This system processes student data for educational analytics and early warning purposes. All processing is
              conducted in accordance with the Digital Personal Data Protection Act 2023.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Full Privacy Policy
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Download Privacy Notice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Privacy Settings</Button>
      </div>
    </div>
  )
}
