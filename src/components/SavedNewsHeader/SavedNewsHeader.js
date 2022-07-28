import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import makeListOfKeywords from "../../utils/makeListOfKeywords";

export default function SavedNewsHeader(props) {
  const { savedArticles } = props;
  const [numberOfArticles, setNumberOfArticles] = useState();
  const [keyWords, setKeyWords] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNumberOfArticles(savedArticles.length);
    setKeyWords(makeListOfKeywords(savedArticles));
  }, [savedArticles]);

  return (
    <header className="header-saved">
      <h2 className="header-saved__title">Saved articles</h2>
      <h3 className="header-saved__subtitle">
        <span className="header-saved__user">{currentUser.name}</span>, you have{" "}
        {numberOfArticles} saved articles
      </h3>
      <h4 className="header-saved__keywords">
        By keywords:&nbsp;
        <span className="header-saved__keywords-list">{keyWords}</span>
      </h4>
    </header>
  );
}
