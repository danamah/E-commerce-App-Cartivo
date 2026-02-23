"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import AddressesSection from "../../../../components/profile/AddressesSection"
import ProfileSidebar from "../../../../components/profile/profileSidebar"
import SettingsSection from "../../../../components/profile/settingsSection"
import Header from "@/components/profile/header"

export default function ProfilePage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-4 py-10">
      <Tabs defaultValue="addresses" className="w-full">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <ProfileSidebar />
          <div>
            <TabsContent value="addresses">
              <AddressesSection />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsSection />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
    </>
  )
}
