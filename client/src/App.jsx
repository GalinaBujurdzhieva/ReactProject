import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route path="/" element={<Home handleLinkClick={handleLinkClick} />} />

        <Route path="/about" element={<About shouldFocus={shouldFocus} />} />
        <Route path="/about/trainers/:_id" element={<AboutTeamMemberDetails />}/>

        <Route path="/courses" element={<Services setFocus={focusDiv} />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/all" element={<BlogAll />} />
        <Route path="/blog/:_id" element={<BlogPostDetails />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="*" element={<ErrorPage />} />
        
        <Route element={<UserGuard />}>
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route
            path="/about/trainers/create" element={<AboutTeamMemberCreate handleClick={handleClick} />}
          />
          <Route
            path="/about/trainers/edit/:_id" element={<AboutTeamMemberEdit handleClick={handleClick} />}
          />
          <Route path="/blog/create" element={<BlogCreate />} />
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
