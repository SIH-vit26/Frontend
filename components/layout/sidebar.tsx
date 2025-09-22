"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Upload,
  Bell,
  FileText,
  Settings,
  Shield,
  HelpCircle,
  GraduationCap,
  BookOpen,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Study Planner", href: "/study-planner", icon: BookOpen },
  { name: "Data Ingestion", href: "/ingest", icon: Upload },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Audit & DPDP", href: "/audit", icon: Shield },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">EduEWS</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn("w-full justify-start h-10 px-3", isActive && "bg-secondary text-secondary-foreground")}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
