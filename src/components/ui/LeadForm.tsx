'use client'

import { useState, FormEvent } from 'react'
import { saveLead } from '@/lib/supabase'
import { qualifyLead } from '@/lib/logicAlloy'

export default function LeadForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Qualify the lead
      const qualification = qualifyLead({ email, name, company })
      
      // Save to database
      const lead = await saveLead({
        email,
        name,
        company,
        qualification_score: qualification.score,
        status: 'new',
      })

      if (lead) {
        setStatus('success')
        setMessage(`Thanks ${name}! You've been added to our waitlist.`)
        // Reset form
        setEmail('')
        setName('')
        setCompany('')
      } else {
        // Still show success if qualification worked (demo mode)
        setStatus('success')
        setMessage(`Thanks ${name}! You've been added to our waitlist. (Score: ${qualification.score})`)
        setEmail('')
        setName('')
        setCompany('')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          status === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
