import OurStory from '../Components/OurStory/OurStory'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'
import SEO from '../Components/GeneralComponents/SEO'

function ourstory() {
  return (
    <>
      <SEO 
        title="Our Story"
        description="Learn about Otiano Foundation for Development's journey, mission, and commitment to transforming communities through impactful development programs."
        keywords="Otiano Foundation for Development story, foundation history, mission, vision, community transformation, Nigeria development"
      />
      <Navbar />
      <OurStory />
      <Footer />
    </>
  )
}

export default ourstory