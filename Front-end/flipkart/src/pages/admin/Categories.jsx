import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import CategoryForm from "../../components/admin/CategoryForm";
import CategoryTable from "../../components/admin/CategoryTable";
import { FiGrid, FiPlusCircle, FiEdit3 } from "react-icons/fi";

const Categories = () => {
  const [editingCategory, setEditingCategory] = useState(null);

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* HEADER AREA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hidden sm:block">
              <FiGrid size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                Product Categories
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Organize your marketplace catalog, create taxonomies, and manage dynamic filters.
              </p>
            </div>
          </div>

          {/* DYNAMIC OPERATION INDICATOR PILL */}
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider self-start sm:self-center border transition-all duration-300 ${
            editingCategory 
              ? "bg-amber-50 border-amber-200 text-amber-700 animate-pulse" 
              : "bg-blue-50 border-blue-100 text-blue-700"
          }`}>
            {editingCategory ? (
              <>
                <FiEdit3 size={13} />
                <span>Editing Mode Active</span>
              </>
            ) : (
              <>
                <FiPlusCircle size={13} />
                <span>Ready to Add</span>
              </>
            )}
          </div>
        </div>

        {/* WORKSPACE GRID OVERVIEW */}
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          
          {/* LEFT COLLATERAL BLOCK: DYNAMIC MANAGEMENT FORM */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6">
            <div className="mb-4 pb-3 border-b border-gray-50">
              <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                {editingCategory ? "Modify Category Target" : "Create New Category"}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {editingCategory 
                  ? "Update configuration details or cancel your selections below." 
                  : "Fill in name, slug descriptors, and meta fields to append database indices."}
              </p>
            </div>
            
            <CategoryForm
              editingCategory={editingCategory}
              setEditingCategory={setEditingCategory}
            />
          </div>

          {/* RIGHT COLLATERAL BLOCK: HIGH DENSITY DATA REGISTRY */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-100 bg-linear-to-r from-white to-gray-50/50">
              <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                Active Inventories Map
              </h2>
            </div>
            
            <div className="p-2 sm:p-4">
              <CategoryTable
                setEditingCategory={setEditingCategory}
              />
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default Categories;