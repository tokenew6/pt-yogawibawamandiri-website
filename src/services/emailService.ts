import emailjs from '@emailjs/browser';

// Email service configuration
const EMAIL_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ywm',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ywm',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
  orderTemplateId: import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID || 'template_ywm_order',
  adminEmail: 'admin@ywm.co.id',
  salesEmail: 'sales@ywm.co.id'
};

// Initialize EmailJS
emailjs.init(EMAIL_CONFIG.publicKey);

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

export interface OrderEmailData {
  orderNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  service: string;
  quantity: string;
  deliveryDate: string;
  address: string;
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
}

export class EmailService {
  // Send contact form email
  static async sendContactForm(data: ContactFormData): Promise<boolean> {
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        to_email: EMAIL_CONFIG.adminEmail,
        reply_to: data.email,
        timestamp: new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.templateId,
        templateParams
      );

      if (result.status === 200) {
        console.log('Contact email sent successfully');
        return true;
      } else {
        console.error('Failed to send contact email:', result);
        return false;
      }
    } catch (error) {
      console.error('Error sending contact email:', error);
      return false;
    }
  }

  // Send order confirmation email
  static async sendOrderConfirmation(data: OrderEmailData): Promise<boolean> {
    try {
      // Email to customer
      const customerTemplateParams = {
        to_email: data.email,
        to_name: data.contactPerson,
        company_name: data.companyName,
        order_number: data.orderNumber,
        service: data.service,
        quantity: data.quantity,
        delivery_date: data.deliveryDate,
        delivery_address: data.address,
        total_amount: data.totalAmount.toLocaleString('id-ID'),
        payment_method: data.paymentMethod,
        notes: data.notes || '',
        contact_phone: EMAIL_CONFIG.salesEmail,
        timestamp: new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta'
        })
      };

      // Email to admin/sales team
      const adminTemplateParams = {
        to_email: EMAIL_CONFIG.salesEmail,
        to_name: 'Sales Team',
        customer_company: data.companyName,
        customer_name: data.contactPerson,
        customer_email: data.email,
        customer_phone: data.phone,
        order_number: data.orderNumber,
        service: data.service,
        quantity: data.quantity,
        delivery_date: data.deliveryDate,
        delivery_address: data.address,
        total_amount: data.totalAmount.toLocaleString('id-ID'),
        payment_method: data.paymentMethod,
        notes: data.notes || '',
        timestamp: new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta'
        })
      };

      // Send to customer
      const customerResult = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.orderTemplateId,
        customerTemplateParams
      );

      // Send to admin
      const adminResult = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_order_admin',
        adminTemplateParams
      );

      return customerResult.status === 200 && adminResult.status === 200;
    } catch (error) {
      console.error('Error sending order emails:', error);
      return false;
    }
  }

  // Send newsletter subscription
  static async sendNewsletterSubscription(email: string, name?: string): Promise<boolean> {
    try {
      const templateParams = {
        to_email: email,
        to_name: name || 'Subscriber',
        from_email: EMAIL_CONFIG.adminEmail,
        company_name: 'PT. Yoga Wibawa Mandiri',
        website_url: window.location.origin,
        unsubscribe_url: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_newsletter',
        templateParams
      );

      return result.status === 200;
    } catch (error) {
      console.error('Error sending newsletter email:', error);
      return false;
    }
  }

  // Send password reset email
  static async sendPasswordReset(email: string, resetToken: string): Promise<boolean> {
    try {
      const templateParams = {
        to_email: email,
        reset_url: `${window.location.origin}/reset-password?token=${resetToken}`,
        company_name: 'PT. Yoga Wibawa Mandiri',
        expires_in: '24 jam'
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_reset_password',
        templateParams
      );

      return result.status === 200;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }

  // Send quote request
  static async sendQuoteRequest(data: any): Promise<boolean> {
    try {
      const templateParams = {
        to_email: EMAIL_CONFIG.salesEmail,
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        company_name: data.company,
        project_type: data.projectType,
        estimated_quantity: data.quantity,
        project_location: data.location,
        timeline: data.timeline,
        additional_info: data.notes,
        timestamp: new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta'
        })
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_quote_request',
        templateParams
      );

      return result.status === 200;
    } catch (error) {
      console.error('Error sending quote request:', error);
      return false;
    }
  }

  // Send invoice email
  static async sendInvoice(orderData: any, invoiceUrl: string): Promise<boolean> {
    try {
      const templateParams = {
        to_email: orderData.email,
        customer_name: orderData.contactPerson,
        company_name: orderData.companyName,
        order_number: orderData.orderNumber,
        invoice_url: invoiceUrl,
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID'),
        total_amount: orderData.totalAmount.toLocaleString('id-ID'),
        payment_instructions: 'Silakan lakukan pembayaran sesuai metode yang dipilih.',
        contact_info: EMAIL_CONFIG.salesEmail
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_invoice',
        templateParams
      );

      return result.status === 200;
    } catch (error) {
      console.error('Error sending invoice email:', error);
      return false;
    }
  }

  // Test email configuration
  static async testEmailConfig(): Promise<boolean> {
    try {
      const testParams = {
        to_email: EMAIL_CONFIG.adminEmail,
        test_message: 'This is a test email from PT. YWM website',
        timestamp: new Date().toISOString()
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.serviceId,
        'template_ywm_test',
        testParams
      );

      return result.status === 200;
    } catch (error) {
      console.error('Email configuration test failed:', error);
      return false;
    }
  }
}

// Utility functions for email templates
export const generateOrderEmailHtml = (data: OrderEmailData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <header style="background: #C62828; color: white; padding: 20px; text-align: center;">
        <h1>PT. Yoga Wibawa Mandiri</h1>
        <p>Konfirmasi Pesanan</p>
      </header>
      
      <main style="padding: 20px;">
        <h2>Terima kasih atas pesanan Anda!</h2>
        
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <h3>Detail Pesanan</h3>
          <p><strong>Nomor Pesanan:</strong> ${data.orderNumber}</p>
          <p><strong>Perusahaan:</strong> ${data.companyName}</p>
          <p><strong>Layanan:</strong> ${data.service}</p>
          <p><strong>Jumlah:</strong> ${data.quantity}</p>
          <p><strong>Tanggal Pengiriman:</strong> ${data.deliveryDate}</p>
          <p><strong>Total:</strong> Rp ${data.totalAmount.toLocaleString('id-ID')}</p>
        </div>
        
        <p>Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi lebih lanjut.</p>
        
        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
          <p><strong>Kontak:</strong></p>
          <p>Email: info@ywm.co.id</p>
          <p>Telepon: +62 651 123456</p>
          <p>WhatsApp: +62 812 3456 7890</p>
        </div>
      </main>
      
      <footer style="background: #f0f0f0; padding: 10px; text-align: center; font-size: 12px;">
        <p>&copy; 2024 PT. Yoga Wibawa Mandiri. All rights reserved.</p>
      </footer>
    </div>
  `;
};

export default EmailService;
