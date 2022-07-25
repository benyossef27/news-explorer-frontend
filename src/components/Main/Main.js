import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function Main(props) {
  const {
    searchHappened,
    noSearchOutcome,
    isSearching,
    isLoggedIn,
    location,
    handleSaveArticle,
    handleDeleteArticle,
    searchedArticles,
    savedArticles,
    searchOutcome,
  } = props;
  return (
    <main className="main">
      <NewsCardList
        searchHappened={searchHappened}
        noSearchOutcome={noSearchOutcome}
        isSearching={isSearching}
        isLoggedIn={isLoggedIn}
        location={location}
        searchedArticles={searchedArticles}
        handleSaveArticle={handleSaveArticle}
        handleDeleteArticle={handleDeleteArticle}
        savedArticles={savedArticles}
        searchOutcome={searchOutcome}
      />
      <About />
    </main>
  );
}
