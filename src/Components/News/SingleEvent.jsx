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
    } catch (err) {
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event...</p>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
            <Link to="/events" className="text-red-600 hover:text-red-600">
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
      <section className="bg-gray-50 pb-8 pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-gray-800">Home</Link> <span className="mx-2">›</span>
            <Link to="/events" className="hover:text-gray-800">Events</Link> <span className="mx-2">›</span>
            <span className="text-gray-800">{event.title}</span>
          </nav>
          <div className="text-sm text-red-600 font-medium mb-4">{event.date}</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
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
            <img 
              src={getImageUrl(event.image)}
              alt={event.title}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">Event Agenda</h3>
              <div className="space-y-3 mb-8">
                {event.agenda && event.agenda.length > 0 ? (
                  event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-red-600 min-w-20">{item.time}</span>
                      <span className="text-gray-700">{item.activity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No agenda available</p>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Speakers</h3>
              <div className="space-y-3">
                {event.speakers && event.speakers.length > 0 ? (
                  event.speakers.map((speaker, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-bold text-gray-800">{speaker.name}</h4>
                      <p className="text-gray-600">{speaker.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No speakers announced</p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Event Details</h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Time:</span>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Venue:</span>
                    <p className="text-gray-600">{event.venue}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Register Now
                </button>
                {submitMessage && (
                  <p className={`mt-2 text-sm ${submitMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Register for {event.title}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  {submitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleEvent