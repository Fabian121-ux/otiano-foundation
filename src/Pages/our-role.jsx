import OurRole from '../Components/OurRole/OurRole'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function ourstory() {
  return (
    <>
      <SEO 
        title="Our Role"
        description="Discover Otiano Foundation for Development's role in community development, our approach to sustainable change, and how we make a difference."
        keywords="Otiano Foundation for Development role, community development, sustainable change, social impact, Nigeria foundation role"
      />
      <Navbar />
      <OurRole />
      <Footer />
    </>
  )
}

export default ourstory