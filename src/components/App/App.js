import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isPreloaderOpen, setPreloaderOpen] = useState(false);
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [noSearchOutcome, setNoSearchOutcome] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHappened, setSearchHappened] = useState(false);

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

  function handleLogOut(token) {
    localStorage.removeItem("jwt", token);
    localStorage.removeItem("lastSearch");
    setLoggedIn(false);
    navigate("/");
  }

  function handleLogIn() {
    setModalOpen(true);
    setLoginFormOpen(true);
  }

  async function handleLoginSubmit(event, email, password) {
    try {
      event.preventDefault();
      setModalOpen(true);
      setPreloaderOpen(true);
      setLoginFormOpen(false);
      const data = await login(email, password);
      if (data) {
        localStorage.setItem("jwt", data.token);
      }
    } catch (res) {
      setPreloaderOpen(false);
      closeAllPopups();
      alert("Failed to log in. Wrong email or password");
      return;
    }

    try {
      const user = await getUserData(localStorage.getItem("jwt").jwt);
      if (user) {
        setCurrentUser(user || {});
        setLoggedIn(true);
      }
    } catch (res) {
      closeAllPopups();
      alert("Failed to log in. User not found.");
      return;
    }

    try {
      const articlesFromDb = await getArticlesFromDb();
      if (articlesFromDb) {
        setSavedArticles(articlesFromDb || []);
      }
    } catch {
      closeAllPopups();
      alert("Failed to load saved articales");
    }
    setModalOpen(false);
    setPreloaderOpen(false);
    setLoginFormOpen(false);
  }

  async function handleSignupSubmit(event, email, password, username) {
    try {
      event.preventDefault();
      setLoginFormOpen(false);
      const data = await register(email, password, username);
      if (data.email === email) {
        setInfoOpen(true);
      }
    } catch (error) {
      closeAllPopups();
      alert("Failed to sign up. This email might be taken.");
    }
  }
  async function handleSearchSubmit(event, keyWord) {
    try {
      event.preventDefault();
      setNoSearchOutcome(false);
      setSearchHappened(false);
      setIsSearching(true);
      setPreloaderOpen(true);
      let searchResult = await getArticlesFromApi(keyWord);
      if (searchResult.articles.length === 0) {
        setNoSearchOutcome(true);
        setSearchHappened(true);
      } else if (searchResult.articles.length !== 0) {
        setIsSearching(false);
        localStorage.setItem(
          "lastSearch",
          JSON.stringify(searchResult.articles)
        );
        localStorage.setItem("keyWord", keyWord);
        setSearchedArticles(JSON.parse(localStorage.getItem("lastSearch")));
        localStorage.setItem("counter", 3);
      }
    } catch (error) {
      alert("Failed to search articles");
    }
  }

  async function handleDeleteArticle(article) {
    try {
      await deleteArticle(article._id);
      const articlesFromDb = await getArticlesFromDb();
      if (articlesFromDb) {
        setSavedArticles(articlesFromDb);
      }
    } catch (error) {
      alert("Failed to delete articles");
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
          isPreloaderOpen={isPreloaderOpen}
          isModalOpen={isModalOpen}
          isLoginFormOpen={isLoginFormOpen}
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
          savedArticles={savedArticles}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchHappened={searchHappened}
                noSearchOutcome={noSearchOutcome}
                isSearching={isSearching}
                isPreloaderOpen={isPreloaderOpen}
                isLoggedIn={isLoggedIn}
                location={location}
                handleSaveArticle={handleSaveArticle}
                handleDeleteArticle={handleDeleteArticle}
                searchedArticles={searchedArticles}
                savedArticles={savedArticles}
                openForm={handleLogIn}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} openForm={handleLogIn}>
                <SavedNews
                  isLoggedIn={isLoggedIn}
                  location={location}
                  handleDeleteArticle={handleDeleteArticle}
                  savedArticles={savedArticles}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
