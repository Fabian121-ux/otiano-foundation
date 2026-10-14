import Login from '../../Components/Admin/Login'
import SEO from '../../Components/GeneralComponents/SEO'

function login() {
  return (
    <>
      <SEO 
        title="Admin Login"
        description="Admin login portal for Otinao Foundation for Development website management."
        keywords="Otinao Foundation for Development admin, login, admin portal"
      />
      <Login />
    </>
  )
}

export default login