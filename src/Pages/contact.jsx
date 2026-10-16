import Contact from '../Components/Contact/Contact'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function ContactPage() {
  return (
    <div>
      <SEO 
        title="Contact Us"
        description="Get in touch with Otiano Foundation for Development. Contact us for partnerships, donations, volunteer opportunities, or general inquiries."
        keywords="Otiano Foundation for Development contact, get in touch, partnerships, donations, volunteer, Nigeria foundation contact"
      />
      <Navbar />
      <Contact />
      <Footer />
    </div>
  )
}

export default ContactPage