import { useEffect } from 'react'
import SingleNews from '../Components/News/SingleNews'
import Navbar from '../Components/GeneralComponents/Navbar'
import Footer from '../Components/GeneralComponents/Footer'

function SingleNewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <SingleNews />
      <Footer />
    </>
  )
}

export default SingleNewsPage