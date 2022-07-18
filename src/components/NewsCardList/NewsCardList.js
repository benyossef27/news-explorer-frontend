import Loader from "../Loader/Loader";

export default function NewsCardList({ children, isSearching, isFailed }) {
  return (
    <section className="cards">
      {isSearching ? (
        <Loader isFailed={isFailed} />
      ) : (
        <>
          <h2 className="cards__title">Search results</h2>
          <div className="cards__wrapper">
            <ul className="cards__list">{children}</ul>
          </div>
          <button className="cards__more">Show more</button>
        </>
      )}
    </section>
  );
}
