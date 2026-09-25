const mongoose = require('mongoose');

const offerBannerSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      required: [true, 'Banner text is required'],
      default: 'Festive Season Grandeur: Complimentary Silk Stole on Orders Above ₹20,000 | Code: LUMIERE20',
      trim: true,
    },
    link: {
      type: String,
      default: '/offers',
    },
    bgColor: {
      type: String,
      default: '#C8906D', // Default to Terracotta
    },
    textColor: {
      type: String,
      default: '#FFFFFF',
    },
    badgeText: {
      type: String,
      default: 'EXCLUSIVE OFFER',
    },
    endDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days from now
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OfferBanner', offerBannerSchema);
