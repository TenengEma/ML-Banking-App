import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'

const Placeholder = ({ title, subtitle, nextPath }) => (
  <PageShell title={title} subtitle={subtitle}>
    <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-soft">
      <p className="text-sm text-charcoal-700">Scaffold complete. This page is wired into routing/state and ready for feature implementation.</p>
      {nextPath ? <Link className="mt-4 inline-flex rounded-lg bg-terracotta-600 px-4 py-2 text-xs font-medium text-cream-50" to={nextPath}>Continue</Link> : null}
    </div>
  </PageShell>
)

export const IdentityInfo = () => <Placeholder title="Identity Information" subtitle="Collect first name, last name, date of birth, and national ID." nextPath="/contact-verify" />
export const ContactVerify = () => <Placeholder title="Contact Verification" subtitle="OTP verification for phone and email channels." nextPath="/credentials" />
export const Credentials = () => <Placeholder title="Create Credentials" subtitle="Secure password and PIN setup with strength meters." nextPath="/kyc-upload" />
export const KYCUpload = () => <Placeholder title="KYC Upload" subtitle="ID front/back upload and selfie capture workflow." nextPath="/consent" />
export const Consent = () => <Placeholder title="Consent and Permissions" subtitle="Terms, privacy consent, and hidden telemetry acknowledgment." nextPath="/onboarding-success" />

export const OnboardingSuccess = () => (
  <PageShell title="Onboarding Complete" subtitle="Account created successfully.">
    <div className="rounded-2xl border border-sand-300 bg-white p-6 text-center shadow-soft">
      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-600 text-xl font-bold text-cream-50">TE</div>
      <p className="text-sm text-charcoal-700">Bank Logo • Your account number: <span className="font-semibold text-charcoal-900">0172-8841-9021</span></p>
      <Link className="mt-5 inline-flex rounded-lg bg-terracotta-600 px-4 py-2 text-xs font-medium text-cream-50" to="/dashboard">Go to dashboard</Link>
    </div>
  </PageShell>
)

export const TransferHub = () => <Placeholder title="Transfer Hub" subtitle="Step wizard: Who → How much → Review." />
export const BillPayments = () => <Placeholder title="Bill Payments" subtitle="Pay utility, tax, and merchant categories." />
export const CardManagement = () => <Placeholder title="Card Management" subtitle="3D card controls including freeze/unfreeze and PIN toggle." />
export const LoansCredit = () => <Placeholder title="Loans & Credit" subtitle="Application and restructuring workflows." />
export const SavingsInvestments = () => <Placeholder title="Savings & Investments" subtitle="Fixed deposits and goal buckets." />
export const TxHistory = () => <Placeholder title="Transaction History" subtitle="Filterable ledger and merchant logos." />
export const SecurityAnalytics = () => <Placeholder title="Security & Analytics" subtitle="Login alerts, donut spending charts, and notification center." />
export const AdminGlobalOverview = () => <Placeholder title="Admin Global Overview" subtitle="Real-time transaction feed and system health via websockets." />
export const AdminFraudInvestigation = () => <Placeholder title="Fraud Investigation" subtitle="ML alert queue, explainable reasons, and network graph visualizer." />
