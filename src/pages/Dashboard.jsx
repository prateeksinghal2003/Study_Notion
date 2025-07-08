import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"



import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      
      {/* h-[calc(100vh-3.5rem)]
Sets height to full viewport minus 3.5rem (usually for excluding a fixed navbar/header).

 flex-1
If used inside a flex container, it lets this div take remaining space.

🔹 overflow-auto
Makes the content scrollable when it overflows vertically. */}

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

{/* Outlet---Renders the nested route component (from React Router). */}