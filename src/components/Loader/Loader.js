import notFound from "../../images/not-found.svg";
import Preloader from "../Preloader/Preloader";

export default function Loader({ noSearchOutcome }) {
  return (
    <div className="loader">
      {!noSearchOutcome ? (
        <Preloader />
      ) : (
        <img src={notFound} alt="sadly smile" />
      )}
      {noSearchOutcome && <h2 className="loader__title">Nothing found</h2>}
      <span className="loader__text">
        {!noSearchOutcome
          ? "Searching for news..."
          : "Sorry, but nothing matched your search terms."}
      </span>
    </div>
  );
}
