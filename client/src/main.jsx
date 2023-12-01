import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BlogProvider } from "../src/contexts/Blogs/BlogContext.jsx";
import { TrainerProvider } from "./contexts/Trainers/TrainerContext.jsx";
import { CourseProvider } from "./contexts/Courses/CourseContext.jsx";
import { AuthProvider } from "./contexts/Users/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <BlogProvider>
        <CourseProvider>
          <TrainerProvider>
            <App />
          </TrainerProvider>
        </CourseProvider>
      </BlogProvider>
    </AuthProvider>
  </BrowserRouter>
);
