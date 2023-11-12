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
import { BlogPostDetails } from './components/blogComponents/BlogPostDetails'
import { CreateBlog } from './components/blogComponents/CreateBlog'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/blog" element={<Blog />}/>
    <Route path="/blog/create" element={<CreateBlog/>}/>
    {/* <Route path="/blog/all" element={<BlogAll/>}/> */}
    <Route path="/contact" element={<Contact />}/>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/blog/:_id" element={<BlogPostDetails/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}
export default App
