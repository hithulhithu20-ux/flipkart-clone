import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isSidebarOpen={true}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;