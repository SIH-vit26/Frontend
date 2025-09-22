import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Nav } from "@/components/layout/nav"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function IngestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="admin">
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Nav />
          <main className="flex-1 overflow-y-auto p-8 bg-muted/30">
            <div className="max-w-7xl mx-auto space-y-8">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
