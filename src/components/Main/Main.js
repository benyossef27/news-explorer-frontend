import About from "../About/About";
import NewsCard from "../NewsCard/NewsCard";
import NewsCardList from "../NewsCardList/NewsCardList";

export default function Main({ isLoggedIn }) {
  return (
    <main className="main">
      <NewsCardList isSearching={true} isFailed={false} />
      <NewsCardList isSearching={true} isFailed={true} />
      <NewsCardList isSearching={false} isFailed={false}>
        <NewsCard isLoggedIn={isLoggedIn} />
        <NewsCard isLoggedIn={isLoggedIn} />
        <NewsCard isLoggedIn={isLoggedIn} />
      </NewsCardList>
      <About />
    </main>
  );
}
