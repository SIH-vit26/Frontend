"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/auth-store"
import {
  Menu,
  X,
  GraduationCap,
  BarChart3,
  Users,
  TrendingUp,
  Bell,
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { label: "Students", href: "/students", icon: Users },
  { label: "Data Ingestion", href: "/ingest", icon: TrendingUp },
  { label: "Study Planner", href: "/study-planner", icon: GraduationCap },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
]

export function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
    setIsMenuOpen(false)
  }

  const handleHome = () => {
    router.push("/")
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* EduEWS Logo - Clickable */}
            <Button
              variant="ghost"
              onClick={handleHome}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 p-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                EduEWS
              </span>
            </Button>

            {/* User Info and Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
                <span className="text-indigo-600">({user?.role})</span>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleNavigation("/profile")} 
                className="text-indigo-600 hover:text-indigo-700"
                title="Profile"
              >
                <User className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative z-50">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 border-l border-indigo-100"
            >
              <div className="p-6 pt-20">
                {/* User Profile Section */}
                <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{user?.name}</div>
                      <div className="text-sm text-indigo-600">{user?.role}</div>
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2 mb-6">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(item.href)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group text-left"
                    >
                      <item.icon className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-700 group-hover:text-indigo-600 flex-1">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                    </motion.button>
                  ))}
                </nav>

                {/* Profile and Logout */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => handleNavigation("/profile")}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-50 transition-colors group text-left"
                  >
                    <User className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700 group-hover:text-indigo-600 flex-1">Profile</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group text-left"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700 group-hover:text-red-600 flex-1">Logout</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
