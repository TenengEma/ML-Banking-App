import { Bell, PiggyBank, Wallet, Clock3 } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import { useAppState } from '../context/AppState.jsx'

const Dashboard = () => {
  const { currentUser, telemetry } = useAppState()

  return (
    <PageShell
      title={`Good day, ${currentUser.firstName}`}
      subtitle="Your accounts are monitored continuously through behavioral and transactional analytics."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-sand-300 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between text-charcoal-700"><span>Wallet Balance</span><Wallet size={18} /></div>
          <p className="text-2xl font-semibold text-charcoal-900">$12,480.25</p>
        </article>
        <article className="rounded-2xl border border-sand-300 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between text-charcoal-700"><span>Savings Balance</span><PiggyBank size={18} /></div>
          <p className="text-2xl font-semibold text-charcoal-900">$32,900.10</p>
        </article>
        <article className="rounded-2xl border border-sand-300 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between text-charcoal-700"><span>Last Login</span><Clock3 size={18} /></div>
          <p className="text-sm text-charcoal-800">{new Date(telemetry.lastLoginAt).toLocaleString()}</p>
        </article>
      </section>

      <section className="mt-6 rounded-2xl border border-sand-300 bg-cream-100 p-5 shadow-soft">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-charcoal-900"><Bell size={18} /> Notification Center</h2>
        <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
          <li>• New sign-in from your trusted device completed safely.</li>
          <li>• Spending analytics refreshed with last 24-hour activity.</li>
          <li>• Transfer limits unchanged and monitored by fraud intelligence.</li>
        </ul>
      </section>
    </PageShell>
  )
}

export default Dashboard
