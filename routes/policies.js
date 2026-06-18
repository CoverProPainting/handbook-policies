const express = require('express');
const router = express.Router();
const { sendPolicyEmail } = require('../utils/email');
const { generateMileageTrackingPDF, generateLaptopPolicyPDF } = require('../utils/pdf');

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

router.get('/laptop-policy', (req, res) => {
  res.render('policies/laptop-policy');
});

router.post('/laptop-policy', async (req, res) => {
  try {
    const pdfBuffer = await generateLaptopPolicyPDF(req.body);
    await sendPolicyEmail('LAPTOP & ELECTRONIC DEVICE USAGE POLICY ACKNOWLEDGMENT', req.body, pdfBuffer);
    res.render('policies/success', { policyName: 'Laptop & Electronic Device Usage Policy' });
  } catch (error) {
    res.render('policies/error', { error: error.message });
  }
});module.exports = router;
