import { useState, useEffect } from "react";

export default function PopupWithForm(props) {
  const {
    isLoginFormOpen,
    closeAllPopups,
    handleLoginSubmit,
    handleSignupSubmit,
  } = props;
  const [isLoggingIn, setLoggingIn] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(" ");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(" ");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(" ");
  const [isInputValid, setInputValid] = useState(false);
  const emailTestPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    setLoggingIn(true);
    setInputValid(false);
  }, [isLoginFormOpen]);

  useEffect(() => {
    if (!emailError && !passwordError && (!usernameError || isLoggingIn)) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [emailError, passwordError, usernameError, isLoggingIn]);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (!event.target.value) {
      setEmailError("Email is required");
    } else if (!emailTestPattern.test(event.target.value)) {
      setEmailError("Incorrect email.");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    if (!event.target.value) {
      setPasswordError("Password is required.");
    } else if (event.target.value.length < 3) {
      setPasswordError("The password is too short.");
    } else {
      setPasswordError("");
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    if (!event.target.value) {
      setUsernameError("Username is required.");
    } else if (event.target.value.length < 3) {
      setUsernameError("The username is too short.");
    } else {
      setUsernameError("");
    }
  }

  function handleClose() {
    closeAllPopups();
  }

  function handleLogSwitch() {
    setLoggingIn(!isLoggingIn);
  }

  function handleSubmit(event) {
    isLoggingIn
      ? handleLoginSubmit(event, email, password)
      : handleSignupSubmit(event, email, password, username);
  }

  return (
    <div
      className={`popup ${isLoginFormOpen && "popup_active"}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <h2 className="popup__title">{isLoggingIn ? "Sign in" : "Sign up"}</h2>
      <form className="popup__form" onSubmit={handleSubmit} noValidate>
        <label className="popup__input-label">
          Email
          <input
            className="popup__input"
            placeholder="Enter email"
            type="email"
            required
            autoComplete="current-email"
            value={email}
            onChange={handleEmailChange}
          />
          <p className="popup__error">{emailError}</p>
        </label>

        <label className="popup__input-label">
          Password
          <input
            className="popup__input"
            placeholder="Enter password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="popup__error">{passwordError}</p>
        </label>

        {!isLoggingIn && (
          <label className="popup__input-label">
            Username
            <input
              className="popup__input"
              placeholder="Enter your username"
              type="text"
              minLength={2}
              required
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <p className="popup__error">{usernameError}</p>
          </label>
        )}

        <button
          className={`popup__submit-button ${
            isInputValid && "popup__submit-button_active"
          }`}
          type="submit"
        >
          {isLoggingIn ? "Sign in" : "Sign up"}
        </button>
      </form>

      <p className="popup__log-select" onClick={handleLogSwitch}>
        {isLoggingIn ? " or Sign in" : "or Sign in"}
      </p>

      <button className="popup__close" onClick={handleClose}>
        &#10005;
      </button>
    </div>
  );
}
