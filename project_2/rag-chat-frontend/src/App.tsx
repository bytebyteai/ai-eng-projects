import { useState } from 'react'
import { 
  Truck, 
  Package, 
  Shield, 
  Clock, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  CheckCircle,
  Zap,
  Heart,
  CreditCard,
  RotateCcw,
  Ruler,
  Star,
  Users,
  Award,
  ShieldCheck
} from 'lucide-react'
import ChatWidget from './components/ChatWidget'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  // Data from PDFs
  const shippingData = {
    regions: [
      { name: 'West Coast US', standard: '2-3 days', expedited: '1 day', carrier: 'UPS' },
      { name: 'Midwest / TX', standard: '3-4 days', expedited: '2 days', carrier: 'UPS' },
      { name: 'East Coast US', standard: '4-5 days', expedited: '2 days', carrier: 'UPS' },
      { name: 'Canada', standard: '5-8 days', expedited: '3 days', carrier: 'DHL/Canada Post' },
      { name: 'EU, UK', standard: '5-8 days', expedited: '3 days', carrier: 'DHL/DPD' },
      { name: 'Australia/NZ', standard: '7-10 days', expedited: '4 days', carrier: 'FedEx' },
      { name: 'Japan/Singapore', standard: '4-6 days', expedited: '2 days', carrier: 'DHL' }
    ],
    rates: [
      { basket: 'Under $75', usaStd: '$7.95', canadaStd: '$14.95', euStd: '€9.95' },
      { basket: '$75+', usaStd: 'FREE', canadaStd: 'FREE', euStd: 'FREE' }
    ]
  }

  const paymentData = {
    methods: ['Visa', 'MasterCard', 'AmEx', 'Discover', 'Apple Pay', 'Google Pay', 'PayPal', 'Shop Pay', 'Klarna', 'USDC Crypto'],
    security: [
      'TLS 1.3 Encryption',
      'PCI-DSS Level 1 Compliant',
      '3-D Secure Authentication',
      'No Card Data Storage'
    ]
  }

  const returnData = {
    features: [
      '30-day easy returns',
      'Free size exchanges',
      'Instant exchange hold',
      '12-month warranty'
    ]
  }

  const features = [
    {
      icon: Globe,
      title: 'Global Shipping',
      description: 'Fast delivery to 8+ countries with premium carriers'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'Bank-level security with multiple payment options'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns and exchanges'
    },
    {
      icon: Clock,
      title: 'Same Day Dispatch',
      description: 'Orders before 2PM ship same day'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Truck className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Everstorm Outfitters
                </h1>
                <p className="text-gray-600 text-sm">Premium Outdoor Gear</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'shipping', label: 'Shipping' },
                { id: 'returns', label: 'Returns' },
                { id: 'payment', label: 'Payment' },
                { id: 'support', label: 'Support' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`font-medium transition-colors ${
                    activeTab === id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        {activeTab === 'home' && (
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 py-20">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-bold mb-6">
                  Adventure-Ready Gear
                  <span className="block text-blue-200">Worldwide Shipping</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Premium outdoor equipment with fast global delivery, secure payments, 
                  and hassle-free returns. Built for your next adventure.
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setActiveTab('shipping')}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shipping Info
                  </button>
                  <button 
                    onClick={() => setActiveTab('returns')}
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                  >
                    Return Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        {activeTab === 'home' && (
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-blue-600 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Global Shipping</h2>
                <p className="text-xl text-gray-600">Fast, reliable delivery worldwide</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Shipping Times */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <Clock className="text-blue-500" />
                    <span>Delivery Times</span>
                  </h3>
                  <div className="space-y-4">
                    {shippingData.regions.map((region, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4 py-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-gray-800">{region.name}</h4>
                            <p className="text-sm text-gray-600">{region.carrier}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-600 font-semibold">{region.expedited} expedited</p>
                            <p className="text-sm text-gray-500">{region.standard} standard</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Rates */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <Package className="text-purple-500" />
                    <span>Shipping Rates</span>
                  </h3>
                  <div className="space-y-4">
                    {shippingData.rates.map((rate, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        rate.usaStd === 'FREE' 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                          : 'bg-gray-50'
                      }`}>
                        <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                          <div>{rate.basket}</div>
                          <div className={rate.usaStd === 'FREE' ? 'text-green-600' : ''}>
                            {rate.usaStd}
                          </div>
                          <div className={rate.canadaStd === 'FREE' ? 'text-green-600' : ''}>
                            {rate.canadaStd}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Free shipping</strong> on orders $75+ to US, Canada, and EU
                    </p>
                  </div>
                </div>
              </div>

              {/* Fulfillment Centers */}
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <MapPin className="text-red-500" />
                  <span>Our Fulfillment Centers</span>
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { location: 'Reno, NV', region: 'US West' },
                    { location: 'Harrisburg, PA', region: 'US East' },
                    { location: 'Rotterdam, NL', region: 'EU' }
                  ].map((center, index) => (
                    <div key={index} className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="text-red-500 w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-gray-800">{center.location}</h4>
                      <p className="text-sm text-gray-600">{center.region}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns Tab */}
        {activeTab === 'returns' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Easy Returns & Exchanges</h2>
                <p className="text-xl text-gray-600">30-day hassle-free returns</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <RotateCcw className="text-green-500" />
                    <span>Return Features</span>
                  </h3>
                  <div className="space-y-4">
                    {returnData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-500 w-5 h-5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                    <Heart className="text-red-500" />
                    <span>Return Process</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Visit returns portal with order number',
                      'Choose refund or free exchange',
                      'Print prepaid shipping label',
                      'Ship and track your return'
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Secure Payments</h2>
                <p className="text-xl text-gray-600">Multiple payment methods with bank-level security</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Accepted Payments</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {paymentData.methods.map((method, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <CreditCard className="text-blue-500 w-5 h-5" />
                        <span className="font-medium text-gray-700">{method}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg border">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Security Features</h3>
                  <div className="space-y-4">
                    {paymentData.security.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Shield className="text-blue-500 w-5 h-5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Customer Support</h2>
                <p className="text-xl text-gray-600">We're here to help with any questions</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-blue-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
                  <p className="text-gray-600 mb-4">Quick responses within 24 hours</p>
                  <div className="space-y-1 text-sm">
                    <div className="text-blue-600 font-semibold">logistics@everstorm.example</div>
                    <div className="text-blue-600 font-semibold">returns@everstorm.example</div>
                    <div className="text-blue-600 font-semibold">billing@everstorm.example</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Phone Support</h3>
                  <p className="text-gray-600 mb-4">Direct assistance when you need it</p>
                  <div className="space-y-1">
                    <div className="text-green-600 font-semibold">+1 (406) 555-0199</div>
                    <div className="text-sm text-gray-500">Logistics & Shipping</div>
                    <div className="text-green-600 font-semibold">+1 (406) 555-0188</div>
                    <div className="text-sm text-gray-500">Returns & Exchanges</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-purple-500 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Live Chat</h3>
                  <p className="text-gray-600 mb-4">Instant help during business hours</p>
                  <div className="space-y-1">
                    <div className="text-purple-600 font-semibold">08:00 – 18:00 MT</div>
                    <div className="text-sm text-gray-500">Monday - Friday</div>
                    <div className="text-purple-600 font-semibold">Live on website</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Everstorm Outfitters</h4>
              <p className="text-gray-400">Premium outdoor gear with global shipping and exceptional customer service.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => setActiveTab('shipping')} className="block hover:text-white">Shipping Policy</button>
                <button onClick={() => setActiveTab('returns')} className="block hover:text-white">Return Policy</button>
                <button onClick={() => setActiveTab('payment')} className="block hover:text-white">Payment Methods</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => setActiveTab('support')} className="block hover:text-white">Contact Us</button>
                <div className="hover:text-white">Track Order</div>
                <div className="hover:text-white">FAQ</div>
                <div className="hover:text-white">Warranty</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <div className="space-y-2 text-gray-400">
                <div className="hover:text-white">Privacy Policy</div>
                <div className="hover:text-white">Terms of Service</div>
                <div className="hover:text-white">Cookie Policy</div>
                <div className="hover:text-white">Compliance</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Everstorm Outfitters. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App