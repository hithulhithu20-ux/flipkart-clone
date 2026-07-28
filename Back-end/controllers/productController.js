import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";


export const getProducts = async (req, res) => {
  try {
    const {search,category,minPrice,maxPrice,featured,rating,sort} = req.query;

    const query = {};

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Category
    if (category) {
      query.category = category;
    }

    // Featured
    if (featured === "true") {
      query.featured = true;
    }

    // Rating
    if (rating) {
      query.rating = {
        $gte: Number(rating),
      };
    }

    // Price
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice)
        query.price.$gte = Number(minPrice);

      if (maxPrice)
        query.price.$lte = Number(maxPrice);
    }

    let products = Product.find(query);

    // Sorting
    if (sort === "priceLow") {
      products = products.sort({
        price: 1,
      });
    }

    else if (sort === "priceHigh") {
      products = products.sort({
        price: -1,
      });
    }

    else if (sort === "newest") {
      products = products.sort({
        createdAt: -1,
      });
    }

    products = await products;

    res.json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      brand,
      originalPrice,
      featured,
    } = req.body;

    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];

    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];

    // Check category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    // Upload images
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "flipkart-products",
        });

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // CREATE PRODUCT (FIXED)
    const newProduct = await Product.create({
      name,
      slug,
      description,
      brand,
      category,
      price,
      originalPrice,
      stock,
      featured,
      images,
      highlights,
      specifications,
    });
    console.log("FILES:", req.files);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      name,
      description,
      brand,
      category,
      price,
      originalPrice,
      stock,
      featured,
    } = req.body;

    const highlights = req.body.highlights
      ? JSON.parse(req.body.highlights)
      : [];

    const specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];

    // update fields
    product.name = name || product.name;
    product.slug = name
      ? slugify(name, { lower: true, strict: true })
      : product.slug;

    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.originalPrice = originalPrice || product.originalPrice;
    product.stock = stock || product.stock;
    product.featured =
      featured !== undefined ? featured : product.featured;

    product.highlights = highlights;
    product.specifications = specifications;

    // if new images uploaded
    let updatedImages = [];

    const existingImages = req.body.existingImages
      ? JSON.parse(req.body.existingImages)
      : product.images;

    // keep existing
    updatedImages = [...existingImages];

    // add new uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "flipkart-products",
        });

        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    product.images = updatedImages;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};