import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold">Privacy and DPDP Notice</h1>
          <p className="text-lg text-muted-foreground">How EduEWS protects and processes your data</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Collection and Purpose</CardTitle>
              <CardDescription>What data we collect and why we need it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Student Academic Data</h4>
                <p className="text-sm text-muted-foreground">
                  We collect attendance records, assessment scores, and fee payment information to identify students at
                  risk of dropping out and provide timely interventions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Communication Data</h4>
                <p className="text-sm text-muted-foreground">
                  Contact information for students, parents, and mentors is used to send alerts and notifications about
                  academic risk status.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Usage Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  System usage data helps us improve the effectiveness of our early warning algorithms and user
                  experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights Under DPDP</CardTitle>
              <CardDescription>Rights you have regarding your personal data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Right to Access</h4>
                  <p className="text-sm text-muted-foreground">Request copies of all data we hold about you</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Right to Correction</h4>
                  <p className="text-sm text-muted-foreground">Request correction of inaccurate personal data</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Right to Erasure</h4>
                  <p className="text-sm text-muted-foreground">Request deletion of your personal data</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Right to Portability</h4>
                  <p className="text-sm text-muted-foreground">Receive your data in a portable format</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security and Retention</CardTitle>
              <CardDescription>How we protect your data and how long we keep it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Security Measures</h4>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted in transit and at rest. Access is restricted to authorized personnel only, with
                  comprehensive audit logging.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Retention Periods</h4>
                <p className="text-sm text-muted-foreground">
                  Student records: 7 years after graduation | Risk analytics: 3 years | Notification logs: 1 year |
                  Audit trails: 5 years
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How to reach us regarding your data privacy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Data Protection Officer:</strong> dpo@school.edu
                </p>
                <p className="text-sm">
                  <strong>Privacy Team:</strong> privacy@school.edu
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +91-XXX-XXX-XXXX
                </p>
                <p className="text-sm text-muted-foreground">Last updated: March 15, 2024 | Version 1.2</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
