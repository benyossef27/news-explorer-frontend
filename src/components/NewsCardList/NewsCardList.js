import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsCardList(props) {
  const {
    searchHappened,
    noSearchOutcome,
    isSearching,
    isLoggedIn,
    location,
    searchedArticles,
    savedArticles,
    handleSaveArticle,
    handleDeleteArticle,
    openForm,
  } = props;
  const isOnSavedNewsPage = location.pathname === "/saved-news";
  const [sliceOfArticles, setSliceOfArticles] = useState(3);

  useEffect(() => {
    setSliceOfArticles(localStorage.getItem("counter"));
  }, [searchedArticles]);

  function showMore() {
    if (sliceOfArticles < searchedArticles.length) {
      localStorage.setItem("counter", parseInt(sliceOfArticles) + 3);
      setSliceOfArticles(localStorage.getItem("counter"));
    }
  }
  return (
    <>
      {isOnSavedNewsPage ? (
        <section
          className={`cards ${savedArticles.length !== 0 && "cards_active"}`}
        >
          <div className="cards__wrapper">
            <ul className="cards__list">
              {
                //saved
                savedArticles.map((article, index) => (
                  <NewsCard
                    isLoggedIn={isLoggedIn}
                    location={location}
                    key={Math.round(Math.random() * 10000)}
                    article={article}
                    handleDeleteArticle={handleDeleteArticle}
                  />
                ))
              }
            </ul>
          </div>
        </section>
      ) : isSearching ? (
        <section className={"cards cards_active"}>
          <Loader noSearchOutcome={noSearchOutcome} />
        </section>
      ) : noSearchOutcome ? (
        <section className={`cards ${searchHappened && "cards_active"}`}>
          <Loader noSearchOutcome={noSearchOutcome} />
        </section>
      ) : (
        <section
          className={`cards ${searchedArticles.length !== 0 && "cards_active"}`}
        >
          <h2 className="cards__title">Search results</h2>
          <div className="cards__wrapper">
            <ul className="cards__list">
              {
                //searched
                searchedArticles
                  .slice(0, sliceOfArticles)
                  .map((article, index) => (
                    <NewsCard
                      isLoggedIn={isLoggedIn}
                      location={location}
                      key={Math.round(Math.random() * 10000)}
                      article={{
                        title: article.title,
                        text: article.content,
                        date: article.publishedAt,
                        source: article.source.name,
                        link: article.url,
                        image: article.urlToImage,
                      }}
                      handleSaveArticle={handleSaveArticle}
                      handleDeleteArticle={handleDeleteArticle}
                      savedArticles={savedArticles}
                      openForm={openForm}
                    />
                  ))
              }
            </ul>
            <button
              className={`cards__more ${
                sliceOfArticles < searchedArticles.length &&
                "cards__more_active"
              }`}
              onClick={showMore}
            >
              Show more
            </button>
          </div>
        </section>
      )}
    </>
  );
}
