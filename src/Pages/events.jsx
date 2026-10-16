import Navbar from "../Components/GeneralComponents/Navbar"
import Footer from "../Components/GeneralComponents/Footer"
import Events from "../Components/News/Events"
import SEO from '../Components/GeneralComponents/SEO'

function events() {
  return (
    <div>
      <SEO 
        title="Events"
        description="Discover upcoming events and programs organized by Otiano Foundation for Development to engage communities and drive positive change."
        keywords="Otiano Foundation for Development events, upcoming programs, community events, foundation activities, Nigeria events"
      />
      <Navbar />
      <Events />
      <Footer />
    </div>
  )
}

export default events