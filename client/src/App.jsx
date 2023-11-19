import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { About } from './components/aboutComponents/About'
import { Header } from './components/mainComponents/Header'
import { Footer } from './components/mainComponents/Footer'
import { Blog } from './components/blogComponents/Blog'
import { Services } from './components/servicesComponents/Services'
import { Contact } from './components/contactComponents/Contact'
import { Home } from './components/homeComponents/Home'
import { Register } from './components/registerComponent/Register'
import { Login } from './components/loginComponent/Login'
import { BlogAll } from './components/blogComponents/BlogAll'
import { BlogPostDetails } from './components/blogComponents/BlogPostDetails'
import { BlogCreate } from './components/blogComponents/BlogCreate'
import { AboutTeamMemberDetails } from './components/aboutComponents/teamComponents/AboutTeamMemberDetails'
import { BlogEdit } from './components/blogComponents/BlogEdit'
import { AboutTeamMemberCreate } from './components/aboutComponents/teamComponents/AboutTeamMemberCreate'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/about" element={<About />} />
    <Route path="/about/trainers/:_id" element={<AboutTeamMemberDetails />} />
    <Route path="/about/trainers/create" element={<AboutTeamMemberCreate />} />
    {/* <Route path="/about/trainers/edit/:_id" element={<AboutTeamMemberEdit/>}/> */}

    <Route path="/services" element={<Services />} />

    <Route path="/blog" element={<Blog />}/>
    <Route path="/blog/all" element={<BlogAll/>}/> 
    <Route path="/blog/:_id" element={<BlogPostDetails/>}/>
    <Route path="/blog/create" element={<BlogCreate/>}/>
    <Route path="/blog/edit/:_id" element={<BlogEdit/>}/>

    <Route path="/contact" element={<Contact />}/>

    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}
export default App
