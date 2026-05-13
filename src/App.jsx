import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {
  AdminFraudInvestigation,
  AdminGlobalOverview,
  BillPayments,
  CardManagement,
  Consent,
  ContactVerify,
  Credentials,
  IdentityInfo,
  KYCUpload,
  LoansCredit,
  OnboardingSuccess,
  SavingsInvestments,
  SecurityAnalytics,
  TransferHub,
  TxHistory,
} from './pages/OtherPages.jsx'

const TopNav = () => (
  <nav className="sticky top-0 z-10 border-b border-sand-300 bg-cream-50/90 px-4 py-3 backdrop-blur">
    <div className="mx-auto flex max-w-6xl flex-wrap gap-3 text-xs text-charcoal-700">
      <Link to="/">Landing</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/admin/global-overview">Admin</Link>
    </div>
  </nav>
)

function App() {
  return (
    <div className="min-h-screen bg-sand-50">
      <TopNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/identity-info" element={<IdentityInfo />} />
        <Route path="/contact-verify" element={<ContactVerify />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/kyc-upload" element={<KYCUpload />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/onboarding-success" element={<OnboardingSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer-hub" element={<TransferHub />} />
        <Route path="/bill-payments" element={<BillPayments />} />
        <Route path="/card-management" element={<CardManagement />} />
        <Route path="/loans-credit" element={<LoansCredit />} />
        <Route path="/savings-investments" element={<SavingsInvestments />} />
        <Route path="/tx-history" element={<TxHistory />} />
        <Route path="/security-analytics" element={<SecurityAnalytics />} />
        <Route path="/admin/global-overview" element={<AdminGlobalOverview />} />
        <Route path="/admin/fraud-investigation" element={<AdminFraudInvestigation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
