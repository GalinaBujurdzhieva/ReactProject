import React from "react";
import ReactDOM from "react-dom/client";
import { BlogProvider } from "../src/contexts/Blogs/BlogContext.jsx";
import { TrainerProvider } from "./contexts/Trainers/TrainerContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BlogProvider>
    <TrainerProvider>
      <App />
    </TrainerProvider>
  </BlogProvider>
);
