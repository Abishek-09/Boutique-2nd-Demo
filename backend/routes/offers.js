const express = require('express');
const router = express.Router();
const OfferBanner = require('../models/OfferBanner');

// GET /api/admin/offers (Fetches current global offer banner configuration)
router.get('/', async (req, res) => {
  try {
    let banner = await OfferBanner.findOne();
    if (!banner) {
      banner = await OfferBanner.create({
        enabled: true,
        text: 'Festive Season Grandeur: Complimentary Silk Stole on Orders Above ₹20,000 | Code: LUMIERE20',
        link: '/offers',
        bgColor: '#C8906D',
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// PUT /api/admin/offers (Updates the global site-wide offer banner)
router.put('/', async (req, res) => {
  try {
    const { enabled, text, link, bgColor, endDate, badgeText } = req.body;
    let banner = await OfferBanner.findOne();

    if (!banner) {
      banner = new OfferBanner();
    }

    if (enabled !== undefined) banner.enabled = enabled;
    if (text !== undefined) banner.text = text;
    if (link !== undefined) banner.link = link;
    if (bgColor !== undefined) banner.bgColor = bgColor;
    if (endDate !== undefined) banner.endDate = endDate;
    if (badgeText !== undefined) banner.badgeText = badgeText;

    await banner.save();
    res.status(200).json({ success: true, message: 'Offer banner updated successfully', data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
