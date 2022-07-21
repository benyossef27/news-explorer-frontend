import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews() {
  return (
    <section className="saved-news">
      <div className="saved-news__container">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
    </section>
  );
}
