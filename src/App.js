import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Protected from "./components/Protected/Protected";
import { useTheme } from "./context/ThemeContext";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import PasswordUpdate from "./pages/PasswordUpdate/PasswordUpdate";
import NewProject from "./pages/NewProject/NewProject";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import Footer from "./components/Footer/Footer";

function App() {
  const darkTheme = useTheme();

  const themeStyles = {
    backgroundColor: darkTheme ? "#121212" : "#fff",
    color: darkTheme ? "#fff" : "#051f20",
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div style={themeStyles}>
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

              <Route
                path="/updatePassword"
                exact
                element={
                  <Protected>
                    <PasswordUpdate />
                  </Protected>
                }
              />

              <Route path="*" element={<Error />} />
              <Route path="signin" exact element={<SignIn />} />
              <Route path="signup" exact element={<SignUp />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
