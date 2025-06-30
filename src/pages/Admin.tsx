import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  Package, 
  MessageSquare,
  TrendingUp,
  Bot,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';

const Admin = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data untuk demo
  const stats = {
    totalOrders: 127,
    totalArticles: 45,
    totalProjects: 23,
    totalRevenue: 2450000000
  };

  const recentOrders = [
    { id: 'ORD-001', company: 'PT. Konstruksi Jaya', service: 'Pengantongan Semen', amount: 85000000, status: 'confirmed' },
    { id: 'ORD-002', company: 'CV. Bangunan Sejahtera', service: 'Distribusi', amount: 45000000, status: 'pending' },
    { id: 'ORD-003', company: 'PT. Infrastruktur Modern', service: 'Custom Packaging', amount: 120000000, status: 'processing' }
  ];

  const recentArticles = [
    { id: 1, title: 'Tips Memilih Semen Berkualitas', views: 1250, status: 'published', date: '2024-06-25' },
    { id: 2, title: 'Proses Pengantongan Modern', views: 980, status: 'draft', date: '2024-06-24' },
    { id: 3, title: 'Distribusi Efisien di Aceh', views: 2100, status: 'published', date: '2024-06-23' }
  ];

  const ContentManagement = () => {
    const [newArticle, setNewArticle] = useState({
      title: '',
      content: '',
      category: '',
      featured: false
    });

    const handleGenerateAI = async () => {
      // Mock AI generation
      setNewArticle({
        title: 'Inovasi Teknologi Pengantongan Semen Modern',
        content: `Industri pengantongan semen terus berkembang dengan adopsi teknologi terdepan. PT. Yoga Wibawa Mandiri memimpin inovasi ini dengan sistem otomatis yang meningkatkan efisiensi produksi hingga 40%.

Teknologi terbaru yang kami implementasikan meliputi:

1. **Sistem Penimbangan Digital**
   - Akurasi tinggi hingga 0.1% toleransi
   - Kalibrasi otomatis setiap shift
   - Integrasi dengan sistem quality control

2. **Robotika Packaging**
   - Kecepatan 500 kantong per jam
   - Konsistensi kualitas kemasan
   - Pengurangan waste hingga 15%

3. **IoT Monitoring**
   - Real-time tracking produksi
   - Predictive maintenance
   - Dashboard analytics komprehensif

Dengan teknologi ini, kami mampu mempertahankan standar kualitas Semen Padang sambil meningkatkan kapasitas produksi untuk memenuhi kebutuhan konstruksi di Aceh dan Sumatera Utara.`,
        category: 'teknologi',
        featured: true
      });
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold">Content Management</h3>
          <Button onClick={handleGenerateAI} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Bot className="mr-2 h-4 w-4" />
            Generate AI Article
          </Button>
        </div>

        <Tabs defaultValue="articles">
          <TabsList>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Article</CardTitle>
                <CardDescription>Generate content using AI or create manually</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newArticle.category} onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teknologi">Teknologi</SelectItem>
                      <SelectItem value="industri">Industri</SelectItem>
                      <SelectItem value="kualitas">Kualitas</SelectItem>
                      <SelectItem value="distribusi">Distribusi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Article content"
                    rows={10}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish Article</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{article.title}</h4>
                        <p className="text-sm text-gray-600">{article.views} views • {article.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Portfolio</CardTitle>
                <CardDescription>Manage company projects and case studies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Project
                </Button>
                <p className="text-gray-500">Project management interface would be here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Management</CardTitle>
                <CardDescription>Update service offerings and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
                <p className="text-gray-500">Services management interface would be here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const OrderManagement = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Order Management</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Manage customer orders and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">{order.company}</h4>
                  <p className="text-sm text-gray-600">{order.service} • {order.id}</p>
                  <p className="text-lg font-bold text-ywm-red">
                    Rp {order.amount.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      order.status === 'confirmed' ? 'default' : 
                      order.status === 'pending' ? 'secondary' : 'outline'
                    }
                  >
                    {order.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AITools = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">AI Tools</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-600" />
              Content Generator
            </CardTitle>
            <CardDescription>Generate articles, product descriptions, and marketing content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Content Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Blog Article</SelectItem>
                    <SelectItem value="product">Product Description</SelectItem>
                    <SelectItem value="faq">FAQ Response</SelectItem>
                    <SelectItem value="social">Social Media Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Topic/Keywords</Label>
                <Input placeholder="e.g., teknologi pengantongan semen" />
              </div>
              <Button className="w-full">Generate Content</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-green-600" />
              FAQ Manager
            </CardTitle>
            <CardDescription>Update AI assistant responses and knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>New FAQ Question</Label>
                <Input placeholder="Customer question" />
              </div>
              <div>
                <Label>AI Response</Label>
                <Textarea placeholder="AI assistant response" rows={4} />
              </div>
              <Button className="w-full">Add to Knowledge Base</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Analytics & Reports</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Page Views</span>
                <span className="font-bold">12,459</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Visitors</span>
                <span className="font-bold">8,234</span>
              </div>
              <div className="flex justify-between">
                <span>Bounce Rate</span>
                <span className="font-bold">23.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Conversations</span>
                <span className="font-bold">1,456</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution Rate</span>
                <span className="font-bold">87.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Response Time</span>
                <span className="font-bold">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">PT. Yoga Wibawa Mandiri - Management Panel</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Orders</p>
                      <p className="text-3xl font-bold text-ywm-dark dark:text-white">{stats.totalOrders}</p>
                    </div>
                    <Package className="h-8 w-8 text-ywm-red" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Articles</p>
                      <p className="text-3xl font-bold text-ywm-dark dark:text-white">{stats.totalArticles}</p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Projects</p>
                      <p className="text-3xl font-bold text-ywm-dark dark:text-white">{stats.totalProjects}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Revenue</p>
                      <p className="text-2xl font-bold text-ywm-dark dark:text-white">
                        Rp {(stats.totalRevenue / 1000000000).toFixed(1)}B
                      </p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Article
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Project Images
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Bot className="mr-2 h-4 w-4" />
                    Update AI Responses
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Website Status</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI Assistant</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payment Gateway</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge variant="default">Healthy</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="ai-tools">
            <AITools />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
