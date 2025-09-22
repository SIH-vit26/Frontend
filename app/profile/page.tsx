"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthStore } from "@/lib/stores/auth-store"
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    bio: "Experienced education administrator focused on student success and data-driven decision making.",
    department: "Academic Affairs",
    joinDate: "January 2022",
  })

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      bio: "Experienced education administrator focused on student success and data-driven decision making.",
      department: "Academic Affairs",
      joinDate: "January 2022",
    })
  }

  const stats = [
    { label: "Students Monitored", value: "1,247", icon: User },
    { label: "Alerts Sent", value: "89", icon: Mail },
    { label: "Cases Resolved", value: "156", icon: Shield },
    { label: "Reports Generated", value: "23", icon: Calendar },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="Manage your account settings and preferences"
        action={
          !isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`/avatars/${user?.role}.png`} alt={user?.name} />
                  <AvatarFallback className="text-2xl">{user?.role === "admin" ? "AD" : "MT"}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{formData.name}</CardTitle>
              <CardDescription>{formData.email}</CardDescription>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="capitalize">
                  {user?.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{formData.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {formData.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and bio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Preference settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Security settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
