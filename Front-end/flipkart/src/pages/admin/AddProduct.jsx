import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { 
  FiPackage, FiPlus, FiTrash2, FiUploadCloud, 
  FiStar, FiChevronLeft, FiLoader, FiCheckCircle, FiAlertCircle 
} from "react-icons/fi";

const AddProduct = ({ mode = "create", productId, initialData, onSuccess }) => {
  const isEdit = mode === "edit";
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    originalPrice: "",
    stock: "",
    featured: false,
  });

  const [highlights, setHighlights] = useState([""]);
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEdit && initialData) {
      setProduct({
        name: initialData.name || "",
        description: initialData.description || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
        price: initialData.price || "",
        originalPrice: initialData.originalPrice || "",
        stock: initialData.stock || "",
        featured: !!initialData.featured,
      });
      setHighlights(initialData.highlights?.length ? initialData.highlights : [""]);
      setSpecifications(initialData.specifications?.length ? initialData.specifications : [{ key: "", value: "" }]);
      setExistingImages(initialData.images || []);
    }
  }, [initialData, isEdit]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching category trees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ type: "", message: "" });

    const formData = new FormData();
    Object.entries(product).forEach(([key, val]) => formData.append(key, val));
    
    formData.append("highlights", JSON.stringify(highlights.filter((h) => h.trim())));
    formData.append("specifications", JSON.stringify(specifications.filter((s) => s.key.trim() && s.value.trim())));
    formData.append("existingImages", JSON.stringify(existingImages));
    images.forEach((img) => formData.append("images", img));

    try {
      const url = isEdit ? `/products/${productId}` : "/products/create";
      const method = isEdit ? api.put : api.post;
      await method(url, formData, { headers: { "Content-Type": "multipart/form-data" } });

      setToast({ 
        type: "success", 
        message: `Product ${isEdit ? "updated" : "created"} successfully!` 
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1000);
      } else {
        setTimeout(() => navigate("/admin/products"), 1500);
      }
    } catch (error) {
      console.error(error);
      setToast({ 
        type: "error", 
        message: error.response?.data?.message || `Failed to ${mode} product record.` 
      });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic input row array actions
  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const handleSpecificationChange = (index, field, value) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 select-none animate-in fade-in duration-200">
      
      {/* ACTION TOPBAR BUTTONS */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider mb-5 transition-colors"
      >
        <FiChevronLeft size={16} strokeWidth={2.5} />
        <span>Back to Products</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        
        {/* BANNER STATUS NOTIFIERS */}
        {toast.message && (
          <div className={`p-4 border-b text-sm font-semibold flex items-center gap-2 ${
            toast.type === "success" ? "bg-green-50 border-green-100 text-green-700" : "bg-rose-50 border-rose-100 text-rose-700"
          }`}>
            {toast.type === "success" ? <FiCheckCircle size={16} /> : <FiAlertCircle size={16} />}
            <span>{toast.message}</span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-xl ${isEdit ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
              <FiPackage size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {isEdit ? "Modify Stock Record" : "Add New Retail Product"}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Specify baseline listings details and media indices.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* NAME & BRAND FIELD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={product.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all placeholder-gray-400"
                  placeholder="Enter descriptive public title"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Manufacturer / Brand</label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={product.brand}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all placeholder-gray-400"
                  placeholder="e.g., Apple, Nike"
                />
              </div>
            </div>

            {/* DESCRIPTION LONG FIELD AREA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Detailed Pitch Description</label>
              <textarea
                name="description"
                rows={4}
                value={product.description}
                onChange={handleChange}
                className="w-full bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all placeholder-gray-400 resize-none"
                placeholder="Write comprehensive sales breakdowns..."
              />
            </div>

            {/* PRICING & INVENTORY UNIT CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original Price (₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-bold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selling Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={product.price}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-bold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all"
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Available Stock Count</label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-bold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all"
                  placeholder="Units count"
                />
              </div>
            </div>

            {/* ASSIGNED CATEGORY SELECTION TREE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
              <div className="space-y-1.5 flex-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Inventory Category</label>
                <select
                  name="category"
                  required
                  value={product.category}
                  onChange={handleChange}
                  className="w-full bg-gray-50 text-gray-800 text-sm font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none rounded-xl px-4 py-3 transition-all appearance-none"
                >
                  <option value="">Select Category Tree Option</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* TOGGLE BANNER TOGGLE CONTROLS */}
              <label className="relative flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200/60 cursor-pointer hover:bg-slate-50 transition-colors select-none self-stretch md:self-auto">
                <input
                  type="checkbox"
                  checked={product.featured}
                  onChange={(e) => setProduct({ ...product, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                />
                <div className="flex items-center gap-1.5">
                  <FiStar size={14} className={product.featured ? "text-amber-500 fill-amber-400" : "text-gray-400"} />
                  <span className="text-sm font-bold text-gray-700">Feature this product</span>
                </div>
              </label>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* DYNAMIC LIST FIELD: HIGHLIGHT PILLS */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">Product Highlights</h3>
                  <p className="text-[11px] text-gray-400">Bullet points visible near pricing labels.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHighlights([...highlights, ""])}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl px-3 py-2 transition-all"
                >
                  <FiPlus size={14} /> Add Line
                </button>
              </div>

              <div className="space-y-2.5">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 animate-in slide-in-from-top-1 duration-150">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      placeholder="e.g., Ultra-light aerospace titanium body wrapper shell"
                      className="flex-1 bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                    {highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setHighlights(highlights.filter((_, i) => i !== index))}
                        className="inline-flex items-center justify-center w-10 bg-gray-50 hover:bg-rose-50 border border-gray-200/60 hover:border-rose-200 text-gray-400 hover:text-rose-600 rounded-xl transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC DATA GRID ROW: TECHNICAL SPECIFICATIONS */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">Technical Specifications</h3>
                  <p className="text-[11px] text-gray-400">Structured system properties.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSpecifications([...specifications, { key: "", value: "" }])}
                  className="inline-flex items-center gap-1 text-xs font-bold bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl px-3 py-2 transition-all"
                >
                  <FiPlus size={14} /> Add Row
                </button>
              </div>

              <div className="space-y-2.5">
                {specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in slide-in-from-top-1 duration-150">
                    <input
                      type="text"
                      placeholder="Property Key (e.g., Battery Life)"
                      value={spec.key}
                      onChange={(e) => handleSpecificationChange(index, "key", e.target.value)}
                      className="bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Assigned Value (e.g., Up to 18 Hours)"
                        value={spec.value}
                        onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                        className="flex-1 bg-gray-50 text-gray-700 text-xs font-semibold border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl px-4 py-2.5 outline-none transition-all"
                      />
                      {specifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setSpecifications(specifications.filter((_, i) => i !== index))}
                          className="inline-flex items-center justify-center w-10 bg-gray-50 hover:bg-rose-50 border border-gray-200/60 hover:border-rose-200 text-gray-400 hover:text-rose-600 rounded-xl transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 my-4" />

            {/* MEDIA UPLOAD AREA GRID SECTION */}
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">Product Asset Attachments</h3>
                <p className="text-[11px] text-gray-400">Upload clean promotional imagery frames.</p>
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-blue-400 bg-gray-50/50 hover:bg-blue-50/20 rounded-2xl p-6 text-center cursor-pointer transition-all group">
                <FiUploadCloud size={28} className="text-gray-400 group-hover:text-blue-500 transition-colors mb-2" />
                <span className="text-xs font-bold text-gray-700">Click to load local filesystem images</span>
                <span className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPEG, WebP assets</span>
                <input type="file" multiple onChange={handleImageChange} className="hidden" />
              </label>

              {/* MEDIA WORKSPACE GRIDS */}
              {(previewImages.length > 0 || existingImages.length > 0) && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                  {/* PREVIEW NEW FILES */}
                  {previewImages.map((image, idx) => (
                    <div key={idx} className="relative h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group ring-2 ring-emerald-400/60">
                      <img src={image} alt="new asset file" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-emerald-950/20 text-[9px] font-bold text-white p-1 select-none pointer-events-none uppercase">New</div>
                    </div>
                  ))}

                  {/* SAVED BACKEND ENGINES PREVIEWS */}
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={img.url} alt="saved data registry" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setExistingImages(existingImages.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-rose-600 text-white w-5 h-5 flex items-center justify-center rounded-lg shadow-sm"
                        title="Remove Server Mirror"
                      >
                        <FiTrash2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BUTTON BAR FOOTER CONTROLS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider text-white px-6 py-3.5 rounded-xl transition-all shadow-xs active:scale-[0.98] ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : isEdit ? "bg-amber-500 hover:bg-amber-600 shadow-amber-100" : "bg-blue-600 hover:bg-blue-700 shadow-blue-100"
                }`}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" size={14} />
                    <span>Saving to Registry...</span>
                  </>
                ) : (
                  <span>{isEdit ? "Update Catalog Entry" : "Publish to Storefront"}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-800 text-xs font-bold uppercase tracking-wider rounded-xl bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;