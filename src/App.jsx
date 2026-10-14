import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/homepage'
import OurStory from './Pages/our-story'
import FoundersMessage from './Components/About/FoundersMessage'
import OurRole from './Pages/our-role'
import OurValues from './Pages/our-values'
import StrategicPlan from './Pages/strategic-plan'
import Trustees from './Pages/trustees'
// import WhatWeDo from './Pages/what-we-do'
import Education from './Components/HomeComponents/Education'
import Healthcare from './Components/HomeComponents/Healthcare'
import EconomicEmpowerment from './Components/HomeComponents/EconomicEmpowerment'
import SocialWelfare from './Components/HomeComponents/SocialWelfare'
import LatestNews from './Pages/latest-news'
import SingleNews from './Pages/single-news'
import Events from './Pages/events'
import SingleEvent from './Pages/single-event' 
import Contact from './Pages/contact'

// Get Involved imports
import VolunteerOpportunities from './Components/GetInvolved/VolunteerOpportunities'
import AdvocacyCampaign from './Components/GetInvolved/AdvocacyCampaign'
import YouthProgram from './Components/GetInvolved/YouthProgram'
import AmbassadorProgram from './Components/GetInvolved/AmbassadorProgram'

// Admin imports
import AdminLogin from './Pages/Admin/login'
import Dashboard from './Pages/Admin/dashboard'
import NewsManagement from './Pages/Admin/news'
import NewsForm from './Pages/Admin/news-form'
import EventsManagement from './Pages/Admin/events'
import EventsForm from './Pages/Admin/events-form'
import ProtectedRoute from './Components/Admin/ProtectedRoute'
import EventRegistrations from './Pages/Admin/event-registrations'
import NewsletterSubscriptionsPage from './Pages/Admin/newsletter-subscriptions'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/our-story" element={<OurStory />} />
        <Route path="/about/founders-message" element={<FoundersMessage />} />
        <Route path="/about/our-role" element={<OurRole />} />
        <Route path="/about/our-values" element={<OurValues />} />
        <Route path="/about/strategic-plan" element={<StrategicPlan />} />
        <Route path="/about/trustees" element={<Trustees />} />
        {/* <Route path="/what-we-do" element={<WhatWeDo />} /> */}
        <Route path="/education" element={<Education />} />
        <Route path="/healthcare" element={<Healthcare />} />
        <Route path="/economic-empowerment" element={<EconomicEmpowerment />} />
        <Route path="/social-welfare" element={<SocialWelfare />} />
        <Route path="/latest-news" element={<LatestNews />} />
        <Route path="/news/:id" element={<SingleNews />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<SingleEvent />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Get Involved Routes */}
        <Route path="/volunteer-opportunities" element={<VolunteerOpportunities />} />
        <Route path="/advocacy-campaign" element={<AdvocacyCampaign />} />
        <Route path="/youth-program" element={<YouthProgram />} />
        <Route path="/ambassador-program" element={<AmbassadorProgram />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/news" element={
          <ProtectedRoute>
            <NewsManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/news/create" element={
          <ProtectedRoute>
            <NewsForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/news/edit/:id" element={
          <ProtectedRoute>
            <NewsForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <EventsManagement />
          </ProtectedRoute>
        } />
        <Route path="/admin/events/create" element={
          <ProtectedRoute>
            <EventsForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/events/edit/:id" element={
          <ProtectedRoute>
            <EventsForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/event-registrations" element={
          <ProtectedRoute>
            <EventRegistrations />
          </ProtectedRoute>
        } />
        <Route path="/admin/newsletter-subscriptions" element={
          <ProtectedRoute>
            <NewsletterSubscriptionsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
