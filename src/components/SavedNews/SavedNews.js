import NewsCardList from "../NewsCardList/NewsCardList";

export default function SavedNews(props) {
  const { isLoggedIn, location, handleDeleteArticle, savedArticles } = props;

  return (
    <section className="saved-news">
      <NewsCardList
        isLoggedIn={isLoggedIn}
        location={location}
        savedArticles={savedArticles}
        handleDeleteArticle={handleDeleteArticle}
      />
    </section>
  );
}
