import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Building, Smartphone, QrCode, Upload } from 'lucide-react';

interface OrderData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  service: string;
  quantity: string;
  deliveryDate: string;
  address: string;
  notes: string;
  paymentMethod: string;
  documents: File[];
}

const OrderSystem = () => {
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState<OrderData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    service: '',
    quantity: '',
    deliveryDate: '',
    address: '',
    notes: '',
    paymentMethod: 'bank',
    documents: []
  });

  const services = [
    { value: 'bagging', label: 'Pengantongan Semen - 40kg' },
    { value: 'bagging_25', label: 'Pengantongan Semen - 25kg' },
    { value: 'distribution', label: 'Distribusi & Pengiriman' },
    { value: 'storage', label: 'Penyimpanan Warehouse' },
    { value: 'bulk', label: 'Semen Curah (Bulk)' }
  ];

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setOrderData(prev => ({ ...prev, documents: Array.from(files) }));
    }
  };

  const calculateTotal = () => {
    const basePrice = 85000; // Harga per ton
    const quantity = parseInt(orderData.quantity) || 0;
    return basePrice * quantity;
  };

  const handleSubmitOrder = async () => {
    try {
      // TODO: Implement Supabase order submission
      console.log('Order submitted:', orderData);
      alert('Pesanan berhasil dikirim! Tim kami akan menghubungi Anda segera.');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-ywm-dark dark:text-white">
          Sistem Pemesanan Online
        </CardTitle>
        <CardDescription>
          Buat pesanan semen dan layanan distribusi dengan mudah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="order" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="order">Formulir Pesanan</TabsTrigger>
            <TabsTrigger value="payment">Pembayaran</TabsTrigger>
          </TabsList>
          
          <TabsContent value="order" className="space-y-6">
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Nama Perusahaan *</Label>
                <Input
                  id="companyName"
                  value={orderData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="PT. Contoh Konstruksi"
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">Nama Kontak *</Label>
                <Input
                  id="contactPerson"
                  value={orderData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Nama lengkap PIC"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={orderData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@perusahaan.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">No. Telepon *</Label>
                <Input
                  id="phone"
                  value={orderData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+62 812 3456 7890"
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service">Jenis Layanan *</Label>
                <Select value={orderData.service} onValueChange={(value) => handleInputChange('service', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Jumlah (Ton) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={orderData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="0"
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryDate">Tanggal Pengiriman *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={orderData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Alamat Pengiriman *</Label>
                <Textarea
                  id="address"
                  value={orderData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Alamat lengkap lokasi pengiriman"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea
                id="notes"
                value={orderData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Spesifikasi khusus, instruksi pengiriman, dll."
                rows={3}
              />
            </div>

            {/* Document Upload */}
            <div>
              <Label htmlFor="documents">Upload Dokumen (Opsional)</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('documents')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Pilih File
                </Button>
                <span className="text-sm text-gray-500">
                  {orderData.documents.length > 0 
                    ? `${orderData.documents.length} file dipilih` 
                    : 'PDF, DOC, JPG (Max 10MB)'
                  }
                </span>
              </div>
            </div>

            {/* Price Estimation */}
            {orderData.quantity && (
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Estimasi Total:</span>
                    <span className="text-2xl font-bold text-ywm-red">
                      Rp {calculateTotal().toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    *Harga belum termasuk PPN dan biaya pengiriman. Harga final akan dikonfirmasi oleh tim kami.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <div>
              <Label>Metode Pembayaran</Label>
              <Tabs value={orderData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  <TabsTrigger value="qris">QRIS</TabsTrigger>
                  <TabsTrigger value="ewallet">E-Wallet</TabsTrigger>
                  <TabsTrigger value="credit">Kredit</TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Building className="h-8 w-8 text-ywm-red" />
                        <div>
                          <h4 className="font-semibold">Bank Transfer</h4>
                          <p className="text-sm text-gray-600">Transfer langsung ke rekening perusahaan</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Bank BCA:</span>
                          <span className="font-mono">1234567890</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bank Mandiri:</span>
                          <span className="font-mono">9876543210</span>
                        </div>
                        <div className="flex justify-between">
                          <span>a.n:</span>
                          <span>PT. Yoga Wibawa Mandiri</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="qris" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <QrCode className="h-32 w-32 mx-auto mb-4 text-ywm-red" />
                      <h4 className="font-semibold mb-2">QRIS Payment</h4>
                      <p className="text-sm text-gray-600">Scan QR Code dengan aplikasi pembayaran favorit Anda</p>
                      <Button className="mt-4" variant="outline">
                        Generate QR Code
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ewallet" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['GoPay', 'OVO', 'Dana', 'ShopeePay'].map((wallet) => (
                      <Card key={wallet} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <CardContent className="pt-6 text-center">
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-ywm-red" />
                          <p className="text-sm font-medium">{wallet}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="credit" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <CreditCard className="h-8 w-8 text-ywm-red" />
                        <div>
                          <h4 className="font-semibold">Pembayaran Kredit</h4>
                          <p className="text-sm text-gray-600">Untuk klien korporat dengan limit kredit</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Hubungi tim sales kami untuk mengatur pembayaran kredit dengan tenor 30-90 hari.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="pt-6 border-t">
              <Button 
                onClick={handleSubmitOrder}
                className="w-full bg-ywm-red hover:bg-red-700 text-white text-lg py-6"
                disabled={!orderData.companyName || !orderData.email || !orderData.service}
              >
                Kirim Pesanan
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Dengan mengirim pesanan, Anda menyetujui syarat dan ketentuan kami.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderSystem;
