import { ShieldCheck, Smartphone, Fingerprint } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import { useAppState } from '../context/AppState.jsx'

const Login = () => {
  const navigate = useNavigate()
  const { telemetry, recordTypingCadence } = useAppState()
  const [identifier, setIdentifier] = useState('')

  const typingStrength = useMemo(() => {
    const samples = telemetry.typingCadence.identifier?.samples?.filter(Boolean) || []
    if (!samples.length) return 'Collecting typing rhythm...'
    const average = Math.round(samples.reduce((a, b) => a + b, 0) / samples.length)
    if (average < 120) return 'Fast cadence pattern recognized'
    if (average < 260) return 'Balanced cadence pattern recognized'
    return 'Deliberate cadence pattern recognized'
  }, [telemetry.typingCadence.identifier])

  const submit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <PageShell
      title="Welcome back"
      subtitle="Use your email or phone. Device and behavioral signals secure every session silently."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="rounded-2xl border border-sand-300 bg-white p-6 shadow-soft">
          <label htmlFor="identifier" className="mb-2 block text-sm font-medium text-charcoal-800">Email or phone</label>
          <input
            id="identifier"
            required
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            onKeyDown={() => recordTypingCadence('identifier')}
            placeholder="you@example.com or +1 555..."
            className="w-full rounded-lg border border-sand-400 px-4 py-3 text-sm focus:border-terracotta-500 focus:outline-none"
          />
          <button type="submit" className="mt-4 w-full rounded-lg bg-terracotta-600 px-4 py-3 text-sm font-medium text-cream-50">
            Continue with passkey vibe
          </button>
          <p className="mt-3 text-xs text-charcoal-600">{typingStrength}</p>
        </form>

        <aside className="rounded-2xl border border-sand-300 bg-cream-100 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-charcoal-900">Invisible security signals</h2>
          <ul className="mt-4 space-y-3 text-sm text-charcoal-700">
            <li className="flex items-center gap-2"><Fingerprint size={16} /> Biometric-ready authentication experience</li>
            <li className="flex items-center gap-2"><Smartphone size={16} /> Device fingerprint: {telemetry.deviceId.slice(0, 8)}...</li>
            <li className="flex items-center gap-2"><ShieldCheck size={16} /> Session shielded by adaptive risk scoring</li>
          </ul>
        </aside>
      </div>
    </PageShell>
  )
}

export default Login
