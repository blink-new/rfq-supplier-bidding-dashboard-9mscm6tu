import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Clock, 
  Building2, 
  FileText, 
  Filter, 
  Search,
  Eye,
  Download,
  TrendingUp,
  Award,
  Info,
  CheckCircle,
  XCircle,
  Minus,
  MapPin,
  User,
  CreditCard,
  Truck,
  Megaphone,
  Plus,
  Send,
  MessageCircle,
  Users,
  HelpCircle,
  Phone,
  Mail,
  Shield,
  AlertTriangle,
  Target,
  Percent,
  Calculator,
  BarChart3,
  TrendingDown,
  Settings,
  MoreVertical,
  UserPlus,
  X,
  FileSpreadsheet
} from 'lucide-react'

// Sample RFQ data
const rfqData = {
  id: 'RFQ-2024-001',
  title: 'Industrial Equipment Procurement',
  description: 'Request for quotation for manufacturing equipment including CNC machines, conveyor systems, and quality control instruments.',
  category: 'Manufacturing Equipment',
  deadline: '2024-01-30',
  status: 'Active',
  budget: '$500,000 - $750,000',
  requirements: [
    'CNC Machining Centers (3 units)',
    'Automated Conveyor System',
    'Quality Control Equipment',
    'Installation and Training Services',
    '2-year warranty minimum'
  ],
  specifications: {
    deliveryLocation: 'Detroit, MI',
    preferredDelivery: '60-90 days',
    paymentTerms: 'Net 30',
    evaluationCriteria: 'Price (40%), Quality (30%), Delivery Time (20%), Service (10%)'
  }
}

// External Details data based on the image
const externalDetails = {
  location: 'Main',
  orderDate: '4 Jul 2025',
  requester: {
    initials: 'KD',
    name: 'Karina Demidenko',
    color: 'bg-orange-100 text-orange-600'
  },
  assignTo: {
    initials: 'AD',
    name: 'Amanda Drew',
    color: 'bg-blue-100 text-blue-600'
  },
  currency: 'United States dollar',
  supplier: 'Karina Supplier',
  deliveryDate: '10 Jul 2025',
  paymentTerm: 'NET5'
}

// Supplier details for tooltips
const supplierDetails = {
  'Nucor Steel': {
    name: 'Nucor Steel Corporation',
    category: 'Steel Manufacturing & Industrial Equipment',
    rating: 4.8,
    address: '1915 Rexford Road, Charlotte, NC 28211',
    contactNumber: '+1 (704) 366-7000',
    email: 'procurement@nucor.com',
    status: 'Preferred Supplier',
    statusColor: 'text-green-600',
    yearsInBusiness: 15,
    certifications: ['ISO 9001:2015', 'CE Certified', 'OSHA Compliant']
  },
  'Williamson Supply Co.': {
    name: 'Williamson Supply Company',
    category: 'Industrial Supply & Equipment',
    rating: 4.6,
    address: '2847 Industrial Blvd, Cleveland, OH 44115',
    contactNumber: '+1 (216) 555-0123',
    email: 'sales@williamsonsupply.com',
    status: 'Approved Supplier',
    statusColor: 'text-blue-600',
    yearsInBusiness: 12,
    certifications: ['ISO 9001:2015', 'UL Listed']
  },
  'Johnson Supply Company': {
    name: 'Johnson Supply Company LLC',
    category: 'Manufacturing Equipment & Tools',
    rating: 4.9,
    address: '5621 Commerce Drive, Milwaukee, WI 53218',
    contactNumber: '+1 (414) 555-0456',
    email: 'info@johnsonsupply.com',
    status: 'Do Not Work Until Necessary',
    statusColor: 'text-red-600',
    yearsInBusiness: 20,
    certifications: ['ISO 9001:2015', 'AS9100D', 'ITAR Registered']
  }
}

// Sample items data with pricing from different suppliers
const rfqItems = [
  {
    id: 1,
    name: 'MacBook Pro 13"',
    quantity: '12 Each',
    description: 'Latest model with M3 chip',
    category: 'Electronics',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 1100.00,
        freightFee: 50.00,
        vat: 50.00,
        unitPrice: 1100.00 + 50.00 + 50.00, // Base + Freight + VAT
        totalPrice: (1100.00 + 50.00 + 50.00) * 12,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 1250.00,
        freightFee: 75.00,
        vat: 74.00,
        unitPrice: 1250.00 + 75.00 + 74.00, // Base + Freight + VAT
        totalPrice: (1250.00 + 75.00 + 74.00) * 12,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 1200.00,
        freightFee: 80.00,
        vat: 70.00,
        unitPrice: 1200.00 + 80.00 + 70.00, // Base + Freight + VAT
        totalPrice: (1200.00 + 80.00 + 70.00) * 12,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 1299.00,
      averagePrice: 1316.33,
      totalSpend: 47388.00,
      priceTrend: 'down' // 'up', 'down', 'stable'
    }
  },
  {
    id: 2,
    name: 'iPad Pro 11"',
    quantity: '8 Each',
    description: 'Latest model with M2 chip',
    category: 'Electronics',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 750.00,
        freightFee: 25.00,
        vat: 25.00,
        unitPrice: 750.00 + 25.00 + 25.00, // Base + Freight + VAT
        totalPrice: (750.00 + 25.00 + 25.00) * 8,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 780.00,
        freightFee: 35.00,
        vat: 35.00,
        unitPrice: 780.00 + 35.00 + 35.00, // Base + Freight + VAT
        totalPrice: (780.00 + 35.00 + 35.00) * 8,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 760.00,
        freightFee: 30.00,
        vat: 35.00,
        unitPrice: 760.00 + 30.00 + 35.00, // Base + Freight + VAT
        totalPrice: (760.00 + 30.00 + 35.00) * 8,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 820.00,
      averagePrice: 825.00,
      totalSpend: 19800.00,
      priceTrend: 'stable'
    }
  },
  {
    id: 3,
    name: '22mm Steel Bar',
    quantity: '123 Each',
    description: 'High-grade carbon steel',
    category: 'Raw Materials',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 135.00,
        freightFee: 8.00,
        vat: 7.00,
        unitPrice: 135.00 + 8.00 + 7.00, // Base + Freight + VAT
        totalPrice: (135.00 + 8.00 + 7.00) * 123,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 110.00,
        freightFee: 7.00,
        vat: 6.00,
        unitPrice: 110.00 + 7.00 + 6.00, // Base + Freight + VAT
        totalPrice: (110.00 + 7.00 + 6.00) * 123,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 120.00,
        freightFee: 8.50,
        vat: 6.50,
        unitPrice: 120.00 + 8.50 + 6.50, // Base + Freight + VAT
        totalPrice: (120.00 + 8.50 + 6.50) * 123,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 145.00,
      averagePrice: 136.00,
      totalSpend: 50184.00,
      priceTrend: 'stable'
    }
  },
  {
    id: 4,
    name: 'Aluminum Sheets',
    quantity: '50 Sheets',
    description: '3mm thickness aluminum sheets',
    category: 'Raw Materials',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 78.00,
        freightFee: 4.00,
        vat: 3.00,
        unitPrice: 78.00 + 4.00 + 3.00, // Base + Freight + VAT
        totalPrice: (78.00 + 4.00 + 3.00) * 50,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 84.00,
        freightFee: 4.50,
        vat: 3.50,
        unitPrice: 84.00 + 4.50 + 3.50, // Base + Freight + VAT
        totalPrice: (84.00 + 4.50 + 3.50) * 50,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 80.00,
        freightFee: 4.20,
        vat: 3.80,
        unitPrice: 80.00 + 4.20 + 3.80, // Base + Freight + VAT
        totalPrice: (80.00 + 4.20 + 3.80) * 50,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 90.00,
      averagePrice: 88.33,
      totalSpend: 13250.00,
      priceTrend: 'down'
    }
  },
  {
    id: 5,
    name: 'Industrial Welding Equipment',
    quantity: '5 Units',
    description: 'Professional grade TIG welder',
    category: 'Equipment',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 2300.00,
        freightFee: 120.00,
        vat: 80.00,
        unitPrice: 2300.00 + 120.00 + 80.00, // Base + Freight + VAT
        totalPrice: (2300.00 + 120.00 + 80.00) * 5,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 2500.00,
        freightFee: 150.00,
        vat: 100.00,
        unitPrice: 2500.00 + 150.00 + 100.00, // Base + Freight + VAT
        totalPrice: (2500.00 + 150.00 + 100.00) * 5,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 2200.00,
        freightFee: 110.00,
        vat: 90.00,
        unitPrice: 2200.00 + 110.00 + 90.00, // Base + Freight + VAT
        totalPrice: (2200.00 + 110.00 + 90.00) * 5,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 2650.00,
      averagePrice: 2550.00,
      totalSpend: 38250.00,
      priceTrend: 'up'
    }
  },
  {
    id: 6,
    name: 'CNC Machine',
    quantity: '2 Units',
    description: '3-axis CNC milling machine',
    category: 'Equipment',
    suppliers: {
      'Nucor Steel': { 
        baseUnitPrice: 14200.00,
        freightFee: 500.00,
        vat: 300.00,
        unitPrice: 14200.00 + 500.00 + 300.00, // Base + Freight + VAT
        totalPrice: (14200.00 + 500.00 + 300.00) * 2,
        available: true 
      },
      'Williamson Supply Co.': { 
        baseUnitPrice: 15600.00,
        freightFee: 600.00,
        vat: 300.00,
        unitPrice: 15600.00 + 600.00 + 300.00, // Base + Freight + VAT
        totalPrice: (15600.00 + 600.00 + 300.00) * 2,
        available: true 
      },
      'Johnson Supply Company': { 
        baseUnitPrice: 14000.00,
        freightFee: 450.00,
        vat: 350.00,
        unitPrice: 14000.00 + 450.00 + 350.00, // Base + Freight + VAT
        totalPrice: (14000.00 + 450.00 + 350.00) * 2,
        available: true 
      }
    },
    historicalData: {
      lastPrice: 15500.00,
      averagePrice: 15433.33,
      totalSpend: 92600.00,
      priceTrend: 'stable'
    }
  }
]

