import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SearchForm from "../SearchForm/SearchForm";

export default function Header(props) {
  const {
    isLoggedIn,
    location,
    handleLogOut,
    handleLogIn,
    handleSearchSubmit,
    savedArticles,
  } = props;

  const isOnSavedNewsPage = location.pathname === "/saved-news";
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <header className={`header ${isOnSavedNewsPage && "header_type_saved"}`}>
      <div className="header__wrapper">
        <section
          className={`header__top ${
            isNavOpen && !isOnSavedNewsPage && "header__top_active"
          }`}
        >
          <h1
            className={`header__title ${
              isOnSavedNewsPage && "header__title_type_saved"
            }`}
          >
            NewsExplorer
          </h1>
          {isNavOpen ? (
            <button
              className={`header__button ${
                isOnSavedNewsPage && "header__button_type_saved"
              }`}
              onClick={() => {
                setNavOpen(false);
              }}
            >
              &#10005;
            </button>
          ) : (
            <button
              className={`header__button ${
                isOnSavedNewsPage && "header__button_type_saved"
              }`}
              onClick={() => {
                setNavOpen(true);
              }}
            >
              &#x268C;
            </button>
          )}
          <Navigation
            isLoggedIn={isLoggedIn}
            isNavOpen={isNavOpen}
            setNavOpen={setNavOpen}
            location={location}
            handleLogOut={handleLogOut}
            handleLogIn={handleLogIn}
          />
        </section>
        {isOnSavedNewsPage ? (
          <SavedNewsHeader savedArticles={savedArticles} />
        ) : (
          <SearchForm handleSearchSubmit={handleSearchSubmit} />
        )}
      </div>
    </header>
  );
}
