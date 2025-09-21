"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  TrendingUp,
  Users,
  Bell,
  Shield,
  BarChart3,
  Brain,
  Heart,
  Menu,
  X,
  ChevronRight,
  Star,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatBot } from "@/components/chat/chat-bot"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Risk Detection",
    description:
      "Advanced algorithms analyze attendance, assessments, and fee patterns to identify at-risk students early.",
    color: "bg-blue-500",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Forecast student outcomes with 95% accuracy using machine learning models.",
    color: "bg-green-500",
  },
  {
    icon: Users,
    title: "Cohort Management",
    description: "Visualize risk patterns across different student cohorts with interactive heatmaps.",
    color: "bg-purple-500",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated alerts to parents, mentors, and administrators when intervention is needed.",
    color: "bg-orange-500",
  },
  {
    icon: Shield,
    title: "Privacy Compliant",
    description: "Full DPDP Act compliance with comprehensive audit trails and data governance.",
    color: "bg-red-500",
  },
  {
    icon: BarChart3,
    title: "Comprehensive Reports",
    description: "Detailed analytics and insights to drive data-informed educational decisions.",
    color: "bg-indigo-500",
  },
]

const impacts = [
  { number: "85%", label: "Reduction in Dropouts", icon: Target },
  { number: "95%", label: "Prediction Accuracy", icon: Zap },
  { number: "50K+", label: "Students Helped", icon: Users },
  { number: "4.9/5", label: "User Satisfaction", icon: Star },
]

export default function HomePage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Students", href: "/students", icon: Users },
    { label: "Data Ingestion", href: "/ingest", icon: TrendingUp },
    { label: "Study Planner", href: "/study-planner", icon: GraduationCap },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Shield },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-indigo-600">Loading EduEWS...</h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                EduEWS
              </span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative z-50">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 border-l border-indigo-100"
          >
            <div className="p-6 pt-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Navigation</h3>
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700 group-hover:text-indigo-600">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-indigo-600" />
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-4 bg-gradient-to-r from-indigo-100 to-emerald-100 text-indigo-700 border-indigo-200">
                AI-Powered Education Technology
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Preventing Student{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Dropouts
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                EduEWS uses advanced machine learning to identify at-risk students early, enabling timely interventions
                that save educational futures and transform lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-lg px-8 py-3"
                >
                  Start Saving Futures
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <impact.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{impact.number}</div>
                <div className="text-gray-600">{impact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Powerful Features for{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Educational Success
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform combines cutting-edge AI with intuitive design to deliver actionable insights
                that make a real difference.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-emerald-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Heart className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">Transforming Lives Through Education</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every student saved from dropping out represents a life transformed, a family uplifted, and a community
              strengthened. EduEWS is more than technology—it's hope in action.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Award className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Educational Excellence</h3>
                <p className="text-indigo-100">Empowering educators with data-driven insights</p>
              </div>
              <div>
                <Users className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Community Impact</h3>
                <p className="text-indigo-100">Building stronger, more educated communities</p>
              </div>
              <div>
                <Target className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Future Ready</h3>
                <p className="text-indigo-100">Preparing students for tomorrow's challenges</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of educators who are already using EduEWS to save student futures.
            </p>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-lg px-12 py-4"
            >
              Get Started Today
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">EduEWS</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering education through AI-driven early warning systems</p>
          <p className="text-sm text-gray-500">© 2024 EduEWS. All rights reserved. Built with ❤️ for education.</p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  )
}
