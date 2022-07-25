import { useContext } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Navigation(props) {
  const {
    isLoggedIn,
    location,
    isNavOpen,
    setNavOpen,
    handleLogOut,
    handleLogIn,
  } = props;
  const isOnSavedNewsPage = location.pathname === "/saved-news";
  const currentUser = useContext(CurrentUserContext);

  return (
    <nav
      className={`navigation ${isNavOpen && "navigation_active"} ${
        isOnSavedNewsPage && "navigation__type_saved"
      }`}
    >
      <Link
        to="/"
        className={`navigation__home link ${
          isOnSavedNewsPage && "navigation__home_active"
        }`}
        onClick={() => {
          setNavOpen(false);
        }}
      >
        Home
      </Link>

      {isLoggedIn && (
        <Link
          to="/saved-news"
          className={`navigation__saved link ${
            isOnSavedNewsPage && "navigation__saved_active"
          }`}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          Saved articles
        </Link>
      )}

      <button
        className={`navigation__log-button ${
          isOnSavedNewsPage && "navigation__log-button_type_saved"
        }`}
        onClick={isLoggedIn ? handleLogOut : handleLogIn}
      >
        {isLoggedIn ? (
          <>
            <p
              className={`navigation__log-title ${
                isOnSavedNewsPage && "navigation__log-title_type_saved"
              }`}
            >
              {currentUser.name}
            </p>
            <div
              className={`navigation__log-image ${
                isOnSavedNewsPage && "navigation__log-image_type_saved"
              }`}
            ></div>
          </>
        ) : (
          <p
            className={`navigation__log-title ${
              isOnSavedNewsPage && "navigation__log-title_type_saved"
            }`}
          >
            Sign in
          </p>
        )}
      </button>
    </nav>
  );
}