// Questionnaire data with scoring
const questionnaireData = [
  {
    id: 1,
    question: 'Do you have ISO 9001 certification?',
    maxScore: 20,
    autoScored: true,
    suppliers: {
      'Nucor Steel': { 
        answer: 'Yes, certified since 2018', 
        score: 20
      },
      'Williamson Supply Co.': { 
        answer: 'Yes, certified since 2020', 
        score: 20
      },
      'Johnson Supply Company': { 
        answer: 'Currently in process, expected Q2 2024', 
        score: 10
      }
    }
  },
  {
    id: 2,
    question: 'What is your standard warranty period?',
    maxScore: 15,
    autoScored: true,
    suppliers: {
      'Nucor Steel': { 
        answer: '3 years comprehensive warranty', 
        score: 12
      },
      'Williamson Supply Co.': { 
        answer: '2 years parts and labor', 
        score: 8
      },
      'Johnson Supply Company': { 
        answer: '5 years limited warranty', 
        score: 15
      }
    }
  },
  {
    id: 3,
    question: 'Can you provide 24/7 technical support?',
    maxScore: 10,
    autoScored: false,
    suppliers: {
      'Nucor Steel': { 
        answer: 'Yes, available 24/7/365', 
        score: null
      },
      'Williamson Supply Co.': { 
        answer: 'Business hours only (8AM-6PM)', 
        score: null
      },
      'Johnson Supply Company': { 
        answer: 'Yes, with premium support package', 
        score: null
      }
    }
  },
  {
    id: 4,
    question: 'What is your typical delivery timeframe?',
    maxScore: 25,
    autoScored: true,
    suppliers: {
      'Nucor Steel': { 
        answer: '45-60 business days', 
        score: 20
      },
      'Williamson Supply Co.': { 
        answer: '30-45 business days', 
        score: 25
      },
      'Johnson Supply Company': { 
        answer: '60-75 business days', 
        score: 15
      }
    }
  },
  {
    id: 5,
    question: 'Do you offer installation services?',
    maxScore: 15,
    autoScored: false,
    suppliers: {
      'Nucor Steel': { 
        answer: 'Yes, nationwide installation team', 
        score: null
      },
      'Williamson Supply Co.': { 
        answer: 'Yes, within 500 mile radius', 
        score: null
      },
      'Johnson Supply Company': { 
        answer: 'Third-party installation partners available', 
        score: null
      }
    }
  }
]

// Additional table rows
const additionalRows = [
  {
    id: 'payment_terms',
    name: 'Payment Term',
    type: 'text',
    suppliers: {
      'Nucor Steel': { value: 'NET30' },
      'Williamson Supply Co.': { value: 'NET45' },
      'Johnson Supply Company': { value: 'NET60' }
    }
  },
  {
    id: 'offer_file',
    name: 'Offer File',
    type: 'text',
    suppliers: {
      'Nucor Steel': { value: 'proposal_nucor.pdf' },
      'Williamson Supply Co.': { value: 'williamson_quote.pdf' },
      'Johnson Supply Company': { value: 'johnson_bid.pdf' }
    }
  },
  {
    id: 'terms_conditions',
    name: 'Terms and Conditions',
    type: 'status',
    suppliers: {
      'Nucor Steel': { status: 'approved', value: 'Approved' },
      'Williamson Supply Co.': { status: 'approved', value: 'Approved' },
      'Johnson Supply Company': { status: 'pending', value: 'Under Review' }
    }
  }
]

// Sample supplier bids data for the original table (keeping for reference)
const supplierBids = [
  {
    id: 'BID-001',
    supplierName: 'Nucor Steel',
    totalPrice: 32850,
    deliveryTime: '75 days',
    rating: 4.8,
    location: 'Chicago, IL',
    status: 'Submitted',
    submittedDate: '2024-01-15',
    warranty: '3 years',
    paymentTerms: 'Net 30',
    certifications: ['ISO 9001', 'CE Certified'],
    experience: '15+ years',
    previousProjects: 47
  },
  {
    id: 'BID-002',
    supplierName: 'Williamson Supply Co.',
    totalPrice: 31917,
    deliveryTime: '60 days',
    rating: 4.6,
    location: 'Cleveland, OH',
    status: 'Submitted',
    submittedDate: '2024-01-16',
    warranty: '2 years',
    paymentTerms: 'Net 45',
    certifications: ['ISO 9001', 'UL Listed'],
    experience: '12+ years',
    previousProjects: 32
  },
  {
    id: 'BID-003',
    supplierName: 'Johnson Supply Company',
    totalPrice: 0,
    deliveryTime: '—',
    rating: 4.9,
    location: 'Milwaukee, WI',
    status: 'No Bid',
    submittedDate: '—',
    warranty: '—',
    paymentTerms: '—',
    certifications: [],
    experience: '20+ years',
    previousProjects: 68
  }
]

const supplierNames = ['Nucor Steel', 'Williamson Supply Co.', 'Johnson Supply Company']

