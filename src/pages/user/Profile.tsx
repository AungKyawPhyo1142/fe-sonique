import { selectAuth, useAuthStore } from "@/services/zustand/authStore"

const Profile = () => {
   const user = selectAuth(useAuthStore.getState())
  return (
    <div className="text-white">
        <div>
            <img src={user.firstName} alt={user.firstName} />
        </div>

    </div>
  )
}

export default Profile