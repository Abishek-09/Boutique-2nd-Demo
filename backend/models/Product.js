const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['women', 'men', 'jewellery', 'accessories'],
      lowercase: true,
    },
    categoryName: {
      type: String,
      default: "Women's Couture",
    },
    price: {
      type: Number,
      required: [true, 'Original price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price must be positive'],
    },
    // New Arrival Feature Flag
    isNewArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    // Offer / Promotion Feature Flag
    isOnOffer: {
      type: Boolean,
      default: false,
      index: true,
    },
    // Discounted Price
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (val) {
          if (val == null) return true;
          return val < this.price;
        },
        message: 'Discount price must be lower than original price',
      },
    },
    // Discount Percentage
    discountPercentage: {
      type: Number,
      min: [1, 'Discount percentage must be at least 1%'],
      max: [99, 'Discount percentage cannot exceed 99%'],
    },
    stock: {
      type: Number,
      required: true,
      default: 10,
      min: [0, 'Stock cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    fabric: {
      type: String,
      default: 'Pure Mulberry Silk',
    },
    craft: {
      type: String,
      default: 'Handcrafted Zardozi Weave',
    },
    tag: {
      type: String,
      default: 'Atelier Piece',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: auto-compute discount percentage or discount price if either is set
productSchema.pre('save', function (next) {
  if (this.isOnOffer) {
    if (this.discountPrice && !this.discountPercentage && this.price > 0) {
      this.discountPercentage = Math.round(
        ((this.price - this.discountPrice) / this.price) * 100
      );
    } else if (this.discountPercentage && !this.discountPrice && this.price > 0) {
      this.discountPrice = Math.round(
        this.price * (1 - this.discountPercentage / 100)
      );
    }
  } else {
    this.discountPrice = undefined;
    this.discountPercentage = undefined;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
