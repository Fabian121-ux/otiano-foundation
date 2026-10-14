import Home from '../Components/HomeComponents/Home'
import Navbar from '../Components/GeneralComponents/Navbar'
import OurWork from '../Components/HomeComponents/OurWork'
// import News from '../Components/HomeComponents/News'
import Quote from '../Components/HomeComponents/Quote'
// import Exploits from '../Components/HomeComponents/Exploits'
import Footer from '../Components/GeneralComponents/Footer'
import EnhancingOpportunities from '../Components/HomeComponents/EnhancingOpportunities'
import Newsletter from '../Components/HomeComponents/Newsletter'

import SEO from '../Components/GeneralComponents/SEO'

function HomePage() {
  return (
    <>
      <SEO 
        title="Home"
        description="Otinao Foundation for Development - Empowering communities through education, healthcare, and sustainable development initiatives across Nigeria."
        keywords="Otinao Foundation for Development, Nigeria foundation, community development, education, healthcare, sustainable development, charity, NGO"
      />
      <Navbar />
      <Home />
      <EnhancingOpportunities />
      <OurWork />
      {/* <News />
      <Exploits /> */}
      <Quote />
      <Newsletter />
      <Footer />
    </>
  )
}

export default HomePage