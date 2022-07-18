export default function SavedNewsHeader() {
  return (
    <header className="header-saved">
      <h2 className="header-saved__title">Saved articles</h2>
      <h3 className="header-saved__subtitle">
        <span className="header-saved__user">{"Benyo"}</span>, you have 3 saved
        articles
      </h3>
      <h4 className="header-saved__keywords">
        By keywords:&nbsp;
        <span className="header-saved__keywords-list">Bears</span>
      </h4>
    </header>
  );
}
