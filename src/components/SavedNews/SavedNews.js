import NewsCardList from "../NewsCardList/NewsCardList";

export default function SavedNews(props) {
  const { isLoggedIn, location, handleDeleteArticle, savedArticles, isOpen } =
    props;

  return (
    <section className="saved-news">
      <NewsCardList
        isOpen={isOpen}
        isLoggedIn={isLoggedIn}
        location={location}
        handleDeleteArticle={handleDeleteArticle}
        savedArticles={savedArticles}
      />
    </section>
  );
}
