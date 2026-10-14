import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../services/api'
import Navbar from '../GeneralComponents/Navbar'
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
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
      <Navbar />      
      {/* Hero Section */}
      <section className="h-[550px] bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl px-8 md:px-20 pb-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-4">Events</h1>
              <p className="text-lg md:text-xl font-medium">
 Dive into our upcoming events and network with like-minded individuals transforming education empowerment, healthcare access, skills & entrepreneurship training, and community development across Nigeria and Africa.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-red-100 via-red-50 to-yellow-100 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="text-7xl">🎉</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-4">Exciting Events Coming Soon!</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
We're planning transformative experiences that empower communities through education, healthcare access, skills & entrepreneurship training, and development initiatives across Nigeria and Africa. Join us in building a brighter future - get ready for something impactful.              </p>
              <div className="bg-gradient-to-r from-red-500 to-red-500 text-white px-8 py-3 rounded-full inline-flex items-center gap-2 font-medium">
                <span className="animate-spin">✨</span>
                <span>Stay Tuned</span>
                <span className="animate-spin">✨</span>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image ? getImageUrl(event.image) : '/src/assets/homepage/thumb-profile-governance-01.webp'} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-red-600 font-medium mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Time:</span> {event.time}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                      <Link to={`/events/${event.id}`} className="text-white">
                        View Details
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feedback Form Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Share Your Thoughts on Our Events</h2>
              <p className="text-lg mb-6 opacity-90">
Your feedback helps us shape empowering events focused on education, healthcare access, skills & entrepreneurship training, and community development. We value your insights to create better experiences for communities across Nigeria and Africa - even if you haven't attended yet, share your ideas for future gatherings.              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <span>Help us innovate for upcoming events</span>
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
                  <span>Connect with our growing community</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-xl p-8">
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={feedback.name}
                      onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={feedback.email}
                      onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Attended</label>
                  <select 
                    value={feedback.event}
                    onChange={(e) => setFeedback({...feedback, event: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating</label>
                  <select 
                    value={feedback.rating}
                    onChange={(e) => setFeedback({...feedback, rating: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comments & Suggestions</label>
                  <textarea 
                    value={feedback.comments}
                    onChange={(e) => setFeedback({...feedback, comments: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Share your thoughts about the event..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={feedbackStatus === 'sending'}
                  className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors font-medium disabled:opacity-50"
                >
                  {feedbackStatus === 'sending' ? 'Submitting...' : 'Submit Feedback'}
                </button>
                
                {feedbackStatus === 'success' && (
                  <p className="text-green-600 font-medium text-center">Thank you! Your feedback has been submitted successfully.</p>
                )}
                {feedbackStatus === 'error' && (
                  <p className="text-red-600 font-medium text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Recent Past Events</h2>
          {pastEvents.length === 0 ? (
            <div className="text-center py-12">
              {/* <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="text-4xl opacity-60"></div>
              </div> */}
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No Past Events Yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
As we launch our initiatives in education empowerment, healthcare access, skills & entrepreneurship training, and community development, you'll soon see highlights, photos, and inspiring stories from our gatherings across Nigeria and Africa. Stay connected for updates.              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(event.image)} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/src/assets/homepage/thumb-profile-governance-01.webp'
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">{event.date}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                    <div className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Location:</span> {event.location}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
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