import nodemailer from 'nodemailer';

// Create transporter using environment variables
const createTransporter = () => {
  // Check if email credentials are provided
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Email notifications will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendApplicationNotification = async (application) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('Email transporter not available. Skipping email notification.');
    console.log('Application details:', application);
    return;
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;
  
  if (!recipientEmail) {
    console.warn('NOTIFICATION_EMAIL not set. Using EMAIL_USER as fallback.');
  }

  const mailOptions = {
    from: `"Application System" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `New Application Received: ${application.name}`,
    html: `
      <h2>New Application Received</h2>
      <p>A new application has been submitted through your website.</p>
      
      <h3>Application Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${application.name}</li>
        <li><strong>Email:</strong> ${application.email}</li>
        <li><strong>Instagram:</strong> <a href="${application.instagram}">${application.instagram}</a></li>
        <li><strong>Niche:</strong> ${application.niche}</li>
        <li><strong>Submitted At:</strong> ${new Date(application.submitted_at).toLocaleString()}</li>
      </ul>
      
      <h3>Reason for Monetization:</h3>
      <p>${application.reason.replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from your application system.
      </p>
    `,
    text: `
New Application Received

A new application has been submitted through your website.

Application Details:
- Name: ${application.name}
- Email: ${application.email}
- Instagram: ${application.instagram}
- Niche: ${application.niche}
- Submitted At: ${new Date(application.submitted_at).toLocaleString()}

Reason for Monetization:
${application.reason}

---
This is an automated notification from your application system.
    `.trim(),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: error.message };
  }
};

