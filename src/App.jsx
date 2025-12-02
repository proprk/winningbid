import { Routes, Route, Router, Navigate} from 'react-router'
import './App.css'
import Nav from './components/Nav'
import SearchBar from './components/SearchBar'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="search" element= {
          <ProtectedRoute> 
            <>
              <Nav/>
              <SearchBar/>
            </>
          </ProtectedRoute> 
        }/>

        {/* Fallback Navigation*/}
        <Route path="*" element={ <Navigate to="/"/> }/>
      </Routes>
      

    </>
  )
}

export default App