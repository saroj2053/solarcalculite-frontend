import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Profile from "./pages/Profile/Profile";
import Projects from "./pages/Projects/Projects";
import NewProject from "./pages/NewProject/NewProject";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import Success from "./pages/Success/Success";
import Report from "./pages/Report/Report";
import Protected from "./components/Protected/Protected";
import useAuthUserStore from "./store/userStore";

function App() {
  const { authUser } = useAuthUserStore();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={authUser ? <Navigate to="/projects" /> : <SignIn />}
          />
          <Route
            path="signup"
            exact
            element={authUser ? <Navigate to="/projects" /> : <SignUp />}
          />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
