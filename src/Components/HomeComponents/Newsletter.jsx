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
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
          Stay Connected with OFD
        </h2>
        
        <p className="text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
          Join our newsletter to get updates on our programs, real impact stories from the communities we serve, new opportunities, and ways you can support or get involved.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'success' && (
          <p className="text-green-600 font-medium mb-4">Successfully subscribed! Thank you for joining our newsletter.</p>
        )}
        {status === 'already_subscribed' && (
          <p className="text-blue-600 font-medium mb-4">You are already subscribed to our newsletter.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 font-medium mb-4">Something went wrong. Please try again.</p>
        )}
        
        <p className="text-sm text-gray-600">
          We value your privacy - your email stays secure and you'll only hear from us about meaningful updates.
        </p>
      </div>
    </section>
  )
}

export default Newsletter