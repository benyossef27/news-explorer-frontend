import About from "../About/About";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function Main(props) {
  const {
    isLoggedIn,
    location,
    handleSaveArticle,
    handleDeleteArticle,
    searchedArticles,
    savedArticles,
  } = props;
  return (
    <main className="main">
      <NewsCardList
        isLoggedIn={false}
        location={location}
        searchedArticles={searchedArticles}
        handleSaveArticle={handleSaveArticle}
        handleDeleteArticle={handleDeleteArticle}
        savedArticles={savedArticles}
      />
      <NewsCardList
        isLoggedIn={isLoggedIn}
        location={location}
        searchedArticles={searchedArticles}
        handleSaveArticle={handleSaveArticle}
        handleDeleteArticle={handleDeleteArticle}
        savedArticles={savedArticles}
      />
      <About />
    </main>
  );
}
