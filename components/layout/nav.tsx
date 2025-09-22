"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, User, LogOut, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DPDPModal } from "@/components/modals/dpdp-modal"
import { useAuthStore } from "@/lib/stores/auth-store"

export function Nav() {
  const { setTheme, theme } = useTheme()
  const [showDPDPModal, setShowDPDPModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleProfileClick = () => {
    setDropdownOpen(false)
    if (user) {
      router.push("/profile")
    } else {
      // If no user, redirect to login
      router.push("/login")
    }
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-card px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Early Warning System</h2>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={() => setShowDPDPModal(true)}>
            <Shield className="h-4 w-4" />
            <span className="sr-only">DPDP Privacy</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={handleProfileClick} title="Profile">
            <User className="h-4 w-4" />
            <span className="sr-only">Profile</span>
          </Button>

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/avatars/${user?.role}.png`} alt={user?.name || "User"} />
                  <AvatarFallback>{user?.role === "admin" ? "AD" : user?.role === "mentor" ? "MT" : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || "Guest User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || "No email"}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">{user?.role || "guest"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <DPDPModal open={showDPDPModal} onOpenChange={setShowDPDPModal} />
    </>
  )
}
