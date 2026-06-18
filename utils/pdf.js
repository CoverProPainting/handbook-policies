const PDFDocument = require('pdfkit');

function generateMileageTrackingPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(18).font('Helvetica-Bold').text('MILEAGE & PAYROLL TRACKING POLICY', { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('Employee Handbook Acknowledgment', { align: 'center' });
  doc.moveDown();

  // Purpose
  doc.fontSize(12).font('Helvetica-Bold').text('Purpose');
  doc.fontSize(10).font('Helvetica').text('This policy outlines how work hours and mileage are tracked and compensated using QuickBooks Time (QB Time) to ensure consistency and fairness for all field employees.');
  doc.moveDown();

  // Who This Covers
  doc.fontSize(12).font('Helvetica-Bold').text('Who This Covers');
  doc.fontSize(10).font('Helvetica').text('• All W-2 field employees who use a personal vehicle for work travel\n• Does not apply to employees driving a company vehicle\n• Does not apply to subcontractor crews');
  doc.moveDown();

  // Clock-In/Out
  doc.fontSize(12).font('Helvetica-Bold').text('Clock-In / Clock-Out & the Commute Rule');
  doc.fontSize(10).font('Helvetica').text('Employees are responsible for the first 45 minutes of their commute to the first job site. Clock in at the 45-minute mark of your commute — or when you arrive at the first job site, whichever comes first. Clock out when leaving the final job site.');
  doc.moveDown();

  // Mileage Tracking
  doc.fontSize(12).font('Helvetica-Bold').text('How Mileage Is Tracked');
  doc.fontSize(10).font('Helvetica').text('Mileage is tracked automatically by QB Time GPS while you are clocked in with location services enabled. No manual logging is required.');
  doc.moveDown();
  
  doc.fontSize(10).font('Helvetica-Bold').text('Counted (clocked in):');
  doc.fontSize(9).font('Helvetica').text('• Travel between job sites\n• Supply runs during work hours\n• Travel between company-directed locations');
  doc.moveDown(0.3);
  
  doc.fontSize(10).font('Helvetica-Bold').text('Not counted:');
  doc.fontSize(9).font('Helvetica').text('• Any travel while clocked out\n• Home to first job site and last job site to home\n• Personal errands or detours');
  doc.moveDown();

  // Reimbursement
  doc.fontSize(12).font('Helvetica-Bold').text('Reimbursement Rate & Payment');
  doc.fontSize(10).font('Helvetica').text('Mileage is reimbursed at the IRS standard mileage rate — 72.5¢ per mile as of January 1, 2026. This rate is non-taxable and paid with the matching payroll period. Separate fuel reimbursement does not apply.');
  doc.moveDown();

  // Employee Responsibilities
  doc.fontSize(12).font('Helvetica-Bold').text('Employee Responsibilities');
  doc.fontSize(10).font('Helvetica').text('• Keep location services enabled while clocked in\n• Clock in and out accurately every day\n• Maintain a valid driver\'s license and current auto insurance\n• Notify supervisor immediately if GPS or app malfunctions');
  doc.moveDown();

  // Acknowledgment
  doc.fontSize(12).font('Helvetica-Bold').text('Acknowledgment');
  doc.fontSize(10).font('Helvetica').text('I have read and understand this Mileage & Payroll Tracking Policy. I understand the commute rule, how mileage is tracked by GPS, and my responsibilities for accurate clock-in and clock-out. I agree to follow these procedures.');
  doc.moveDown();

  doc.fontSize(10).font('Helvetica-Bold').text('Employee Name (print):');
  doc.fontSize(10).font('Helvetica').text(data.employeeName || '___________________________________');
  doc.moveDown(0.3);

  doc.fontSize(10).font('Helvetica-Bold').text('Employee Signature:');
  doc.fontSize(10).font('Helvetica').text(data.employeeSignature || '___________________________________');
  doc.moveDown(0.2);

  doc.fontSize(9).text('Date: ' + new Date().toLocaleDateString());

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}

function generateLaptopPolicyPDF(data) {
  const doc = new PDFDocument({ margin: 40 });
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(18).font('Helvetica-Bold').text('LAPTOP & ELECTRONIC DEVICE USAGE POLICY', { align: 'center' });
  doc.fontSize(10).font('Helvetica').text('Employee Handbook Acknowledgment', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Purpose');
  doc.fontSize(10).font('Helvetica').text('This policy establishes standards for the responsible use, security, and return of company-issued laptops and electronic devices. It applies to all employees who are assigned company equipment.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Equipment Assignment');
  doc.fontSize(10).font('Helvetica').text('Company-issued devices are provided exclusively for conducting Cover Pro Painting business. Employees are responsible for assigned equipment from the date of issuance until it is returned.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Acceptable Use');
  doc.fontSize(10).font('Helvetica').text('Company devices must be used primarily for official business purposes. Limited personal use is permitted if it does not interfere with job duties, violate policy, or incur costs.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Prohibited Activities');
  doc.fontSize(10).font('Helvetica').text('• Accessing illegal, explicit, or pirated content\n• Harassment, discrimination, or unlawful activity\n• Bypassing security controls\n• Personal financial gain or outside business\n• Sharing login credentials');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('No Expectation of Privacy');
  doc.fontSize(10).font('Helvetica').text('Employees have no expectation of privacy when using company devices. The company reserves the right to monitor, access, and record activity at any time.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Security Responsibilities');
  doc.fontSize(10).font('Helvetica').text('• Devices must not be left unattended in public spaces\n• Login credentials must be kept confidential\n• Lost, stolen, or compromised devices must be reported immediately\n• Security incidents must be reported immediately');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Return of Equipment');
  doc.fontSize(10).font('Helvetica').text('All devices remain company property. Equipment must be returned immediately upon request or upon separation from employment.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Liability for Loss or Damage');
  doc.fontSize(10).font('Helvetica').text('Employees may be held financially responsible for willful failure to return equipment or intentional damage. Recoupment fees up to $250 may be deducted from final paycheck per Washington State law.');
  doc.moveDown();

  doc.fontSize(12).font('Helvetica-Bold').text('Acknowledgment');
  doc.fontSize(10).font('Helvetica').text('I have read and understand the Laptop & Electronic Device Usage Policy. I understand my responsibilities for the security and return of company equipment, and I authorize the company to monitor device usage and deduct recoupment fees from my final paycheck if applicable.');
  doc.moveDown();

  doc.fontSize(10).font('Helvetica-Bold').text('Employee Name (print):');
  doc.fontSize(10).font('Helvetica').text(data.employeeName || '___________________________________');
  doc.moveDown(0.3);

  doc.fontSize(10).font('Helvetica-Bold').text('Employee Signature:');
  doc.fontSize(10).font('Helvetica').text(data.employeeSignature || '___________________________________');
  doc.moveDown(0.2);

  doc.fontSize(9).text('Date: ' + new Date().toLocaleDateString());

  doc.end();
  return new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(buffers));
    });
  });
}
module.exports = { generateMileageTrackingPDF, generateLaptopPolicyPDF };
