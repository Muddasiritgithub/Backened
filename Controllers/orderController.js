const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const Order = require('../Models/order');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS    
    }
});
const createOrder = async (req, res) => {
  try {
      const { customerName, orderId, amount, email } = req.body;


      

      // Create and save new order
      const newOrder = new Order({ customerName, orderId, amount, email });
      await newOrder.save();

      // Ensure invoices directory exists
      const invoicesDir = path.join(__dirname, '../invoices');
      if (!fs.existsSync(invoicesDir)) {
          fs.mkdirSync(invoicesDir, { recursive: true });
      }

      // Generate PDF invoice
      const pdfPath = path.join(invoicesDir, `invoice_${newOrder._id}.pdf`);
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));

      doc.fontSize(20).text('Order Invoice', { align: 'center' });
      doc.text(`\nOrder ID: ${newOrder.orderId}`);
      doc.text(`Customer: ${newOrder.customerName}`);
      doc.text(`Total Amount: ${newOrder.amount}`);
      doc.text('\nItems:');
      // Add code to list items if applicable

      doc.end();

      // Send email with PDF attachment
      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Order Confirmation',
          text: `Thank you for your order, ${newOrder.customerName}! Your Order ID is ${newOrder.orderId}.`,
          attachments: [
              {
                  filename: `invoice_${newOrder._id}.pdf`,
                  path: pdfPath
              }
          ]
      });

      res.status(201).json({ message: 'Order created and email sent successfully!', order: newOrder });
  } catch (error) {
      console.error('Error creating order or sending email:', error);
      res.status(500).json({ message: 'Error creating order or sending email', error });
  }
};



module.exports = { createOrder };
