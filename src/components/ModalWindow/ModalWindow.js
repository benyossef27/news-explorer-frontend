import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Info from "../Info/Info";
import Preloader from "../Preloader/Preloader";

export default function ModalWindow(props) {
  const {
    isModalOpen,
    isLoginFormOpen,
    isPreloaderOpen,
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
      <Preloader isPreloaderOpen={isPreloaderOpen} />
      <Info
        isInfoOpen={isInfoOpen}
        redirectToLogin={redirectToLogin}
        closeAllPopups={closeAllPopups}
      />
    </div>
  );
}
