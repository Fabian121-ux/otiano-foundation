import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../GeneralComponents/Navbar'
import SEO from '../GeneralComponents/SEO'
import ApiService, { getImageUrl } from '../../services/api'

function SingleEvent() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitMessage('')
    
    try {
      await ApiService.registerForEvent(id, formData)
      setSubmitMessage('Registration successful! Thank you for registering.')
      setShowForm(false)
      setFormData({ name: '', email: '', phone: '', organization: '', position: '' })
    } catch {
      setSubmitMessage('Registration failed. Please try again or contact support.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await ApiService.getEventById(id)
        setEvent(response.data)
      } catch (err) {
        setError('Failed to load event')
        console.error('Error fetching event:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading event...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Event not found</h1>
            <Link to="/events" className="text-brand hover:text-brand">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {event && (
        <SEO 
          title={event.title}
          description={event.description.substring(0, 160) + '...'}
          keywords={`Otinao Foundation for Development events, ${event.title}, community events, Nigeria foundation, ${event.location}`}
          image={getImageUrl(event.image)}
          type="event"
        />
      )}
      <Navbar />
      
      {/* Breadcrumb Section */}
      <section className="bg-neutral-50 pb-8 pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-neutral-600 mb-4">
            <Link to="/" className="hover:text-neutral-800">Home</Link> <span className="mx-2">›</span>
            <Link to="/events" className="hover:text-neutral-800">Events</Link> <span className="mx-2">›</span>
            <span className="text-neutral-800">{event.title}</span>
          </nav>
          <div className="text-sm text-brand font-medium mb-4">{event.date}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-neutral-600">
            <span>📅 {event.date}</span>
            <span>🕒 {event.time}</span>
            <span>📍 {event.location}</span>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <img loading="lazy" decoding="async"
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full max-h-[32rem] object-contain bg-neutral-50 rounded-card"
              onError={(e) => {
                e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">About This Event</h2>
              <p className="text-neutral-700 leading-relaxed mb-8">{event.description}</p>
              
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Event Agenda</h3>
              <div className="space-y-3 mb-8">
                {event.agenda && event.agenda.length > 0 ? (
                  event.agenda.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 sm:flex-row sm:gap-4 p-3 bg-neutral-50 rounded-card">
                      <span className="font-medium text-brand min-w-20">{item.time}</span>
                      <span className="text-neutral-700">{item.activity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">No agenda available</p>
                )}
              </div>

              <h3 className="text-xl font-bold text-neutral-800 mb-4">Featured Speakers</h3>
              <div className="space-y-3">
                {event.speakers && event.speakers.length > 0 ? (
                  event.speakers.map((speaker, index) => (
                    <div key={index} className="p-4 border border-neutral-200 rounded-card">
                      <h4 className="font-bold text-neutral-800">{speaker.name}</h4>
                      <p className="text-neutral-600">{speaker.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">No speakers announced</p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-neutral-50 p-6 rounded-card sticky top-32">
                <h3 className="text-xl font-bold text-neutral-800 mb-4">Event Details</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="font-medium text-neutral-700">Date:</span>
                    <p className="text-neutral-600">{event.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Time:</span>
                    <p className="text-neutral-600">{event.time}</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Venue:</span>
                    <p className="text-neutral-600">{event.venue}</p>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-700">Location:</span>
                    <p className="text-neutral-600">{event.location}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-brand text-white py-3 rounded-card hover:bg-brand-hover transition-colors font-medium"
                >
                  Register Now
                </button>
                {submitMessage && (
                  <p className={`mt-2 text-sm ${submitMessage.includes('successful') ? 'text-neutral-700' : 'text-brand'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showForm && (
        <dialog aria-labelledby="registration-title" className="registration-dialog rounded-card border border-neutral-200 bg-white p-0 shadow-card"
          ref={(dialog) => { if (dialog && !dialog.open) dialog.showModal() }}
          onCancel={() => setShowForm(false)} onClose={() => setShowForm(false)}>
          <div className="w-full p-6">
            <div className="sticky top-0 mb-4 flex items-start justify-between gap-4 bg-white pb-2">
              <h3 id="registration-title" className="text-xl font-bold text-neutral-800">Register for {event.title}</h3>
              <button type="button" autoFocus onClick={() => setShowForm(false)} aria-label="Close registration form" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-neutral-200 text-brand">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="registration-field-1" className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
                  <input id="registration-field-1"                     type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label htmlFor="registration-field-2" className="block text-sm font-medium text-neutral-700 mb-1">Email *</label>
                  <input id="registration-field-2"                     type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label htmlFor="registration-field-3" className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                  <input id="registration-field-3"                     type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label htmlFor="registration-field-4" className="block text-sm font-medium text-neutral-700 mb-1">Organization</label>
                  <input id="registration-field-4"                     type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label htmlFor="registration-field-5" className="block text-sm font-medium text-neutral-700 mb-1">Position</label>
                  <input id="registration-field-5"                     type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-card focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-card hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-brand text-white rounded-card hover:bg-brand-hover disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default SingleEvent