import {Routes, Route} from 'react-router-dom'

// ------ Pages --------
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dasboard from '../pages/Dashboard'
import Private from './Private'
import Profile from '../pages/Profile'
import Customers from '../pages/Customers'
import New from '../pages/New'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={ <SignIn /> } />
      <Route path='/register' element={ <SignUp /> } />
      <Route path='/dashboard' element={<Private> <Dasboard /> </Private> }/>
      <Route path='/profile' element={<Private> <Profile /> </Private>} />
      <Route path='/customers' element={<Private> <Customers /> </Private>}/>
      <Route path='/new' element={<Private> <New /> </Private>}/>
    </Routes>
  )
}

export default RoutesApp