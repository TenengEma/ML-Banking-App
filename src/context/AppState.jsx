import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppStateContext = createContext(null)

const getDeviceId = () => {
  const stored = localStorage.getItem('banking_device_id')
  if (stored) return stored
  const created = crypto.randomUUID()
  localStorage.setItem('banking_device_id', created)
  return created
}

export const AppStateProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ firstName: 'Amara' })
  const [telemetry, setTelemetry] = useState({
    deviceId: getDeviceId(),
    mouseTrail: [],
    typingCadence: {},
    lastLoginAt: new Date().toISOString(),
  })

  useEffect(() => {
    const onMove = (event) => {
      setTelemetry((prev) => ({
        ...prev,
        mouseTrail: [...prev.mouseTrail.slice(-30), { x: event.clientX, y: event.clientY, t: Date.now() }],
      }))
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const recordTypingCadence = (field, timestamp = Date.now()) => {
    setTelemetry((prev) => {
      const previous = prev.typingCadence[field]
      const interval = previous?.lastKeyAt ? timestamp - previous.lastKeyAt : 0
      return {
        ...prev,
        typingCadence: {
          ...prev.typingCadence,
          [field]: {
            samples: [...(previous?.samples || []), interval].slice(-20),
            lastKeyAt: timestamp,
          },
        },
      }
    })
  }

  const value = useMemo(
    () => ({ currentUser, setCurrentUser, telemetry, recordTypingCadence }),
    [currentUser, telemetry],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => {
  const context = useContext(AppStateContext)
  if (!context) throw new Error('useAppState must be used inside AppStateProvider')
  return context
}
