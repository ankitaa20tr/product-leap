import { Resend } from 'resend';

// Initialize Resend client using API key
const createResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured. Email notifications will be disabled.');
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY);
};

export const sendApplicationNotification = async (application) => {
  const resend = createResendClient();

  if (!resend) {
    console.log('Resend client not available. Skipping email notification.');
    console.log('Application details:', application);
    return;
  }

  const recipientEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;

  if (!recipientEmail) {
    console.warn('NOTIFICATION_EMAIL not set. Using EMAIL_USER as fallback.');
  }

  // NOTE: For production you should set FROM_EMAIL to a verified domain in Resend.
  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  // Helper function to escape HTML and prevent XSS
  const escapeHtml = (text) => {
    if (!text) return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
  };

  // Format Instagram link to ensure it's a valid URL
  const formatInstagramUrl = (url) => {
    if (!url) return '';
    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Check if it's just a username
      if (url.startsWith('@')) {
        return `https://www.instagram.com/${url.substring(1)}`;
      }
      // Check if it contains instagram.com
      if (url.includes('instagram.com')) {
        return `https://${url}`;
      }
      // Assume it's a username
      return `https://www.instagram.com/${url}`;
    }
    return url;
  };

  const instagramUrl = formatInstagramUrl(application.instagram);

  const subject = `New Application Received: ${escapeHtml(application.name)}`;
  const html = `
      <h2>New Application Received</h2>
      <p>A new application has been submitted through your website.</p>
      
      <h3>Application Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(application.name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(application.email)}</li>
        <li><strong>Instagram:</strong> <a href="${escapeHtml(instagramUrl)}">${escapeHtml(application.instagram)}</a></li>
        <li><strong>Niche:</strong> ${escapeHtml(application.niche)}</li>
        <li><strong>Submitted At:</strong> ${new Date(application.submitted_at).toLocaleString()}</li>
      </ul>
      
      <h3>Reason for Monetization:</h3>
      <p>${escapeHtml(application.reason).replace(/\n/g, '<br>')}</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from your application system.
      </p>
    `;
  const text = `
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
  `.trim();

  try {
    const result = await resend.emails.send({
      from: `"Application System" <${fromEmail}>`,
      to: recipientEmail,
      subject,
      html,
      text,
    });

    console.log('Email notification sent successfully via Resend:', result?.id || result);
    return { success: true, id: result?.id };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: error.message };
  }
};

