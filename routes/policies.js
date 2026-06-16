const express = require('express');
const router = express.Router();
const { sendPolicyEmail } = require('../utils/email');
const { generateMileageTrackingPDF } = require('../utils/pdf');

router.get('/mileage-tracking', (req, res) => {
  res.render('policies/mileage-tracking');
});

router.post('/mileage-tracking', async (req, res) => {
  try {
    const pdfBuffer = await generateMileageTrackingPDF(req.body);
    await sendPolicyEmail('MILEAGE & PAYROLL TRACKING POLICY ACKNOWLEDGMENT', req.body, pdfBuffer);
    res.render('policies/success', { policyName: 'Mileage & Payroll Tracking Policy' });
  } catch (error) {
    res.render('policies/error', { error: error.message });
  }
});

module.exports = router;
