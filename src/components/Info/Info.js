export default function Info(props) {
  const { isInfoOpen, closeAllPopups, redirectToLogin } = props;

  return (
    <div
      className={`info ${isInfoOpen && "info_active"}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <h2 className="info__title">Registration successfully completed!</h2>
      <p className="info__redirect" onClick={redirectToLogin}>
        Sign in
      </p>
      <button className="info__close" onClick={closeAllPopups}>
        &#10005;
      </button>
    </div>
  );
}
