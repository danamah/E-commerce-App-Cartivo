import UserInfoCard from "./userInfoCard"
import ChangePasswordCard from "./changePasswordCard"

export default function SettingsSection() {
  return (
    <div className="space-y-8">
      <UserInfoCard />
      <ChangePasswordCard />
    </div>
  )
}
