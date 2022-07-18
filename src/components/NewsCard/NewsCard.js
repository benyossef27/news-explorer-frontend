import { useState } from "react";
import { useLocation } from "react-router";

export default function NewsCard({ isLoggedIn }) {
  const location = useLocation();
  const [cardSelected, setCardSelected] = useState(false);

  function handleMarkClick() {
    isLoggedIn && setCardSelected((cardSelected) => !cardSelected);
  }

  return (
    <li
      className="card"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {location.pathname !== "/" && (
        <>
          <p className="card__message card__message_active">
            Remove from saved
          </p>
          <p className="card__keyword">bears</p>
        </>
      )}
      <button
        onClick={handleMarkClick}
        className={`card__button
        ${
          location.pathname === "/"
            ? cardSelected
              ? "card__button_active"
              : "card__buton_type_regulare"
            : "card__button_type_saved"
        }
     `}
      />
      <p className="card__message">
        {location.pathname === "/"
          ? "Sign in to save articles"
          : "Remove from saved"}
      </p>

      <a
        href="https://en.wikipedia.org/wiki/Brown_bear"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src="https://upload.wikimedia.org/wikipedia/commons/7/71/2010-kodiak-bear-1.jpg"
          alt="bear"
        ></img>
      </a>
      <time className="card__date">17.07.2022</time>
      <h2 className="card__title">Hello bear!</h2>
      <p className="card__article">
        The brown bear (Ursus arctos) is a large bear species found across
        Eurasia and North America. In North America, the populations of brown
        bears are called grizzly bears, while the subspecies that inhabits the
        Kodiak Islands of Alaska is known as the Kodiak bear.
      </p>
      <h3 className="card__subtitle">somewhere</h3>
    </li>
  );
}
