import EmptyState from '../GeneralComponents/EmptyState'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../services/api'
import ApiService from '../../services/api'

function Events() {
  const [feedback, setFeedback] = useState({ name: '', email: '', event: '', rating: '', comments: '' })
  const [feedbackStatus, setFeedbackStatus] = useState('')
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await ApiService.getEvents()
        setEventsData(response.data || [])
      } catch (err) {
        setError('Failed to load events')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const upcomingEvents = eventsData.filter(event => event.status === 'upcoming')
  const pastEvents = eventsData.filter(event => event.status === 'past')

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    setFeedbackStatus('sending')
    
    try {
      await ApiService.submitEventFeedback(feedback)
      setFeedbackStatus('success')
      setFeedback({ name: '', email: '', event: '', rating: '', comments: '' })
    } catch (error) {
      setFeedbackStatus('error')
      console.error('Error submitting feedback:', error)
    }
  }

  if (loading) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
            <p className="text-neutral-600 max-w-prose">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-brand mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-hover"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="brand-hero">
        <div className="relative z-10 flex items-end">
          <div className="max-w-7xl px-6 md:px-12 lg:px-20 pb-12">
            <div className="text-neutral-700 max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-brand mb-4">Events</h1>
              <p className="text-[0.9375rem] sm:text-base md:text-base font-medium">
 Find published event announcements, participation details, and records of past activities.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-white section-space">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <EmptyState title="Event announcements"><p>Confirmed dates, locations, and participation details will be listed here when events are published. Contact OFD with an event enquiry.</p></EmptyState>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-card overflow-hidden shadow-card hover:shadow-card transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src={event.image ? getImageUrl(event.image) : '/images/ofd-placeholder.svg'} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-brand font-medium mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-3">{event.title}</h3>
                    <div className="text-sm text-neutral-600 mb-2">
                      <span className="font-medium">Time:</span> {event.time}
                    </div>
                    <div className="text-sm text-neutral-600 mb-4">
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <p className="text-neutral-600 leading-relaxed mb-4 max-w-prose">{event.description}</p>
                    <Link to={`/events/${event.id}`} className="inline-flex min-h-11 items-center rounded-card bg-brand px-6 py-2 text-white transition-colors hover:bg-brand-hover">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feedback Form Hero Section */}
      <section className="bg-gradient-to-r from-brand to-brand section-space">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Share feedback or an idea</h2>
              <p className="text-[0.9375rem] sm:text-base mb-6 opacity-90">
Share feedback on a published event or suggest a programme idea. Your input can help inform future planning.              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Suggest topics and practical priorities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Share your valuable suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Share needs identified in your community</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-card shadow-card p-8">
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="feedback-field-1" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                    <input id="feedback-field-1" 
                      type="text" 
                      value={feedback.name}
                      onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback-field-2" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                    <input id="feedback-field-2" 
                      type="email" 
                      value={feedback.email}
                      onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="feedback-field-3" className="block text-sm font-medium text-neutral-700 mb-1">Event Attended</label>
                  <select id="feedback-field-3" 
                    value={feedback.event}
                    onChange={(e) => setFeedback({...feedback, event: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
                    required
                  >
                    <option value="">Select an event</option>
                    <option value="None yet - sharing general ideas">None yet - sharing general ideas</option>
                    {pastEvents.map((event) => (
                      <option key={event.id} value={event.title}>{event.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="feedback-field-4" className="block text-sm font-medium text-neutral-700 mb-1">Overall Rating</label>
                  <select id="feedback-field-4" 
                    value={feedback.rating}
                    onChange={(e) => setFeedback({...feedback, rating: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
                    required={feedback.event !== 'None yet - sharing general ideas'}
                  >
                    <option value="">Select rating</option>
                    {feedback.event === 'None yet - sharing general ideas' ? (
                      <option value="N/A">N/A - Just sharing ideas</option>
                    ) : (
                      <>
                        <option value="5">Excellent (5 stars)</option>
                        <option value="4">Very Good (4 stars)</option>
                        <option value="3">Good (3 stars)</option>
                        <option value="2">Fair (2 stars)</option>
                        <option value="1">Poor (1 star)</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="feedback-field-5" className="block text-sm font-medium text-neutral-700 mb-1">Comments & Suggestions</label>
                  <textarea id="feedback-field-5" 
                    value={feedback.comments}
                    onChange={(e) => setFeedback({...feedback, comments: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-brand focus:border-transparent"
                    placeholder="Share your thoughts about the event..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={feedbackStatus === 'sending'}
                  className="w-full bg-brand text-white py-3 rounded-md hover:bg-brand-hover transition-colors font-medium disabled:opacity-50"
                >
                  {feedbackStatus === 'sending' ? 'Submitting...' : 'Submit Feedback'}
                </button>
                
                {feedbackStatus === 'success' && (
                  <p role="status" className="text-neutral-700 font-medium text-center max-w-prose">Thank you! Your feedback has been submitted successfully.</p>
                )}
                {feedbackStatus === 'error' && (
                  <p role="status" className="text-brand font-medium text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="bg-white section-space">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12">Past activities</h2>
          {pastEvents.length === 0 ? (
            <EmptyState title="Activity records"><p>Published event records and photographs will appear here as they become available.</p></EmptyState>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-neutral-50 rounded-card overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img loading="lazy" decoding="async"
                      src={getImageUrl(event.image)} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null
                          e.currentTarget.src = '/images/ofd-placeholder.svg'
                          e.currentTarget.alt = 'Otiano Foundation branded illustration; photograph unavailable'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-neutral-500 mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-3">{event.title}</h3>
                    <div className="text-sm text-neutral-600 mb-4">
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <p className="text-neutral-600 leading-relaxed max-w-prose">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Events