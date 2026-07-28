import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useCategories } from "../../context/CategoryContext";
import { FiTag, FiLink, FiCheckCircle, FiXCircle, FiLoader } from "react-icons/fi";

const CategoryForm = ({ editingCategory, setEditingCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const { fetchCategories } = useCategories();

  // Side-effect hook mapping data values when editing targets change
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        slug: editingCategory.slug,
      });
    } else {
      setFormData({ name: "", slug: "" });
    }
    setStatus({ type: "", message: "" });
  }, [editingCategory]);

  // Cleanly auto-generates web-safe URL slugs while the admin types the category name
  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    setFormData({
      ...formData,
      name: nameVal,
      slug: editingCategory 
        ? formData.slug // Maintain structural slug during editing phases unless manually touched
        : nameVal.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    });
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "" });
    setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, formData);
        setStatus({ type: "success", message: "Category updated successfully!" });
      } else {
        await api.post("/categories", formData);
        setStatus({ type: "success", message: "New category created successfully!" });
      }

      await fetchCategories();
      
      // Auto-clear states on a brief timeout window
      setTimeout(() => {
        handleCancel();
      }, 1500);

    } catch (error) {
      console.error("Form execution operational fault:", error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to process category request.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white select-none">
      
      {/* CARD RUNTIME FEEDBACK BANNERS */}
      {status.message && (
        <div className={`mb-4 p-3.5 border rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200 ${
          status.type === "success" 
            ? "bg-green-50 border-green-100 text-green-700" 
            : "bg-rose-50 border-rose-100 text-rose-700"
        }`}>
          {status.type === "success" ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
          <span>{status.message}</span>
        </div>
      )}

      {/* OPERATIONAL DATA ENTRY FORM CONTAINER */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* CATEGORY TITLE ENTRY INPUT */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            Category Name
          </label>
          <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiTag size={16} />
            </div>
            <input
              type="text"
              required
              placeholder="e.g., Electronics"
              value={formData.name}
              onChange={handleNameChange}
              disabled={loading}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-700 font-semibold disabled:opacity-60"
            />
          </div>
        </div>

        {/* RE-ROUTING SYSTEM URL SLUG INPUT */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
            URL Slug Identifier
          </label>
          <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
            <div className="pl-4 text-gray-400 pointer-events-none">
              <FiLink size={16} />
            </div>
            <input
              type="text"
              required
              placeholder="e.g., smart-electronics"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
              disabled={loading}
              className="w-full pl-3 pr-4 py-3 text-sm bg-transparent outline-none placeholder-gray-400 text-gray-600 font-mono font-medium disabled:opacity-60"
            />
          </div>
        </div>

        {/* SYSTEM ACTION SUBMIT BUTTON CONTAINER */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 inline-flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
              editingCategory 
                ? "bg-amber-500 hover:bg-amber-600 shadow-xs shadow-amber-100" 
                : "bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-100"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" size={14} />
                <span>Processing Index...</span>
              </>
            ) : (
              <span>{editingCategory ? "Save Changes" : "Create Category"}</span>
            )}
          </button>

          {editingCategory && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
            >
              Cancel
            </button>
          )}

        </div>
      </form>
    </div>
  );
};

export default CategoryForm;