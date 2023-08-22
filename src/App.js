import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Protected from "./components/Protected/Protected";

import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import NewProject from "./pages/NewProject/NewProject";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import Footer from "./components/Footer/Footer";
import Success from "./pages/Success/Success";
import Report from "./pages/Report/Report";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/profile"
              exact
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
            <Route
              path="/profile/edit"
              exact
              element={
                <Protected>
                  <ProfileEdit />
                </Protected>
              }
            />
            <Route
              path="/projects"
              exact
              element={
                <Protected>
                  <Projects />
                </Protected>
              }
            />
            <Route
              path="/project/:id"
              exact
              element={
                <Protected>
                  <ProjectDetails />
                </Protected>
              }
            />
            <Route
              path="/new-project"
              exact
              element={
                <Protected>
                  <NewProject />
                </Protected>
              }
            />

            <Route path="/success" element={<Success />} />
            <Route path="/product/:id/report" element={<Report />} />

            <Route path="*" element={<Error />} />
            <Route path="signin" exact element={<SignIn />} />
            <Route path="signup" exact element={<SignUp />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
