import React, { useState } from 'react'
import ApiService from '../../services/api'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await ApiService.subscribeToNewsletter(email)
      if (response.message === 'Already subscribed') {
        setStatus('already_subscribed')
      } else {
        setStatus('success')
      }
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-neutral-50 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand mb-6">
          Stay Connected with OFD
        </h2>
        
        <p className="text-neutral-700 leading-relaxed mb-8 max-w-2xl mx-auto">
          Join our newsletter to get updates on our programs, real impact stories from the communities we serve, new opportunities, and ways you can support or get involved.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="min-w-0 flex-1 px-4 py-3 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 bg-brand text-white font-medium rounded-card hover:bg-brand-hover transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <p role="status" className="text-neutral-700 font-medium mb-4">Successfully subscribed! Thank you for joining our newsletter.</p>
        )}
        {status === 'already_subscribed' && (
          <p role="status" className="text-neutral-700 font-medium mb-4">You are already subscribed to our newsletter.</p>
        )}
        {status === 'error' && (
          <p role="status" className="text-brand font-medium mb-4">Something went wrong. Please try again.</p>
        )}
        
        <p className="text-sm text-neutral-600">
          We value your privacy - your email stays secure and you'll only hear from us about meaningful updates.
        </p>
      </div>
    </section>
  )
}

export default Newsletter