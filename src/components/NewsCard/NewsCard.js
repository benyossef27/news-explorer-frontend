import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function NewsCard(props) {
  const {
    isLoggedIn,
    location,
    article,
    handleDeleteArticle,
    handleSaveArticle,
    savedArticles,
  } = props;

  const isOnSavedNewsPage = location.pathname === "/saved-news";
  const [cardSelected, setCardSelected] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(article.date);
  const publishedAt =
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear();

  useEffect(() => {
    if (!isOnSavedNewsPage) {
      savedArticles.forEach((element) => {
        if (element.title === article.title) {
          setCardSelected(true);
        }
      });
    }
  });

  function handleMarkClick() {
    if (isLoggedIn) {
      if (cardSelected) {
        savedArticles.forEach((element) => {
          if (element.title === article.title) handleDeleteArticle(element);
        });
        setCardSelected(false);
      } else {
        handleSaveArticle(article);
        setCardSelected(true);
      }
    }
  }

  return (
    <li
      className="card"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {isOnSavedNewsPage ? (
        <>
          {" "}
          {/*saved news page*/}
          <button
            className="card__button card__button_type_saved"
            onClick={() => {
              handleDeleteArticle(article);
            }}
          />
          <p className="card__message card__message_active">
            Remove from saved
          </p>
          <p className="card__keyword">{article.keyword}</p>
        </>
      ) : (
        <>
          {" "}
          {/*main page*/}
          <button
            className={`card__button ${
              isLoggedIn && cardSelected && "card__button_active"
            }`}
            onClick={handleMarkClick}
          />
          <p
            className={`card__message ${!isLoggedIn && "card__message_active"}`}
          >
            {" "}
            Sign in to save articles
          </p>
        </>
      )}
      <a href={article.link} target="_blank" rel="noreferrer">
        <img
          className="card__image"
          src={article.image}
          alt={article.title}
        ></img>
      </a>
      <time className="card__date">{publishedAt}</time>
      <h2 className="card__title">{article.title}</h2>
      <p className="card__article">{article.text}</p>
      <h3 className="card__subtitle">{article.source}</h3>
    </li>
  );
}
