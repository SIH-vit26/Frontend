import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { MobileNav } from "@/components/layout/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
        <MobileNav />
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}
