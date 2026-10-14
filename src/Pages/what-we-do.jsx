import Navbar from "../Components/GeneralComponents/Navbar"
import Footer from "../Components/GeneralComponents/Footer"
import WhatWeDo from "../Components/WhatWeDo/WhatWeDo"
import SEO from '../Components/GeneralComponents/SEO'

function whatwedo() {
  return (
    <div>
      <SEO 
        title="What We Do"
        description="Discover Otinao Foundation for Development's programs in education, healthcare, economic empowerment, and community development across Nigeria."
        keywords="Otinao Foundation for Development programs, education initiatives, healthcare programs, economic empowerment, community development, Nigeria NGO"
      />
      <Navbar />
      <WhatWeDo />
      <Footer />
    </div>
  )
}

export default whatwedo