function RFQDashboard() {
  const [selectedBid, setSelectedBid] = useState(null)
  const [sortBy, setSortBy] = useState('price')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSupplierChat, setActiveSupplierChat] = useState('Nucor Steel')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isRfqCompleted, setIsRfqCompleted] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  
  // Settings state
  const [rfqSettings, setRfqSettings] = useState({
    endDate: '2024-01-30',
    paymentTerms: 'Net 30',
    deliveryAddress: 'Detroit, MI',
    items: [...rfqItems],
    suppliers: [...supplierNames]
  })
  
  // Announcements state
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      content: 'RFQ deadline extended to January 30th, 2024',
      timestamp: new Date('2024-01-10T10:30:00'),
      author: 'System'
    },
    {
      id: '2',
      content: 'New supplier Williamson Supply Co. has submitted their bid',
      timestamp: new Date('2024-01-16T14:20:00'),
      author: 'System'
    }
  ])
  const [newAnnouncement, setNewAnnouncement] = useState('')

  // Internal chat state
  const [internalMessages, setInternalMessages] = useState([
    {
      id: '1',
      content: 'Initial review of all bids completed. Nucor Steel looks promising.',
      timestamp: new Date('2024-01-17T09:15:00'),
      author: 'Amanda Drew',
      initials: 'AD',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: '2',
      content: 'Need to clarify delivery terms with Williamson Supply Co.',
      timestamp: new Date('2024-01-17T11:30:00'),
      author: 'Karina Demidenko',
      initials: 'KD',
      color: 'bg-orange-100 text-orange-600'
    }
  ])
  const [newInternalMessage, setNewInternalMessage] = useState('')

  // Supplier chat state - organized by supplier
  const [supplierMessages, setSupplierMessages] = useState({
    'Nucor Steel': [
      {
        id: '1',
        content: 'Thank you for the opportunity to bid on this project. We have submitted our proposal.',
        timestamp: new Date('2024-01-15T14:20:00'),
        author: 'Nucor Steel',
        supplier: true
      },
      {
        id: '2',
        content: 'We have reviewed your proposal. Can you provide more details on the warranty terms?',
        timestamp: new Date('2024-01-16T10:45:00'),
        author: 'Amanda Drew',
        supplier: false
      },
      {
        id: '3',
        content: 'Certainly! Our standard warranty covers 3 years comprehensive coverage including parts, labor, and on-site support.',
        timestamp: new Date('2024-01-16T15:30:00'),
        author: 'Nucor Steel',
        supplier: true
      }
    ],
    'Williamson Supply Co.': [
      {
        id: '1',
        content: 'Hello! We are excited to participate in this RFQ. Our team is preparing a competitive proposal.',
        timestamp: new Date('2024-01-14T11:20:00'),
        author: 'Williamson Supply Co.',
        supplier: true
      },
      {
        id: '2',
        content: 'Thank you for your interest. When can we expect your final proposal?',
        timestamp: new Date('2024-01-15T09:30:00'),
        author: 'Amanda Drew',
        supplier: false
      }
    ],
    'Johnson Supply Company': [
      {
        id: '1',
        content: 'We are reviewing the RFQ requirements and will respond shortly.',
        timestamp: new Date('2024-01-13T16:45:00'),
        author: 'Johnson Supply Company',
        supplier: true
      }
    ]
  })
  const [newSupplierMessage, setNewSupplierMessage] = useState('')

  // Manual scoring state
  const [manualScores, setManualScores] = useState({})

  // Use default RFQ data
  const currentRfqData = rfqData

  const addAnnouncement = () => {
    if (newAnnouncement.trim()) {
      const announcement = {
        id: Date.now().toString(),
        content: newAnnouncement.trim(),
        timestamp: new Date(),
        author: 'User'
      }
      setAnnouncements([announcement, ...announcements])
      setNewAnnouncement('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addAnnouncement()
    }
  }

  const addInternalMessage = () => {
    if (newInternalMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newInternalMessage.trim(),
        timestamp: new Date(),
        author: 'Amanda Drew',
        initials: 'AD',
        color: 'bg-blue-100 text-blue-600'
      }
      setInternalMessages([...internalMessages, message])
      setNewInternalMessage('')
    }
  }

  const addSupplierMessage = () => {
    if (newSupplierMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        content: newSupplierMessage.trim(),
        timestamp: new Date(),
        author: 'Amanda Drew',
        supplier: false
      }
      setSupplierMessages(prev => ({
        ...prev,
        [activeSupplierChat]: [...(prev[activeSupplierChat] || []), message]
      }))
      setNewSupplierMessage('')
    }
  }

  const handleInternalKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addInternalMessage()
    }
  }

  const handleSupplierKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addSupplierMessage()
    }
  }

  const handleManualScore = (questionId, supplier, score) => {
    const key = `${questionId}-${supplier}`
    setManualScores(prev => ({
      ...prev,
      [key]: score
    }))
  }

  // Action handlers
  const handleCompleteRFQ = () => {
    setIsRfqCompleted(true)
    setShowAnalysis(true)
    setActiveTab('analysis')
  }

  const handleAddOffer = () => {
    alert('Add offer functionality would be implemented here')
  }

  const handleCancelRFQ = () => {
    if (confirm('Are you sure you want to cancel this RFQ?')) {
      alert('RFQ cancelled')
    }
  }

  const handleExportPDF = () => {
    alert('Exporting to PDF...')
  }

  const handleExportExcel = () => {
    alert('Exporting to Excel...')
  }

  const handleSaveSettings = () => {
    setIsSettingsOpen(false)
    alert('Settings saved successfully!')
  }

  const handleAddItem = () => {
    const newItem = {
      id: rfqSettings.items.length + 1,
      name: 'New Item',
      quantity: '1 Each',
      description: 'Description',
      suppliers: {}
    }
    setRfqSettings(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }

  const handleAddSupplier = () => {
    const newSupplier = `New Supplier ${rfqSettings.suppliers.length + 1}`
    setRfqSettings(prev => ({
      ...prev,
      suppliers: [...prev.suppliers, newSupplier]
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800'
      case 'Under Review': return 'bg-yellow-100 text-yellow-800'
      case 'Pending Review': return 'bg-orange-100 text-orange-800'
      case 'No Bid': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '$0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calculate price statistics and color coding
  const calculatePriceStats = (itemId: number, priceType: 'unitPrice' | 'totalPrice') => {
    const item = rfqItems.find(i => i.id === itemId)
    if (!item) return null

    const prices = Object.values(item.suppliers)
      .filter(supplier => supplier.available && supplier[priceType] > 0)
      .map(supplier => supplier[priceType])

    if (prices.length === 0) return null

    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length

    return { minPrice, maxPrice, avgPrice }
  }

  const getPriceColorClass = (price: number, stats: any) => {
    if (!stats || price === 0) return ''
    
    if (price === stats.minPrice) return 'bg-green-50 border-2 border-green-400'
    if (price === stats.maxPrice) return 'bg-red-50 border-2 border-red-400'
    return 'bg-blue-50 border-2 border-blue-400'
  }

  const SupplierTooltip = ({ supplierName, children }) => {
    const supplier = supplierDetails[supplierName]
    if (!supplier) return children

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-sm text-gray-900">{supplier.name}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{supplier.category}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{supplier.rating}</span>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{supplier.yearsInBusiness} years</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{supplier.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{supplier.contactNumber}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{supplier.email}</span>
                </div>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium text-xs ${supplier.statusColor}`}>
                    {supplier.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-gray-600 text-xs">Certifications:</span>
                <div className="flex flex-wrap gap-1">
                  {supplier.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  const ItemTooltip = ({ item, children }) => {
    const { historicalData } = item
    if (!historicalData) return children

    const getTrendIcon = (trend) => {
      switch (trend) {
        case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />
        case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />
        case 'stable': return <Minus className="h-4 w-4 text-blue-500" />
        default: return <Minus className="h-4 w-4 text-gray-500" />
      }
    }

    const getTrendColor = (trend) => {
      switch (trend) {
        case 'up': return 'text-red-600'
        case 'down': return 'text-green-600'
        case 'stable': return 'text-blue-600'
        default: return 'text-gray-600'
      }
    }

    const getTrendText = (trend) => {
      switch (trend) {
        case 'up': return 'Price Increasing'
        case 'down': return 'Price Decreasing'
        case 'stable': return 'Price Stable'
        default: return 'No Trend Data'
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-sm text-gray-900">Item Price History</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">📈 Last Price:</span>
                <span className="font-semibold">{formatCurrency(historicalData.lastPrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">📊 Average Price:</span>
                <span className="font-semibold">{formatCurrency(historicalData.averagePrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">💰 Total Spend:</span>
                <span className="font-semibold">{formatCurrency(historicalData.totalSpend)}</span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">📈 Price Trend:</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(historicalData.priceTrend)}
                    <span className={`font-semibold ${getTrendColor(historicalData.priceTrend)}`}>
                      {getTrendText(historicalData.priceTrend)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`rounded-lg p-3 ${
              historicalData.priceTrend === 'down' 
                ? 'bg-green-50 border border-green-200' 
                : historicalData.priceTrend === 'up'
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-center space-x-2">
                {historicalData.priceTrend === 'down' && (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">Favorable Trend</span>
                  </>
                )}
                {historicalData.priceTrend === 'up' && (
                  <>
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-red-700 font-semibold text-sm">Rising Prices</span>
                  </>
                )}
                {historicalData.priceTrend === 'stable' && (
                  <>
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-blue-700 font-semibold text-sm">Stable Market</span>
                  </>
                )}
              </div>
              <p className={`text-xs mt-1 ${
                historicalData.priceTrend === 'down' 
                  ? 'text-green-600' 
                  : historicalData.priceTrend === 'up'
                  ? 'text-red-600'
                  : 'text-blue-600'
              }`}>
                {historicalData.priceTrend === 'down' && 'Prices are trending downward - good time to purchase.'}
                {historicalData.priceTrend === 'up' && 'Prices are increasing - consider purchasing soon.'}
                {historicalData.priceTrend === 'stable' && 'Prices have been consistent over time.'}
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  const PriceTooltip = ({ itemId, supplierName, priceType, price, children }) => {
    const stats = calculatePriceStats(itemId, priceType)
    if (!stats || price === 0) return children

    const savings = price - stats.minPrice
    const savingsPercent = savings > 0 ? ((savings / price) * 100).toFixed(1) : 0
    const isBestPrice = price === stats.minPrice

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="font-semibold text-sm text-gray-900">Price Analysis</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-medium">🏆 Best Price:</span>
                <span className="font-semibold">{formatCurrency(stats.minPrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">📊 Average:</span>
                <span className="font-semibold">{formatCurrency(stats.avgPrice)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-red-600 font-medium">📈 Max Price:</span>
                <span className="font-semibold">{formatCurrency(stats.maxPrice)}</span>
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-medium">💰 {supplierName}:</span>
                  <span className="font-bold text-lg">{formatCurrency(price)}</span>
                </div>
              </div>
            </div>
            
            {isBestPrice ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-semibold text-sm">Best Price Available!</span>
                </div>
                <p className="text-green-600 text-xs mt-1">This supplier offers the lowest price for this item.</p>
              </div>
            ) : savings > 0 ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700 font-semibold text-sm">💡 Potential Savings:</span>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">{formatCurrency(savings)}</div>
                    <div className="text-xs text-orange-500">({savingsPercent}% higher)</div>
                  </div>
                </div>
                <p className="text-orange-600 text-xs mt-1">You could save by choosing the best price option.</p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-700 font-semibold text-sm">Competitive Price</span>
                </div>
                <p className="text-blue-600 text-xs mt-1">This price is within the competitive range.</p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  const calculateTotals = () => {
    const totals = {}
    supplierNames.forEach(supplier => {
      const total = rfqItems.reduce((sum, item) => {
        const supplierData = item.suppliers[supplier]
        return sum + (supplierData?.available ? supplierData.totalPrice : 0)
      }, 0)
      totals[supplier] = total
    })
    return totals
  }

  // Group items by category
  const groupItemsByCategory = () => {
    const grouped = {}
    rfqItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })
    return grouped
  }

  // Calculate totals per category per supplier
  const calculateCategoryTotals = (categoryItems) => {
    const totals = {}
    supplierNames.forEach(supplier => {
      const total = categoryItems.reduce((sum, item) => {
        const supplierData = item.suppliers[supplier]
        return sum + (supplierData?.available ? supplierData.totalPrice : 0)
      }, 0)
      totals[supplier] = total
    })
    return totals
  }

  const calculateQuestionnaireScores = () => {
    const scores = {}
    supplierNames.forEach(supplier => {
      let totalScore = 0
      let maxPossibleScore = 0
      
      questionnaireData.forEach(question => {
        const supplierData = question.suppliers[supplier]
        const manualScoreKey = `${question.id}-${supplier}`
        
        maxPossibleScore += question.maxScore
        
        if (question.autoScored && supplierData.score !== null) {
          totalScore += supplierData.score
        } else if (manualScores[manualScoreKey]) {
          totalScore += manualScores[manualScoreKey]
        }
      })
      
      scores[supplier] = { totalScore, maxPossibleScore, percentage: (totalScore / maxPossibleScore * 100).toFixed(1) }
    })
    return scores
  }

  const getScoreColorClass = (score, allScores) => {
    const scores = Object.values(allScores).map(s => s.totalScore)
    const maxScore = Math.max(...scores)
    const minScore = Math.min(...scores)
    
    if (score === maxScore) return 'bg-green-50 border-2 border-green-400 text-green-700'
    if (score === minScore) return 'bg-red-50 border-2 border-red-400 text-red-700'
    return 'bg-blue-50 border-2 border-blue-400 text-blue-700'
  }

  // Function to determine if a supplier has the highest score for a specific question
  const isHighestScoreForQuestion = (questionId, supplier) => {
    const question = questionnaireData.find(q => q.id === questionId)
    if (!question) return false

    const scores = []
    supplierNames.forEach(supplierName => {
      const supplierData = question.suppliers[supplierName]
      const manualScoreKey = `${questionId}-${supplierName}`
      
      let score = null
      if (question.autoScored && supplierData.score !== null) {
        score = supplierData.score
      } else if (manualScores[manualScoreKey]) {
        score = manualScores[manualScoreKey]
      }
      
      if (score !== null) {
        scores.push({ supplier: supplierName, score })
      }
    })

    if (scores.length === 0) return false
    
    const maxScore = Math.max(...scores.map(s => s.score))
    const supplierScore = scores.find(s => s.supplier === supplier)?.score
    
    return supplierScore === maxScore && supplierScore > 0
  }

  const totals = calculateTotals()
  const questionnaireScores = calculateQuestionnaireScores()
  const groupedItems = groupItemsByCategory()

  // Calculate analytics
  const validTotals = Object.values(totals).filter(t => t > 0)
  const lowestBid = Math.min(...validTotals)
  const highestBid = Math.max(...validTotals)
  const averageBid = validTotals.reduce((sum, total) => sum + total, 0) / validTotals.length
  const potentialSavings = highestBid - lowestBid
  const negotiationRoom = ((potentialSavings / highestBid) * 100).toFixed(1)

  // Calculate cost component analytics
  const calculateCostComponentAnalytics = () => {
    const analytics = {
      totalBase: 0,
      totalFreight: 0,
      totalVat: 0,
      avgFreightPercentage: 0,
      avgVatPercentage: 0,
      supplierBreakdown: {}
    }

    supplierNames.forEach(supplier => {
      let supplierBase = 0
      let supplierFreight = 0
      let supplierVat = 0
      let supplierTotal = 0

      rfqItems.forEach(item => {
        const supplierData = item.suppliers[supplier]
        if (supplierData?.available) {
          const qty = parseInt(item.quantity.split(' ')[0])
          supplierBase += supplierData.baseUnitPrice * qty
          supplierFreight += supplierData.freightFee * qty
          supplierVat += supplierData.vat * qty
          supplierTotal += supplierData.totalPrice
        }
      })

      analytics.supplierBreakdown[supplier] = {
        base: supplierBase,
        freight: supplierFreight,
        vat: supplierVat,
        total: supplierTotal,
        freightPercentage: supplierTotal > 0 ? ((supplierFreight / supplierTotal) * 100).toFixed(1) : 0,
        vatPercentage: supplierTotal > 0 ? ((supplierVat / supplierTotal) * 100).toFixed(1) : 0
      }

      analytics.totalBase += supplierBase
      analytics.totalFreight += supplierFreight
      analytics.totalVat += supplierVat
    })

    // Calculate averages
    const validSuppliers = Object.values(analytics.supplierBreakdown).filter(s => s.total > 0)
    analytics.avgFreightPercentage = validSuppliers.length > 0 
      ? (validSuppliers.reduce((sum, s) => sum + parseFloat(s.freightPercentage), 0) / validSuppliers.length).toFixed(1)
      : 0
    analytics.avgVatPercentage = validSuppliers.length > 0 
      ? (validSuppliers.reduce((sum, s) => sum + parseFloat(s.vatPercentage), 0) / validSuppliers.length).toFixed(1)
      : 0

    return analytics
  }

  const costAnalytics = calculateCostComponentAnalytics()

  // Analysis calculations
  const calculateFinalAnalysis = () => {
    const analysis = {}
    
    supplierNames.forEach(supplier => {
      const priceScore = totals[supplier] > 0 ? (lowestBid / totals[supplier]) * 100 : 0
      const qualityScore = questionnaireScores[supplier]?.percentage || 0
      
      // Weighted scoring: Price 60%, Quality 40%
      const normalizedScore = (priceScore * 0.6) + (parseFloat(qualityScore) * 0.4)
      
      analysis[supplier] = {
        totalPrice: totals[supplier],
        priceScore: priceScore.toFixed(1),
        qualityScore: qualityScore,
        normalizedScore: normalizedScore.toFixed(1),
        priceRank: 0,
        qualityRank: 0,
        overallRank: 0,
        negotiationRoom: totals[supplier] > 0 ? (((totals[supplier] - lowestBid) / totals[supplier]) * 100).toFixed(1) : '0',
        potentialSavings: totals[supplier] > 0 ? totals[supplier] - lowestBid : 0
      }
    })

    // Calculate rankings
    const suppliers = Object.keys(analysis).filter(s => analysis[s].totalPrice > 0)
    
    // Price ranking (lower is better)
    suppliers.sort((a, b) => analysis[a].totalPrice - analysis[b].totalPrice)
    suppliers.forEach((supplier, index) => {
      analysis[supplier].priceRank = index + 1
    })
    
    // Quality ranking (higher is better)
    suppliers.sort((a, b) => parseFloat(analysis[b].qualityScore) - parseFloat(analysis[a].qualityScore))
    suppliers.forEach((supplier, index) => {
      analysis[supplier].qualityRank = index + 1
    })
    
    // Overall ranking (higher normalized score is better)
    suppliers.sort((a, b) => parseFloat(analysis[b].normalizedScore) - parseFloat(analysis[a].normalizedScore))
    suppliers.forEach((supplier, index) => {
      analysis[supplier].overallRank = index + 1
    })

    return analysis
  }

  const calculateTheoreticalSavings = () => {
    const savings = {}
    
    rfqItems.forEach(item => {
      const prices = Object.entries(item.suppliers)
        .filter(([_, data]) => data.available && data.totalPrice > 0)
        .map(([supplier, data]) => ({ supplier, price: data.totalPrice }))
      
      if (prices.length > 0) {
        const minPrice = Math.min(...prices.map(p => p.price))
        const bestSupplier = prices.find(p => p.price === minPrice)?.supplier
        
        savings[item.id] = {
          itemName: item.name,
          bestPrice: minPrice,
          bestSupplier: bestSupplier,
          currentPrices: prices,
          potentialSavings: prices.map(p => ({ 
            supplier: p.supplier, 
            savings: p.price - minPrice,
            percentage: p.price > 0 ? (((p.price - minPrice) / p.price) * 100).toFixed(1) : '0'
          }))
        }
      }
    })
    
    return savings
  }

  const finalAnalysis = calculateFinalAnalysis()
  const theoreticalSavings = calculateTheoreticalSavings()

  const filteredAndSortedBids = supplierBids
    .filter(bid => {
      const matchesSearch = bid.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || bid.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.totalPrice - b.totalPrice
        case 'delivery': return parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
        case 'rating': return b.rating - a.rating
        case 'name': return a.supplierName.localeCompare(b.supplierName)
        default: return 0
      }
    })

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">RFQ Dashboard</h1>
                  <p className="text-sm text-gray-500">{currentRfqData.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {!isRfqCompleted ? (
                  <Button 
                    onClick={handleCompleteRFQ}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete RFQ
                  </Button>
                ) : (
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    RFQ Completed
                  </Badge>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4 mr-2" />
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAddOffer}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Offer
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleExportPDF}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportExcel}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Export Excel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleCancelRFQ}
                      className="text-red-600 focus:text-red-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel RFQ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the dashboard content - truncated for brevity but includes all the original functionality */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* RFQ Information Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                RFQ Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{currentRfqData.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{currentRfqData.budget || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{currentRfqData.deadline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className="bg-green-100 text-green-800">{currentRfqData.status}</Badge>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">{currentRfqData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Potential Savings</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(potentialSavings)}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <TrendingDown className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-sm text-gray-900">Potential Savings Explained</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> The difference between the highest and lowest total bids received.</p>
                        <p><strong>Calculation:</strong> Highest Bid ({formatCurrency(highestBid)}) - Lowest Bid ({formatCurrency(lowestBid)})</p>
                        <p><strong>Why it matters:</strong> Shows how much money you could save by choosing the most cost-effective supplier.</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-semibold text-sm">Savings Opportunity</span>
                        </div>
                        <p className="text-green-600 text-xs mt-1">
                          By selecting the lowest bidder, you can save {formatCurrency(potentialSavings)} on this RFQ.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Negotiation Room</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {negotiationRoom}%
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Percent className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Percent className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-sm text-gray-900">Negotiation Room Explained</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> The percentage difference between the highest and lowest bids, indicating negotiation potential.</p>
                        <p><strong>Calculation:</strong> ((Highest Bid - Lowest Bid) / Highest Bid) × 100</p>
                        <p><strong>Why it matters:</strong> Higher percentages suggest more room for price negotiations with suppliers.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Interpretation:</span>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600">&gt;20%: High negotiation potential</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-orange-600">10-20%: Moderate negotiation room</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-red-600">&lt;10%: Limited negotiation space</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Lowest Bid</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(lowestBid)}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-sm text-gray-900">Lowest Bid Explained</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> The most cost-effective total bid amount received from all suppliers.</p>
                        <p><strong>Calculation:</strong> Minimum value among all valid supplier bids</p>
                        <p><strong>Why it matters:</strong> Represents your best pricing option, but consider other factors like quality and delivery time.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-600">Supplier offering lowest bid:</span>
                          <div className="mt-1">
                            {Object.entries(totals).find(([supplier, total]) => total === lowestBid)?.[0] || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Info className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700 font-semibold text-sm">Remember</span>
                        </div>
                        <p className="text-blue-600 text-xs mt-1">
                          Lowest price doesn't always mean best value. Consider quality, delivery time, and supplier reliability.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Average Bid</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(averageBid)}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold text-sm text-gray-900">Average Bid Explained</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> The mean value of all valid bids received, providing a market benchmark.</p>
                        <p><strong>Calculation:</strong> Sum of all valid bids ÷ Number of valid bids</p>
                        <p><strong>Why it matters:</strong> Helps identify if individual bids are above or below market average.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Valid Bids:</span>
                            <div className="font-medium">{validTotals.length}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Value:</span>
                            <div className="font-medium">{formatCurrency(validTotals.reduce((sum, total) => sum + total, 0))}</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-yellow-600" />
                          <span className="text-yellow-700 font-semibold text-sm">Market Insight</span>
                        </div>
                        <p className="text-yellow-600 text-xs mt-1">
                          Bids significantly above average may indicate premium services or overpricing. Bids below average could represent good value or potential quality concerns.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>

          {/* Cost Breakdown Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Avg Freight Cost</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {costAnalytics.avgFreightPercentage}%
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Truck className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-orange-500" />
                        <span className="font-semibold text-sm text-gray-900">Average Freight Cost</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> Average percentage of total cost attributed to freight/shipping across all suppliers.</p>
                        <p><strong>Why it matters:</strong> High freight costs may indicate opportunities for negotiation or local sourcing.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-600">Supplier Breakdown:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(costAnalytics.supplierBreakdown).map(([supplier, data]) => (
                              <div key={supplier} className="flex justify-between text-xs">
                                <span>{supplier}:</span>
                                <span className="font-medium">{data.freightPercentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Avg VAT Cost</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {costAnalytics.avgVatPercentage}%
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Percent className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Percent className="h-4 w-4 text-purple-500" />
                        <span className="font-semibold text-sm text-gray-900">Average VAT Cost</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> Average percentage of total cost attributed to VAT/taxes across all suppliers.</p>
                        <p><strong>Why it matters:</strong> Understanding tax implications helps with budget planning and supplier comparison.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-600">Supplier Breakdown:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(costAnalytics.supplierBreakdown).map(([supplier, data]) => (
                              <div key={supplier} className="flex justify-between text-xs">
                                <span>{supplier}:</span>
                                <span className="font-medium">{data.vatPercentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between cursor-help">
                      <div>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm text-gray-500">Best Base Price</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(Math.min(...Object.values(costAnalytics.supplierBreakdown).filter(s => s.total > 0).map(s => s.base)))}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-sm text-gray-900">Best Base Price</span>
                      </div>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>What it shows:</strong> Lowest total base price (excluding freight and VAT) across all suppliers.</p>
                        <p><strong>Why it matters:</strong> Shows the core product/service cost before additional fees, useful for price negotiations.</p>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-600">Base Price Comparison:</span>
                          <div className="mt-1 space-y-1">
                            {Object.entries(costAnalytics.supplierBreakdown)
                              .filter(([_, data]) => data.total > 0)
                              .sort((a, b) => a[1].base - b[1].base)
                              .map(([supplier, data]) => (
                                <div key={supplier} className="flex justify-between text-xs">
                                  <span>{supplier}:</span>
                                  <span className="font-medium">{formatCurrency(data.base)}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full ${showAnalysis ? 'grid-cols-5' : 'grid-cols-4'}`}>
              <TabsTrigger value="overview" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="items" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Items & Bids
              </TabsTrigger>
              <TabsTrigger value="questionnaire" className="flex items-center">
                <HelpCircle className="h-4 w-4 mr-2" />
                Questionnaire
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Communication
              </TabsTrigger>
              {showAnalysis && (
                <TabsTrigger value="analysis" className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
              )}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Simplified Bids Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Supplier Bids Summary ({filteredAndSortedBids.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Total Price</TableHead>
                          <TableHead>Delivery Time</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAndSortedBids.map((bid) => (
                          <TableRow key={bid.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900">{bid.supplierName}</div>
                                <div className="text-sm text-gray-500">{bid.location}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-semibold text-lg">
                                {bid.totalPrice > 0 ? formatCurrency(bid.totalPrice) : '—'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                                {bid.deliveryTime}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                <span className="font-medium">{bid.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(bid.status)}>
                                {bid.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {bid.submittedDate}
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedBid(bid)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center">
                                      <Building2 className="h-5 w-5 mr-2" />
                                      {bid.supplierName} - Bid Details
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
                                        <p className="text-2xl font-bold text-primary">
                                          {bid.totalPrice > 0 ? formatCurrency(bid.totalPrice) : 'No Bid'}
                                        </p>
                                        <p className="text-sm text-gray-500">Payment Terms: {bid.paymentTerms}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Delivery</h4>
                                        <p className="text-lg font-medium">{bid.deliveryTime}</p>
                                        <p className="text-sm text-gray-500">From: {bid.location}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Company Info</h4>
                                        <div className="space-y-1">
                                          <div className="flex items-center">
                                            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                                            <span>{bid.rating} rating</span>
                                          </div>
                                          <p className="text-sm text-gray-600">{bid.experience} experience</p>
                                          <p className="text-sm text-gray-600">{bid.previousProjects} previous projects</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Warranty & Support</h4>
                                        <p className="text-sm text-gray-600">{bid.warranty} warranty</p>
                                        <div className="mt-2">
                                          <p className="text-sm font-medium text-gray-700">Certifications:</p>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {bid.certifications.map((cert, index) => (
                                              <Badge key={index} variant="outline" className="text-xs">
                                                {cert}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3 pt-4 border-t">
                                      <Button variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download Proposal
                                      </Button>
                                      <Button>
                                        Contact Supplier
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Items & Bids Tab */}
            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Items & Supplier Bids
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleExportExcel}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {Object.entries(groupedItems).map(([category, categoryItems]) => {
                      const categoryTotals = calculateCategoryTotals(categoryItems)
                      
                      return (
                        <div key={category} className="space-y-4">
                          {/* Category Header */}
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-500">
                                {categoryItems.length} item{categoryItems.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>

                          {/* Items Table */}
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-80">Item Details</TableHead>
                                  {supplierNames.map(supplier => (
                                    <TableHead key={supplier} className="text-center min-w-64">
                                      <SupplierTooltip supplierName={supplier}>
                                        <div className="cursor-help">
                                          <div className="font-medium">{supplier}</div>
                                          <div className="text-xs text-gray-500">Base + Freight + VAT = Unit | Total</div>
                                        </div>
                                      </SupplierTooltip>
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {categoryItems.map((item) => {
                                  const unitStats = calculatePriceStats(item.id, 'unitPrice')
                                  const totalStats = calculatePriceStats(item.id, 'totalPrice')
                                  
                                  return (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                      <TableCell className="font-medium">
                                        <ItemTooltip item={item}>
                                          <div className="cursor-help">
                                            <div className="font-semibold text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-600">{item.description}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                              Qty: {item.quantity}
                                            </div>
                                          </div>
                                        </ItemTooltip>
                                      </TableCell>
                                      {supplierNames.map(supplier => {
                                        const supplierData = item.suppliers[supplier]
                                        const unitPriceClass = getPriceColorClass(supplierData?.unitPrice || 0, unitStats)
                                        const totalPriceClass = getPriceColorClass(supplierData?.totalPrice || 0, totalStats)
                                        
                                        return (
                                          <TableCell key={supplier} className="text-center">
                                            {supplierData?.available ? (
                                              <div className="space-y-3">
                                                {/* Price Breakdown */}
                                                <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Base:</span>
                                                    <span className="font-medium">{formatCurrency(supplierData.baseUnitPrice)}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Freight:</span>
                                                    <span className="font-medium">{formatCurrency(supplierData.freightFee)}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">VAT:</span>
                                                    <span className="font-medium">{formatCurrency(supplierData.vat)}</span>
                                                  </div>
                                                  <div className="border-t pt-1 flex justify-between font-semibold">
                                                    <span>Unit Price:</span>
                                                    <span>{formatCurrency(supplierData.unitPrice)}</span>
                                                  </div>
                                                </div>
                                                
                                                <PriceTooltip 
                                                  itemId={item.id} 
                                                  supplierName={supplier} 
                                                  priceType="totalPrice" 
                                                  price={supplierData.totalPrice}
                                                >
                                                  <div className={`p-2 rounded cursor-help ${totalPriceClass}`}>
                                                    <div className="font-bold text-lg">
                                                      {formatCurrency(supplierData.totalPrice)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">total</div>
                                                  </div>
                                                </PriceTooltip>
                                              </div>
                                            ) : (
                                              <div className="text-gray-400 text-sm">
                                                Not Available
                                              </div>
                                            )}
                                          </TableCell>
                                        )
                                      })}
                                    </TableRow>
                                  )
                                })}
                                
                                {/* Category Totals Row */}
                                <TableRow className="bg-gray-100 font-semibold">
                                  <TableCell className="font-bold">
                                    {category} Subtotal
                                  </TableCell>
                                  {supplierNames.map(supplier => (
                                    <TableCell key={supplier} className="text-center">
                                      <div className="text-lg font-bold text-primary">
                                        {formatCurrency(categoryTotals[supplier])}
                                      </div>
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )
                    })}

                    {/* Additional Rows */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900">Additional Terms</h3>
                      </div>

                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-80">Term</TableHead>
                              {supplierNames.map(supplier => (
                                <TableHead key={supplier} className="text-center min-w-48">
                                  {supplier}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {additionalRows.map((row) => (
                              <TableRow key={row.id} className="hover:bg-gray-50">
                                <TableCell className="font-medium">
                                  {row.name}
                                </TableCell>
                                {supplierNames.map(supplier => {
                                  const supplierData = row.suppliers[supplier]
                                  
                                  return (
                                    <TableCell key={supplier} className="text-center">
                                      {row.type === 'status' ? (
                                        <Badge className={
                                          supplierData?.status === 'approved' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }>
                                          {supplierData?.value || '—'}
                                        </Badge>
                                      ) : (
                                        <span className="font-medium">
                                          {supplierData?.value || '—'}
                                        </span>
                                      )}
                                    </TableCell>
                                  )
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Grand Totals */}
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableBody>
                            <TableRow className="bg-primary/10 font-bold text-lg">
                              <TableCell className="font-bold text-primary">
                                GRAND TOTAL
                              </TableCell>
                              {supplierNames.map(supplier => (
                                <TableCell key={supplier} className="text-center">
                                  <div className="text-2xl font-bold text-primary">
                                    {formatCurrency(totals[supplier])}
                                  </div>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Questionnaire Tab */}
            <TabsContent value="questionnaire" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2" />
                      Supplier Questionnaire & Evaluation
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Scoring
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Scoring Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {supplierNames.map(supplier => {
                        const scores = questionnaireScores[supplier]
                        const scoreClass = getScoreColorClass(scores.totalScore, questionnaireScores)
                        
                        return (
                          <Card key={supplier} className={`${scoreClass} border-2`}>
                            <CardContent className="pt-6">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="text-center cursor-help">
                                    <div className="flex items-center justify-center space-x-1 mb-2">
                                      <h3 className="font-semibold text-lg">{supplier}</h3>
                                      <HelpCircle className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <div className="text-3xl font-bold mb-1">
                                      {scores.totalScore}/{scores.maxPossibleScore}
                                    </div>
                                    <div className="text-sm opacity-75">
                                      {scores.percentage}% Score
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="p-4 max-w-sm bg-white border shadow-lg">
                                  <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                      <Award className="h-4 w-4 text-blue-500" />
                                      <span className="font-semibold text-sm text-gray-900">Questionnaire Score Breakdown</span>
                                    </div>
                                    <div className="text-sm text-gray-700 space-y-2">
                                      <p><strong>Total Score:</strong> {scores.totalScore} out of {scores.maxPossibleScore} points</p>
                                      <p><strong>Percentage:</strong> {scores.percentage}% completion rate</p>
                                      <p><strong>How it's calculated:</strong> Sum of all question scores divided by maximum possible points</p>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="text-sm">
                                        <span className="font-medium text-gray-600">Score Components:</span>
                                        <div className="mt-1 space-y-1 text-xs">
                                          <div>• Auto-scored questions: System evaluated</div>
                                          <div>• Manual questions: Require your input</div>
                                          <div>• Unanswered questions: 0 points</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={`rounded-lg p-3 ${
                                      scores.totalScore === Math.max(...Object.values(questionnaireScores).map(s => s.totalScore))
                                        ? 'bg-green-50 border border-green-200'
                                        : scores.totalScore === Math.min(...Object.values(questionnaireScores).map(s => s.totalScore))
                                        ? 'bg-red-50 border border-red-200'
                                        : 'bg-blue-50 border border-blue-200'
                                    }`}>
                                      <div className="flex items-center space-x-2">
                                        {scores.totalScore === Math.max(...Object.values(questionnaireScores).map(s => s.totalScore)) && (
                                          <>
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-green-700 font-semibold text-sm">Highest Score</span>
                                          </>
                                        )}
                                        {scores.totalScore === Math.min(...Object.values(questionnaireScores).map(s => s.totalScore)) && (
                                          <>
                                            <AlertTriangle className="h-4 w-4 text-red-600" />
                                            <span className="text-red-700 font-semibold text-sm">Lowest Score</span>
                                          </>
                                        )}
                                        {scores.totalScore !== Math.max(...Object.values(questionnaireScores).map(s => s.totalScore)) && 
                                         scores.totalScore !== Math.min(...Object.values(questionnaireScores).map(s => s.totalScore)) && (
                                          <>
                                            <Target className="h-4 w-4 text-blue-600" />
                                            <span className="text-blue-700 font-semibold text-sm">Competitive Score</span>
                                          </>
                                        )}
                                      </div>
                                      <p className={`text-xs mt-1 ${
                                        scores.totalScore === Math.max(...Object.values(questionnaireScores).map(s => s.totalScore))
                                          ? 'text-green-600'
                                          : scores.totalScore === Math.min(...Object.values(questionnaireScores).map(s => s.totalScore))
                                          ? 'text-red-600'
                                          : 'text-blue-600'
                                      }`}>
                                        {scores.totalScore === Math.max(...Object.values(questionnaireScores).map(s => s.totalScore)) && 
                                         'This supplier has the best questionnaire performance.'}
                                        {scores.totalScore === Math.min(...Object.values(questionnaireScores).map(s => s.totalScore)) && 
                                         'This supplier has the lowest questionnaire score.'}
                                        {scores.totalScore !== Math.max(...Object.values(questionnaireScores).map(s => s.totalScore)) && 
                                         scores.totalScore !== Math.min(...Object.values(questionnaireScores).map(s => s.totalScore)) && 
                                         'This supplier has a competitive questionnaire score.'}
                                      </p>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>

                    {/* Questions Table */}
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-96">Question</TableHead>
                            <TableHead className="text-center">Max Score</TableHead>
                            {supplierNames.map(supplier => (
                              <TableHead key={supplier} className="text-center min-w-64">
                                {supplier}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {questionnaireData.map((question) => (
                            <TableRow key={question.id} className="hover:bg-gray-50">
                              <TableCell className="font-medium">
                                <div>
                                  <div className="font-semibold text-gray-900 mb-1">
                                    {question.question}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {question.autoScored ? (
                                      <Badge variant="outline" className="text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Auto-scored
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600">
                                        <User className="h-3 w-3 mr-1" />
                                        Manual scoring
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="font-bold text-lg text-primary">
                                  {question.maxScore}
                                </div>
                              </TableCell>
                              {supplierNames.map(supplier => {
                                const supplierData = question.suppliers[supplier]
                                const manualScoreKey = `${question.id}-${supplier}`
                                const isHighest = isHighestScoreForQuestion(question.id, supplier)
                                
                                return (
                                  <TableCell key={supplier} className="text-center">
                                    <div className="space-y-3">
                                      {/* Answer */}
                                      <div className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                                        {supplierData.answer}
                                      </div>
                                      
                                      {/* Score */}
                                      <div className="flex items-center justify-center space-x-2">
                                        {question.autoScored ? (
                                          <div className={`px-3 py-1 rounded font-bold ${
                                            isHighest 
                                              ? 'bg-green-100 text-green-700 border-2 border-green-400' 
                                              : 'bg-blue-100 text-blue-700'
                                          }`}>
                                            {supplierData.score}/{question.maxScore}
                                          </div>
                                        ) : (
                                          <div className="flex items-center space-x-2">
                                            <Input
                                              type="number"
                                              min="0"
                                              max={question.maxScore}
                                              placeholder="Score"
                                              value={manualScores[manualScoreKey] || ''}
                                              onChange={(e) => handleManualScore(question.id, supplier, parseInt(e.target.value) || 0)}
                                              className="w-20 text-center"
                                            />
                                            <span className="text-sm text-gray-500">
                                              /{question.maxScore}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Evaluation Summary */}
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-2">Evaluation Summary</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                              <p>• Questions with auto-scoring are evaluated based on predefined criteria</p>
                              <p>• Manual scoring questions require your input to complete the evaluation</p>
                              <p>• Highest scores in each category are highlighted in green</p>
                              <p>• Use the scoring to help make your final supplier selection decision</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Communication Tab - keeping existing content */}
            <TabsContent value="communication" className="space-y-6">
              {/* Communication content would go here - keeping existing implementation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Communication Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Communication features would be implemented here...</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            {showAnalysis && (
              <TabsContent value="analysis" className="space-y-6">
                {/* Final Analysis Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 mr-2" />
                        Final Analysis & Results
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        RFQ Completed
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Best and Worst Results */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Best Result */}
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="p-2 bg-green-100 rounded-full">
                                <Award className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-green-800">Best Overall Value</h3>
                                <p className="text-sm text-green-600">Highest normalized score</p>
                              </div>
                            </div>
                            {(() => {
                              const bestSupplier = Object.entries(finalAnalysis)
                                .filter(([_, data]) => data.totalPrice > 0)
                                .sort((a, b) => parseFloat(b[1].normalizedScore) - parseFloat(a[1].normalizedScore))[0]
                              
                              if (!bestSupplier) return <p>No valid bids</p>
                              
                              const [supplierName, data] = bestSupplier
                              return (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-green-800">{supplierName}</span>
                                    <Badge className="bg-green-200 text-green-800">
                                      Rank #{data.overallRank}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-green-600">Total Price:</span>
                                      <div className="font-semibold">{formatCurrency(data.totalPrice)}</div>
                                    </div>
                                    <div>
                                      <span className="text-green-600">Normalized Score:</span>
                                      <div className="font-semibold">{data.normalizedScore}/100</div>
                                    </div>
                                    <div>
                                      <span className="text-green-600">Price Score:</span>
                                      <div className="font-semibold">{data.priceScore}/100</div>
                                    </div>
                                    <div>
                                      <span className="text-green-600">Quality Score:</span>
                                      <div className="font-semibold">{data.qualityScore}%</div>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-green-200">
                                    <Button 
                                      className="w-full bg-green-600 hover:bg-green-700"
                                      onClick={() => setSelectedWinner(supplierName)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Select as Winner
                                    </Button>
                                  </div>
                                </div>
                              )
                            })()}
                          </CardContent>
                        </Card>

                        {/* Worst Result */}
                        <Card className="bg-red-50 border-red-200">
                          <CardContent className="pt-6">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="p-2 bg-red-100 rounded-full">
                                <XCircle className="h-6 w-6 text-red-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-red-800">Lowest Performing</h3>
                                <p className="text-sm text-red-600">Lowest normalized score</p>
                              </div>
                            </div>
                            {(() => {
                              const worstSupplier = Object.entries(finalAnalysis)
                                .filter(([_, data]) => data.totalPrice > 0)
                                .sort((a, b) => parseFloat(a[1].normalizedScore) - parseFloat(b[1].normalizedScore))[0]
                              
                              if (!worstSupplier) return <p>No valid bids</p>
                              
                              const [supplierName, data] = worstSupplier
                              return (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-red-800">{supplierName}</span>
                                    <Badge className="bg-red-200 text-red-800">
                                      Rank #{data.overallRank}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-red-600">Total Price:</span>
                                      <div className="font-semibold">{formatCurrency(data.totalPrice)}</div>
                                    </div>
                                    <div>
                                      <span className="text-red-600">Normalized Score:</span>
                                      <div className="font-semibold">{data.normalizedScore}/100</div>
                                    </div>
                                    <div>
                                      <span className="text-red-600">Price Score:</span>
                                      <div className="font-semibold">{data.priceScore}/100</div>
                                    </div>
                                    <div>
                                      <span className="text-red-600">Quality Score:</span>
                                      <div className="font-semibold">{data.qualityScore}%</div>
                                    </div>
                                  </div>
                                  <div className="pt-3 border-t border-red-200">
                                    <div className="text-xs text-red-600">
                                      Potential savings vs best: {formatCurrency(data.potentialSavings)}
                                    </div>
                                  </div>
                                </div>
                              )
                            })()}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Cost Breakdown Analysis */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Calculator className="h-5 w-5 mr-2" />
                            Cost Component Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Supplier</TableHead>
                                  <TableHead className="text-center">Base Cost</TableHead>
                                  <TableHead className="text-center">Freight Cost</TableHead>
                                  <TableHead className="text-center">VAT Cost</TableHead>
                                  <TableHead className="text-center">Total Cost</TableHead>
                                  <TableHead className="text-center">Freight %</TableHead>
                                  <TableHead className="text-center">VAT %</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(costAnalytics.supplierBreakdown)
                                  .filter(([_, data]) => data.total > 0)
                                  .sort((a, b) => a[1].total - b[1].total)
                                  .map(([supplier, data]) => (
                                    <TableRow key={supplier} className="hover:bg-gray-50">
                                      <TableCell className="font-medium">{supplier}</TableCell>
                                      <TableCell className="text-center font-semibold">
                                        {formatCurrency(data.base)}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="space-y-1">
                                          <div className="font-medium text-orange-600">
                                            {formatCurrency(data.freight)}
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="space-y-1">
                                          <div className="font-medium text-purple-600">
                                            {formatCurrency(data.vat)}
                                          </div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center font-bold text-lg">
                                        {formatCurrency(data.total)}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge className="bg-orange-100 text-orange-800">
                                          {data.freightPercentage}%
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge className="bg-purple-100 text-purple-800">
                                          {data.vatPercentage}%
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Comprehensive Analysis Table */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2" />
                            Pre-Normalized vs Normalized Scores
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Supplier</TableHead>
                                  <TableHead className="text-center">Total Price</TableHead>
                                  <TableHead className="text-center">
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex items-center justify-center space-x-1">
                                          <span>Pre-Normalized</span>
                                          <HelpCircle className="h-3 w-3" />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Raw scores before normalization</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TableHead>
                                  <TableHead className="text-center">
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex items-center justify-center space-x-1">
                                          <span>Normalized Score</span>
                                          <HelpCircle className="h-3 w-3" />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Weighted score: Price (60%) + Quality (40%)</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TableHead>
                                  <TableHead className="text-center">Price Rank</TableHead>
                                  <TableHead className="text-center">Quality Rank</TableHead>
                                  <TableHead className="text-center">Overall Rank</TableHead>
                                  <TableHead className="text-center">Negotiation Room</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(finalAnalysis)
                                  .filter(([_, data]) => data.totalPrice > 0)
                                  .sort((a, b) => a[1].overallRank - b[1].overallRank)
                                  .map(([supplier, data]) => (
                                    <TableRow key={supplier} className={`hover:bg-gray-50 ${
                                      data.overallRank === 1 ? 'bg-green-50 border-l-4 border-green-400' : ''
                                    }`}>
                                      <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
                                          <span>{supplier}</span>
                                          {data.overallRank === 1 && (
                                            <Badge className="bg-green-100 text-green-800">
                                              <Award className="h-3 w-3 mr-1" />
                                              Best Value
                                            </Badge>
                                          )}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center font-semibold">
                                        {formatCurrency(data.totalPrice)}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="space-y-1">
                                          <div className="text-sm">Price: {data.priceScore}/100</div>
                                          <div className="text-sm">Quality: {data.qualityScore}%</div>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                                          data.overallRank === 1 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-blue-100 text-blue-800'
                                        }`}>
                                          {data.normalizedScore}/100
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge variant={data.priceRank === 1 ? 'default' : 'outline'}>
                                          #{data.priceRank}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge variant={data.qualityRank === 1 ? 'default' : 'outline'}>
                                          #{data.qualityRank}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge variant={data.overallRank === 1 ? 'default' : 'outline'}>
                                          #{data.overallRank}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <div className="space-y-1">
                                          <div className="font-semibold text-orange-600">
                                            {data.negotiationRoom}%
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {formatCurrency(data.potentialSavings)}
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Theoretical Savings Table */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Calculator className="h-5 w-5 mr-2" />
                            Theoretical Savings Analysis
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Savings if you select the best price for each individual item</p>
                              </TooltipContent>
                            </Tooltip>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {/* Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                      {formatCurrency(
                                        Object.values(theoreticalSavings).reduce((sum, item) => sum + item.bestPrice, 0)
                                      )}
                                    </div>
                                    <div className="text-sm text-blue-600">Best Possible Total</div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-green-50 border-green-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                      {formatCurrency(
                                        Object.values(theoreticalSavings).reduce((sum, item) => {
                                          const maxSavings = Math.max(...item.potentialSavings.map(p => p.savings))
                                          return sum + maxSavings
                                        }, 0)
                                      )}
                                    </div>
                                    <div className="text-sm text-green-600">Maximum Savings</div>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="bg-orange-50 border-orange-200">
                                <CardContent className="pt-4">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600">
                                      {(
                                        (Object.values(theoreticalSavings).reduce((sum, item) => {
                                          const maxSavings = Math.max(...item.potentialSavings.map(p => p.savings))
                                          return sum + maxSavings
                                        }, 0) / 
                                        Object.values(theoreticalSavings).reduce((sum, item) => {
                                          const maxPrice = Math.max(...item.currentPrices.map(p => p.price))
                                          return sum + maxPrice
                                        }, 0)) * 100
                                      ).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-orange-600">Savings Percentage</div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="overflow-x-auto">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead className="text-center">Best Price</TableHead>
                                    <TableHead className="text-center">Best Supplier</TableHead>
                                    <TableHead className="text-center">Potential Savings by Supplier</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {Object.values(theoreticalSavings).map((item) => (
                                    <TableRow key={item.itemName} className="hover:bg-gray-50">
                                      <TableCell className="font-medium">{item.itemName}</TableCell>
                                      <TableCell className="text-center font-semibold text-green-600">
                                        {formatCurrency(item.bestPrice)}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Badge className="bg-green-100 text-green-800">
                                          {item.bestSupplier}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <div className="space-y-1">
                                          {item.potentialSavings
                                            .filter(p => p.savings > 0)
                                            .map((saving) => (
                                              <div key={saving.supplier} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">{saving.supplier}:</span>
                                                <div className="flex items-center space-x-2">
                                                  <span className="font-medium text-orange-600">
                                                    {formatCurrency(saving.savings)}
                                                  </span>
                                                  <span className="text-xs text-gray-500">
                                                    ({saving.percentage}%)
                                                  </span>
                                                </div>
                                              </div>
                                            ))}
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Action Buttons */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Settings className="h-5 w-5 mr-2" />
                            Next Steps & Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Button 
                              className="flex items-center justify-center space-x-2"
                              onClick={() => {
                                const bestSupplier = Object.entries(finalAnalysis)
                                  .filter(([_, data]) => data.totalPrice > 0)
                                  .sort((a, b) => parseFloat(b[1].normalizedScore) - parseFloat(a[1].normalizedScore))[0]
                                if (bestSupplier) {
                                  setSelectedWinner(bestSupplier[0])
                                  alert(`${bestSupplier[0]} selected as winner!`)
                                }
                              }}
                            >
                              <Award className="h-4 w-4" />
                              <span>Award Contract</span>
                            </Button>
                            
                            <Button variant="outline" className="flex items-center justify-center space-x-2">
                              <Send className="h-4 w-4" />
                              <span>Request Revised Bids</span>
                            </Button>
                            
                            <Button variant="outline" className="flex items-center justify-center space-x-2">
                              <Megaphone className="h-4 w-4" />
                              <span>Post Announcement</span>
                            </Button>
                            
                            <Button variant="outline" className="flex items-center justify-center space-x-2">
                              <UserPlus className="h-4 w-4" />
                              <span>Remove Supplier</span>
                            </Button>
                          </div>
                          
                          {selectedWinner && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="font-medium text-green-800">
                                  Selected Winner: {selectedWinner}
                                </span>
                              </div>
                              <p className="text-sm text-green-600 mt-1">
                                Contract award process can now be initiated with the selected supplier.
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default RFQDashboard