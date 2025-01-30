import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home_page from '../pages/Home_page';
import Contact from '../pages/ContactPage';

import AboutPage from '../pages/AboutPgae';
import InteractiveMap from '../pages/InteractiveMap';
import Login from '../pages/auth/login';
import Profile from '../pages/Profiles/Profiles';
import NotFound from '../pages/NotFound';
import Private_Route from '../components/privateRoute/Private_Route';
import VotersSignup from '../pages/auth/Voters.Signup';
import ElectorialLogin from '../pages/auth/Electorial/ElectorialLogin';
import ElectorialSignup from '../pages/auth/Electorial/ElectorialSignup';
import Layout from '../layout/Layout';
import RegisterCandidate from '../pages/Dashboard/RegisterCandidate';
import VoteCount from '../pages/Dashboard/VoteCount';
import Dashboard from '../pages/Dashboard/Dashboard';
import AllCandidates from '@/pages/Dashboard/AllCandidate';
import UpdateCandidate from '@/pages/Dashboard/UpdateCandidate';
import Electoral_private_routes from '@/components/privateRoute/Electoral_private_routes';
import { useSelector } from 'react-redux';

export default function RoutesApp() {
  
  return (
    <Router>
        {/* <Header/> */}

        <Routes>
          <Route path='/' element={<Home_page/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/map' element={<InteractiveMap/>}/>
          <Route path='/voters-login' element={<Login/>}/>
          <Route path='/voters-signup' element={<VotersSignup/>}/>

          {/* Electorial Auth Route */}
          <Route path='/electorial-signup' element={<ElectorialSignup/>}/>
          <Route path='/electorial-login' element={<ElectorialLogin/>}/>

          {/* profile routes */}
          <Route element={<Private_Route/>}>
            <Route path='/profile/:id' element={<Profile/>}/>
          </Route>

          {/* Dashboard */}
          <Route element={<Electoral_private_routes/>}>
            <Route path='/dashboard' element={<Layout/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='register-candidate' element={<RegisterCandidate/>}/>
              <Route path='vote-count' element={<VoteCount/>}/>
              <Route path='all-candidate' element={<AllCandidates/>}/>
              <Route path='all-candidate/update-candidate/:id' element={<UpdateCandidate/>}/>
              <Route path='setting/:id' element={<UpdateCandidate/>}/>
            </Route>
          </Route>

          <Route path='*' element={<NotFound/>}/>

        </Routes>
    </Router>
  )
}
