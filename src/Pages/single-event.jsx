import Navbar from "../Components/GeneralComponents/Navbar"
import SingleEvent from "../Components/News/SingleEvent"
import Footer from "../Components/GeneralComponents/Footer"

function SingleEventPage() {
  return (
    <>
      <Navbar isDark={true} />
      <SingleEvent />
      <Footer />
    </>
  )
}

export default SingleEventPage