
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserProfiles from './components/user/UserProfiles';
import LearningCategory from './components/learning/LearningCategory';
import DiscussionBoard from './components/community/DiscussionBoard';
import Listening from './components/learning/categorydetail/listening/Listening'
import Reading from './components/learning/categorydetail/reading/Reading';
import Speaking from './components/learning/categorydetail/speaking/Speaking';




export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofiles" element={<UserProfiles />} />
        <Route path="/learningcategory" element={<LearningCategory />} />
        <Route path="/learningcategory/listening" element={<Listening />} />
        <Route path="/learningcategory/reading" element={<Reading />} />
        <Route path="/learningcategory/speaking" element={<Speaking />} />
        <Route path="/discussionboard" element={<DiscussionBoard />} />
      </Routes>
      <Footer />
    </Router>
  )
}


