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
import { getArticlesFromApi } from "../../utils/NewsApi";
import {
  register,
  login,
  getUserData,
  saveArticle,
  deleteArticle,
  getArticlesFromDb,
} from "../../utils/MainApi";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isPreloaderOpen, setPreloaderOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);

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

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserData(localStorage.getItem("jwt").jwt);
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        }
        const articlesFromDb = await getArticlesFromDb();
        if (articlesFromDb) {
          setSavedArticles(articlesFromDb);
        }
      } catch {
        return;
      }
    })();
    setSearchedArticles(JSON.parse(localStorage.getItem("lastSearch")) || []);
  }, [isLoggedIn]);

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

  async function handleSearchSubmit(event, keyWord) {
    try {
      event.preventDefault();
      setModalOpen(true);
      setPreloaderOpen(true);
      let searchResult = await getArticlesFromApi(keyWord);
      if (searchResult) {
        localStorage.setItem(
          "lastSearch",
          JSON.stringify(searchResult.articles)
        );
        localStorage.setItem("keyWord", keyWord);
        setSearchedArticles(JSON.parse(localStorage.getItem("lastSearch")));
        localStorage.setItem("counter", 3);
      }
      setModalOpen(false);
      setPreloaderOpen(false);
    } catch (error) {
      closeAllPopups();
      alert("The search failed.");
    }
  }

  async function handleDeleteArticle(article) {
    try {
      await deleteArticle(article);
      const articlesFromDb = await getArticlesFromDb();
      if (articlesFromDb) {
        setSavedArticles(articlesFromDb);
      }
    } catch (error) {
      setSavedArticles([]);
    }
  }

  async function handleSaveArticle(article) {
    try {
      await saveArticle(article);
      const articlesFromDb = await getArticlesFromDb();
      if (articlesFromDb) {
        setSavedArticles(articlesFromDb);
      }
    } catch (error) {
      if (isLoggedIn) alert("Failed to save article.");
    }
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
              <Main
                isLoggedIn={isLoggedIn}
                location={location}
                handleSaveArticle={handleSaveArticle}
                handleDeleteArticle={handleDeleteArticle}
                searchedArticles={searchedArticles}
                savedArticles={savedArticles}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  location={location}
                  handleDeleteArticle={handleDeleteArticle}
                  savedArticles={savedArticles}
                />
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
