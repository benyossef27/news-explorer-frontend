import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWindow from "../ModalWindow/ModalWindow";
import SavedNews from "../SavedNews/SavedNews";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isPreloaderOpen, setPreloaderOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function closeAllPopups() {
    setInfoOpen(false);
    setLoginFormOpen(false);
    setPreloaderOpen(false);
    setModalOpen(false);
  }

  function redirectToLogin() {
    setLoginFormOpen(true);
    setInfoOpen(false);
  }

  function handleLogOut() {
    navigate("/");
    setLoggedIn(false);
  }

  function handleLogIn() {
    setModalOpen(true);
    setLoginFormOpen(true);
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setCurrentUser({});
    setLoggedIn(true);
    setModalOpen(false);
    setLoginFormOpen(false);
  }

  async function handleSignupSubmit(event) {
    event.preventDefault();
    closeAllPopups();
    setModalOpen(true);
    setInfoOpen(true);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <ModalWindow
          isModalOpen={isModalOpen}
          isLoginFormOpen={isLoginFormOpen}
          isPreloaderOpen={isPreloaderOpen}
          isInfoOpen={isInfoOpen}
          closeAllPopups={closeAllPopups}
          redirectToLogin={redirectToLogin}
          handleLoginSubmit={handleLoginSubmit}
          handleSignupSubmit={handleSignupSubmit}
        />
        <Header
          isLoggedIn={isLoggedIn}
          location={location}
          handleLogOut={handleLogOut}
          handleLogIn={handleLogIn}
          handleSearchSubmit={handleSearchSubmit}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main isLoggedIn={isLoggedIn} location={location} isFailed />
            }
          />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <SavedNews isLoggedIn={isLoggedIn} location={location} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
