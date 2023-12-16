import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paths from './utils/Paths.js'

import { Home } from "./components/homeComponents/Home";
import { Header } from "./components/mainComponents/Header";
import { Footer } from "./components/mainComponents/Footer";

import { About } from "./components/aboutComponents/About";
import { AboutTeamMemberDetails } from "./components/aboutComponents/teamComponents/AboutTeamMemberDetails";
import { AboutTeamMemberCreate } from "./components/aboutComponents/teamComponents/AboutTeamMemberCreate";
import { AboutTeamMemberEdit } from "./components/aboutComponents/teamComponents/AboutTeamMemberEdit";

import { Blog } from "./components/blogComponents/Blog";
import { BlogAll } from "./components/blogComponents/BlogAll";
import { BlogPostDetails } from "./components/blogComponents/BlogPostDetails";
import { BlogCreate } from "./components/blogComponents/BlogCreate";
import { BlogEdit } from "./components/blogComponents/BlogEdit";

import { Services } from "./components/servicesComponents/Services";

import { TestimonialCreate } from "./components/homeComponents/testimonialComponents/TestimonialCreate.jsx";
import { TestimonialEdit } from "./components/homeComponents/testimonialComponents/TestimonialEdit.jsx";

import { Contact } from "./components/contactComponents/Contact";

import { Register } from "./components/registerComponent/Register";
import { Login } from "./components/loginComponent/Login";
import { Logout } from "./components/logoutComponents/Logout";

import { ErrorPage } from "./components/errorPageComponent/ErrorPage";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.jsx";

import { AuthGuard } from "./components/guards/AuthGuard";
import { UserGuard } from "./components/guards/UserGuard";

function App() {
  const [shouldFocus, setShouldFocus] = useState(false);
  const [focusDiv, setFocusDiv] = useState(false);

  const handleClick = () => {
    setShouldFocus(true);
  };

  const handleLinkClick = () => {
    setFocusDiv(true);
  };

  return (
    <>
      <Header />
      <ErrorBoundary>
      <Routes>
        <Route path={Paths.Home} element={<Home handleLinkClick={handleLinkClick} />} />

        <Route path={Paths.About} element={<About shouldFocus={shouldFocus} />} />
        <Route path={Paths.AboutTrainersDetails} element={<AboutTeamMemberDetails />}/>

        <Route path={Paths.Courses} element={<Services setFocus={focusDiv} />} />

        <Route path={Paths.Blog} element={<Blog />} />
        <Route path={Paths.BlogAll} element={<BlogAll />} />
        <Route path={Paths.BlogDetails} element={<BlogPostDetails />} />

        <Route path={Paths.Contact} element={<Contact />} />

        <Route path={Paths.Register}element={<Register />} />
        <Route path={Paths.Login} element={<Login />} />
        
        <Route path={Paths.Error} element={<ErrorPage />} />
        
        <Route element={<UserGuard />}>
          <Route path={Paths.Logout} element={<Logout />} />
          <Route path={Paths.TestimonialCreate} element={<TestimonialCreate />} /> 
         <Route
            path="/testimonial/edit/:_id" element={<TestimonialEdit/>} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route
            path={Paths.AboutTrainersCreate} element={<AboutTeamMemberCreate handleClick={handleClick} />}
          />
          <Route
            path="/about/trainers/edit/:_id" element={<AboutTeamMemberEdit handleClick={handleClick} />}
          />
          <Route path={Paths.BlogCreate} element={<BlogCreate />} />
          <Route path="/blog/edit/:_id" element={<BlogEdit />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={1000} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
export default App;
