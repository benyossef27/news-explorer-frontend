import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Info from "../Info/Info";

export default function ModalWindow(props) {
  const {
    isModalOpen,
    isLoginFormOpen,
    isInfoOpen,
    closeAllPopups,
    redirectToLogin,
    handleLoginSubmit,
    handleSignupSubmit,
  } = props;

  return (
    <div
      className={`modal ${isModalOpen && "modal_active"}`}
      onClick={closeAllPopups}
    >
      <PopupWithForm
        isLoginFormOpen={isLoginFormOpen}
        closeAllPopups={closeAllPopups}
        handleLoginSubmit={handleLoginSubmit}
        handleSignupSubmit={handleSignupSubmit}
      />
      <Info
        isInfoOpen={isInfoOpen}
        redirectToLogin={redirectToLogin}
        closeAllPopups={closeAllPopups}
      />
    </div>
  );
}
