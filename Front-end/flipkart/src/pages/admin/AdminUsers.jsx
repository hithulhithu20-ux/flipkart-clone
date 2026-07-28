import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { 
  FiUsers, FiUserCheck, FiUserMinus, FiTrash2, 
  FiChevronLeft, FiChevronRight, FiShield, FiLoader 
} from "react-icons/fi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/admin/users?page=${pageNumber}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users || []);
      setPages(res.data.pages || 1);
      setPage(res.data.page || 1);
    } catch (err) {
      console.error("Failed to fetch administrative user records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const toggleBlock = async (id) => {
    try {
      await api.put(
        `/admin/users/${id}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers(page);
    } catch (err) {
      console.error("Failed to alter user lifecycle authorization state:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this user account?")) return;
    try {
      await api.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Fallback page recalculation if the last remaining card item on a high index is expunged
      const targetPage = users.length === 1 && page > 1 ? page - 1 : page;
      fetchUsers(targetPage);
    } catch (err) {
      console.error("Failed to drop user account baseline record:", err);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto select-none animate-in fade-in duration-200">
        
        {/* HEADER BRANDING BANNER BLOCK */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FiUsers size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">User Directories</h1>
            <p className="text-xs text-gray-400 mt-0.5">Audit user authorization scopes, manage blocks, or drop active registrations.</p>
          </div>
        </div>

        {/* CORE DATA VIEWER CONTAINER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-xs">
            <FiLoader className="animate-spin text-blue-500 mb-2" size={24} />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Loading Accounts...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-xs">
            <p className="text-sm font-bold text-gray-400">No user records cataloged in current registry view.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100">
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Profile Credentials</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Database Token Key</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Clearance Status</th>
                    <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50/40 transition-colors group">
                      
                      {/* ACCESSIBLE IDENTITY DATA */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 font-bold flex items-center justify-center uppercase shrink-0 border border-gray-200/50">
                            {user.name ? user.name.charAt(0) : "U"}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-sm">{user.name || "Unnamed Profile"}</div>
                            <div className="text-gray-400 font-medium mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* STRUCTURAL SERIAL IDENTITY HASH */}
                      <td className="p-4 font-mono text-[11px] text-gray-400 select-all">
                        {user._id}
                      </td>

                      {/* COLOR CODED PERMISSION LIFECYCLE LABELS */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          user.isBlocked 
                            ? "bg-red-50 text-red-700 ring-1 ring-red-600/10" 
                            : "bg-green-50 text-green-700 ring-1 ring-green-600/10"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.isBlocked ? "bg-red-500" : "bg-green-500"}`} />
                          <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                        </span>
                      </td>

                      {/* SYSTEM ROW RE-ACTION HANDLERS */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          
                          {/* SECURE BLOCK MUTATION BUTTON */}
                          <button
                            onClick={() => toggleBlock(user._id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all active:scale-[0.97] ${
                              user.isBlocked
                                ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                : "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100"
                            }`}
                            title={user.isBlocked ? "Unblock Account access structures" : "Restrict Account activity parameters"}
                          >
                            {user.isBlocked ? <FiUserCheck size={13} /> : <FiUserMinus size={13} />}
                            <span>{user.isBlocked ? "Unblock" : "Block"}</span>
                          </button>

                          {/* HARD ABSOLUTE ERASURE TERMINATION CONTROL */}
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="inline-flex items-center justify-center p-1.5 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all active:scale-[0.95]"
                            title="Purge user profile natively"
                          >
                            <FiTrash2 size={14} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAGINATION CONTROL WRAPPER LAYOUT */}
        {pages > 1 && (
          <div className="flex items-center justify-between mt-6 bg-white border border-gray-100 rounded-xl p-4 shadow-xs">
            <span className="text-xs font-semibold text-gray-400">
              Showing segment <b className="text-gray-700">{page}</b> of <b className="text-gray-700">{pages}</b> pages
            </span>
            
            <div className="flex gap-1.5">
              
              {/* BACKWARD DECREMENT BUTTON */}
              <button
                disabled={page === 1}
                onClick={() => fetchUsers(page - 1)}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>

              {/* INDIVIDUAL DYNAMIC CAPSULE DIGITS */}
              {Array.from({ length: pages }, (_, i) => {
                const pageIndex = i + 1;
                return (
                  <button
                    key={i}
                    onClick={() => fetchUsers(pageIndex)}
                    className={`min-w-[36px] h-9 text-xs font-bold rounded-lg border transition-all ${
                      page === pageIndex
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageIndex}
                  </button>
                );
              })}

              {/* FORWARD INCREMENT BUTTON */}
              <button
                disabled={page === pages}
                onClick={() => fetchUsers(page + 1)}
                className="p-2 border border-gray-200 rounded-lg text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
              >
                <FiChevronRight size={16} />
              </button>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminUsers;