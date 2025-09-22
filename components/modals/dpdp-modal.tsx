"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Clock, Download } from "lucide-react"

interface DPDPModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DPDPModal({ open, onOpenChange }: DPDPModalProps) {
  const [consentGiven, setConsentGiven] = useState(true)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Protection & Privacy (DPDP) Center
          </DialogTitle>
          <DialogDescription>
            Manage your data privacy settings and understand how we protect your information
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="consent" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="consent">Consent</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="consent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Processing Consent</CardTitle>
                <CardDescription>
                  Your consent status for processing student data for early warning analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Academic Risk Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Process attendance, assessment, and fee data to identify at-risk students
                    </p>
                  </div>
                  <Badge variant={consentGiven ? "default" : "secondary"}>
                    {consentGiven ? "Consented" : "Not Consented"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Automated Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Send alerts to mentors and parents about student risk status
                    </p>
                  </div>
                  <Badge variant="default">Consented</Badge>
                </div>
                <div className="text-xs text-muted-foreground">Last updated: March 15, 2024 | Version 1.2</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Data Retention Policy
                </CardTitle>
                <CardDescription>How long we keep your data and automatic purge schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Student Records</h4>
                    <p className="text-sm text-muted-foreground">Retained for 7 years after graduation</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Risk Analytics</h4>
                    <p className="text-sm text-muted-foreground">Retained for 3 years after generation</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Notification Logs</h4>
                    <p className="text-sm text-muted-foreground">Retained for 1 year after sending</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Audit Trails</h4>
                    <p className="text-sm text-muted-foreground">Retained for 5 years for compliance</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Next Auto-Purge Schedule</h4>
                  <p className="text-sm text-muted-foreground">
                    Records older than retention period will be automatically purged on: <strong>April 1, 2024</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Your Data
                </CardTitle>
                <CardDescription>Download all data we have about you in a portable format</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Student Profile Data</h4>
                      <p className="text-sm text-muted-foreground">Personal info, enrollment details</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Risk Analysis History</h4>
                      <p className="text-sm text-muted-foreground">All risk scores and explanations</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export JSON
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Communication Logs</h4>
                      <p className="text-sm text-muted-foreground">Notifications sent to you</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Data exports are generated within 24 hours and sent to your registered email address.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 10 actions performed on your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      action: "Risk score calculated",
                      entity: "Student ID: 12345",
                      time: "2 hours ago",
                      actor: "System",
                    },
                    {
                      action: "Profile viewed",
                      entity: "Student ID: 12345",
                      time: "1 day ago",
                      actor: "mentor@school.edu",
                    },
                    { action: "Notification sent", entity: "Parent alert", time: "2 days ago", actor: "System" },
                    {
                      action: "Data uploaded",
                      entity: "Attendance CSV",
                      time: "3 days ago",
                      actor: "admin@school.edu",
                    },
                    {
                      action: "Settings updated",
                      entity: "Risk thresholds",
                      time: "1 week ago",
                      actor: "admin@school.edu",
                    },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.entity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                        <p className="text-xs text-muted-foreground">by {log.actor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
