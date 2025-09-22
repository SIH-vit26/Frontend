"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, FileText, CheckCircle, AlertTriangle, Download } from "lucide-react"

export function ComplianceReport() {
  const complianceAreas = [
    {
      area: "Data Collection & Consent",
      score: 98,
      status: "compliant",
      requirements: [
        { name: "Explicit consent collection", status: "compliant" },
        { name: "Purpose limitation", status: "compliant" },
        { name: "Data minimization", status: "compliant" },
        { name: "Consent withdrawal mechanism", status: "compliant" },
      ],
    },
    {
      area: "Data Processing & Storage",
      score: 95,
      status: "compliant",
      requirements: [
        { name: "Lawful basis for processing", status: "compliant" },
        { name: "Data encryption at rest", status: "compliant" },
        { name: "Data encryption in transit", status: "compliant" },
        { name: "Access controls", status: "warning" },
      ],
    },
    {
      area: "Individual Rights",
      score: 92,
      status: "compliant",
      requirements: [
        { name: "Right to access", status: "compliant" },
        { name: "Right to rectification", status: "compliant" },
        { name: "Right to erasure", status: "compliant" },
        { name: "Right to data portability", status: "warning" },
      ],
    },
    {
      area: "Security & Breach Management",
      score: 88,
      status: "warning",
      requirements: [
        { name: "Technical safeguards", status: "compliant" },
        { name: "Organizational measures", status: "compliant" },
        { name: "Breach detection", status: "warning" },
        { name: "Breach notification procedures", status: "warning" },
      ],
    },
    {
      area: "Accountability & Governance",
      score: 90,
      status: "compliant",
      requirements: [
        { name: "Privacy policy", status: "compliant" },
        { name: "Data protection officer", status: "compliant" },
        { name: "Privacy impact assessments", status: "compliant" },
        { name: "Staff training", status: "warning" },
      ],
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

  const overallScore = Math.round(complianceAreas.reduce((acc, area) => acc + area.score, 0) / complianceAreas.length)

  return (
    <div className="space-y-6">
      {/* Overall Compliance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>DPDP Act 2023 Compliance Report</span>
              </CardTitle>
              <CardDescription>Comprehensive compliance assessment as of January 15, 2024</CardDescription>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">Overall Compliance Score</span>
            <span className="text-3xl font-bold text-green-600">{overallScore}%</span>
          </div>
          <Progress value={overallScore} className="h-4 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-green-800">Compliant Areas</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-medium text-yellow-800">Areas Needing Attention</p>
              <p className="text-2xl font-bold text-yellow-600">2</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="font-medium text-red-800">Non-Compliant Areas</p>
              <p className="text-2xl font-bold text-red-600">0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Compliance Areas */}
      <div className="space-y-6">
        {complianceAreas.map((area, index) => {
          const StatusIcon = getStatusIcon(area.status)
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIcon
                      className={`h-5 w-5 ${
                        area.status === "compliant"
                          ? "text-green-500"
                          : area.status === "warning"
                            ? "text-yellow-500"
                            : "text-red-500"
                      }`}
                    />
                    <CardTitle className="text-lg">{area.area}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold">{area.score}%</span>
                    <Badge className={getStatusColor(area.status)}>{area.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={area.score} className="h-2 mb-4" />
                <div className="space-y-3">
                  {area.requirements.map((req, reqIndex) => {
                    const ReqStatusIcon = getStatusIcon(req.status)
                    return (
                      <div key={reqIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <ReqStatusIcon
                            className={`h-4 w-4 ${
                              req.status === "compliant"
                                ? "text-green-500"
                                : req.status === "warning"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                            }`}
                          />
                          <span className="text-sm font-medium">{req.name}</span>
                        </div>
                        <Badge className={getStatusColor(req.status)} variant="outline">
                          {req.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recommendations</span>
          </CardTitle>
          <CardDescription>Actions to improve compliance and address identified issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <h4 className="font-medium text-yellow-800">Medium Priority</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Implement automated breach detection system to improve security monitoring and compliance with
                notification requirements.
              </p>
            </div>
            <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
              <h4 className="font-medium text-yellow-800">Medium Priority</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Enhance data portability features to provide users with better control over their personal data export
                options.
              </p>
            </div>
            <div className="p-4 border-l-4 border-blue-400 bg-blue-50">
              <h4 className="font-medium text-blue-800">Low Priority</h4>
              <p className="text-sm text-blue-700 mt-1">
                Conduct regular staff training sessions on data protection principles and DPDP Act requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Report Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Report Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Generated:</span>
                  <span>January 15, 2024 at 2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Report Period:</span>
                  <span>December 1, 2023 - January 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Review:</span>
                  <span>February 15, 2024</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Compliance Framework</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Primary:</span>
                  <span>DPDP Act 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Secondary:</span>
                  <span>ISO 27001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span>1.2</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
