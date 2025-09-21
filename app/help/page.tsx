"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Book,
  Video,
  MessageCircle,
  FileText,
  ExternalLink,
  Lightbulb,
  Shield,
  Users,
  BarChart3,
  Bell,
} from "lucide-react"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("getting-started")

  const quickLinks = [
    { title: "Getting Started Guide", icon: Book, description: "Learn the basics of EduEWS", href: "#getting-started" },
    { title: "Video Tutorials", icon: Video, description: "Watch step-by-step tutorials", href: "#tutorials" },
    { title: "Contact Support", icon: MessageCircle, description: "Get help from our team", href: "#support" },
    { title: "API Documentation", icon: FileText, description: "Technical documentation", href: "#api" },
  ]

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Book,
      faqs: [
        {
          question: "How do I log in to EduEWS?",
          answer:
            "Use your institutional email and password. Select your role (Admin or Mentor) during login. If you don't have credentials, contact your system administrator.",
        },
        {
          question: "What is the risk scoring system?",
          answer:
            "EduEWS uses a transparent, rule-based system that analyzes attendance, academic performance, and fee payment patterns to calculate risk scores from 0-100. Higher scores indicate higher dropout risk.",
        },
        {
          question: "How often is student data updated?",
          answer:
            "Data is synchronized daily by default, but can be configured for hourly updates. Manual sync is also available for immediate updates.",
        },
      ],
    },
    {
      category: "Data Management",
      icon: BarChart3,
      faqs: [
        {
          question: "What file formats are supported for data upload?",
          answer:
            "EduEWS supports CSV and Excel (.xlsx) files. Templates are provided for attendance, assessment, and fee data to ensure proper formatting.",
        },
        {
          question: "How do I connect Google Sheets?",
          answer:
            "Go to Data Ingestion > Connect tab, authenticate with Google, and select your spreadsheet. The system will automatically sync data based on your configured schedule.",
        },
        {
          question: "Can I export student data?",
          answer:
            "Yes, authorized users can export data in various formats. All exports are logged for audit purposes and comply with DPDP Act requirements.",
        },
      ],
    },
    {
      category: "Privacy & Compliance",
      icon: Shield,
      faqs: [
        {
          question: "How does EduEWS comply with DPDP Act 2023?",
          answer:
            "EduEWS implements data minimization, consent management, encryption, audit logging, and provides mechanisms for data portability and erasure as required by the DPDP Act.",
        },
        {
          question: "Who can access student personal data?",
          answer:
            "Access is role-based: Admins have full access, Mentors can view assigned students, and Viewers have read-only access. All access is logged and monitored.",
        },
        {
          question: "How long is student data retained?",
          answer:
            "Data retention periods are configurable (default 365 days). After this period, personal data is automatically anonymized or deleted based on your settings.",
        },
      ],
    },
    {
      category: "Notifications",
      icon: Bell,
      faqs: [
        {
          question: "How do I set up automated risk alerts?",
          answer:
            "Go to Notifications > Settings, enable automated alerts, and configure thresholds. You can customize recipients, channels (email/SMS), and frequency.",
        },
        {
          question: "Can I customize notification templates?",
          answer:
            "Yes, you can create custom templates with dynamic fields like student name, risk score, and specific concerns. Templates support multiple languages.",
        },
        {
          question: "What are quiet hours?",
          answer:
            "Quiet hours prevent notifications from being sent during specified times (e.g., 10 PM - 8 AM) to respect recipient preferences and local regulations.",
        },
      ],
    },
  ]

  const tutorials = [
    {
      title: "Dashboard Overview",
      duration: "5 min",
      description: "Learn to navigate the main dashboard and understand risk heatmaps",
      thumbnail: "/dashboard-tutorial-thumbnail.png",
    },
    {
      title: "Data Upload Process",
      duration: "8 min",
      description: "Step-by-step guide to uploading and validating student data",
      thumbnail: "/data-upload-tutorial-thumbnail.jpg",
    },
    {
      title: "Setting Up Notifications",
      duration: "6 min",
      description: "Configure automated alerts and notification templates",
      thumbnail: "/notifications-tutorial-thumbnail.jpg",
    },
    {
      title: "Student Profile Deep Dive",
      duration: "10 min",
      description: "Explore individual student profiles and intervention tools",
      thumbnail: "/student-profile-tutorial-thumbnail.jpg",
    },
  ]

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)

  return (
    <>
      <PageHeader title="Help & Support" description="Find answers, tutorials, and get support for EduEWS" />

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickLinks.map((link, index) => {
          const Icon = link.icon
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8 text-indigo-600" />
                  <div>
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Welcome to EduEWS</span>
              </CardTitle>
              <CardDescription>Your AI-powered Early Warning System for student success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Key Features</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>Real-time risk assessment and alerts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>Cohort-level heatmaps and trends</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>Individual student profiles and timelines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>Automated notifications and interventions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span>DPDP Act 2023 compliance</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Quick Start Steps</h3>
                  <ol className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        1
                      </Badge>
                      <span>Log in with your institutional credentials</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        2
                      </Badge>
                      <span>Upload student data (attendance, assessments, fees)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        3
                      </Badge>
                      <span>Review the dashboard and risk heatmap</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        4
                      </Badge>
                      <span>Set up automated notifications</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        5
                      </Badge>
                      <span>Explore individual student profiles</span>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {filteredFAQs.map((category, categoryIndex) => {
              const Icon = category.icon
              return (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{category.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={tutorial.thumbnail || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <Badge variant="outline">{tutorial.duration}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                    <Button size="sm" className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Watch Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Support</span>
                </CardTitle>
                <CardDescription>Get help from our technical support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Email:</strong> support@eduews.com
                  </p>
                  <p className="text-sm">
                    <strong>Phone:</strong> +91-800-123-4567
                  </p>
                  <p className="text-sm">
                    <strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM IST
                  </p>
                </div>
                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Support Ticket
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </CardTitle>
                <CardDescription>Connect with other EduEWS users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">Join our community forum to:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Share best practices</li>
                    <li>• Get tips from other users</li>
                    <li>• Request new features</li>
                    <li>• Access beta features</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current status of EduEWS services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Services</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Processing</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notification System</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
