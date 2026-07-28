import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },

        comment: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        originalPrice: {
            type: Number,
            required: true,
        },

        stock: {
            type: Number,
            default: 0,
        },

        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
                public_id: {
                    type: String,
                    required: true,
                },
            },
        ],

        specifications: [
            {
                key: String,
                value: String,
            },
        ],

        highlights: [
            {
                type: String,
            },
        ],

        rating: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },

        reviews: [reviewSchema],

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);