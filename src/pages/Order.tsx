import Layout from '@/components/Layout';
import OrderSystem from '@/components/OrderSystem';

const Order = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-ywm-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Sistem Pemesanan Online
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in">
            Pesan semen dan layanan distribusi dengan mudah melalui platform digital kami
          </p>
        </div>
      </section>

      {/* Order System */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <OrderSystem />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ywm-dark dark:text-white mb-4">
              Keuntungan Pesan <span className="text-ywm-red">Online</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Nikmati kemudahan dan keunggulan sistem pemesanan digital kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Proses Cepat</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pemesanan dapat diproses dalam hitungan menit dengan konfirmasi otomatis
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Pembayaran Fleksibel</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Berbagai pilihan pembayaran: Bank, QRIS, E-wallet, hingga kredit untuk korporat
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Tracking Real-time</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pantau status pesanan Anda secara real-time dari konfirmasi hingga pengiriman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-ywm-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Butuh Bantuan?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim customer service kami siap membantu Anda 24/7 melalui berbagai channel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              WhatsApp Support
            </a>
            <a 
              href="tel:+6261456789"
              className="border-2 border-white text-white hover:bg-white hover:text-ywm-red px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Call Center
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Order;
