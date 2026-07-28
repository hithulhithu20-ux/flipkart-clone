import api from "../../api/axios";
import { useCategories } from "../../context/CategoryContext";
import { FiEdit3, FiTrash2, FiLayers, FiHash } from "react-icons/fi";

const CategoryTable = ({ setEditingCategory }) => {
  const { categories, fetchCategories } = useCategories();

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete the "${name}" category?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error executing database exclusion tree:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden select-none">
      
      {/* CARD CONTENT HEADER */}
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <FiLayers className="text-gray-400" size={16} />
        <h2 className="text-sm font-extrabold text-gray-700 uppercase tracking-wider">
          Active Categories Inventory ({categories.length})
        </h2>
      </div>

      {/* CONDITIONAL TABLE PRESENTATION CONTAINER */}
      {categories.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3 text-gray-400 border border-gray-100">
            <FiLayers size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-500">No categories recorded</p>
          <p className="text-xs text-gray-400 mt-0.5">Catalog hierarchies will appear here once added.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5 font-bold">Category Name</th>
                <th className="px-6 py-3.5 font-bold">URL Slug Identifier</th>
                <th className="px-6 py-3.5 font-bold text-center w-36">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
              {categories.map((category) => (
                <tr 
                  key={category._id} 
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* CATEGORY NAME COLUMN */}
                  <td className="px-6 py-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </td>

                  {/* SLUG METRIC BADGE COLUMN */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold bg-gray-100 border border-gray-200/60 text-gray-600 px-2.5 py-1 rounded-lg font-mono">
                      <FiHash size={12} className="text-gray-400" />
                      {category.slug || "no-slug"}
                    </span>
                  </td>

                  {/* ACTION TRIGGER INTERFACES */}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* EDIT CALL WINDOW TARGET */}
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="inline-flex items-center justify-center gap-1 bg-gray-50 hover:bg-amber-50 text-gray-500 hover:text-amber-700 border border-gray-200/60 hover:border-amber-200 rounded-xl px-3 py-2 text-xs font-bold transition-all active:scale-[0.96]"
                        title="Edit Row"
                      >
                        <FiEdit3 size={13} />
                        <span>Edit</span>
                      </button>

                      {/* DESTRUCTIVE CORNER REMOVAL ACTION */}
                      <button
                        onClick={() => handleDelete(category._id, category.name)}
                        className="inline-flex items-center justify-center w-9 h-9 bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-600 border border-gray-200/60 hover:border-rose-200 rounded-xl transition-all active:scale-[0.96]"
                        title="Delete Category"
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
      )}

    </div>
  );
};

export default CategoryTable;