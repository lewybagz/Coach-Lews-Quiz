import { useState } from "react";
import PropTypes from "prop-types";

export const FormComponent = ({ setFormVisible, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");

  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    const existingUsernames = localStorage.getItem("usernames")
      ? localStorage.getItem("usernames").split(",")
      : [];

    if (existingUsernames.includes(username)) {
      setUsernameWarning("Username already exists. Please try again.");
      return;
    }

    // Successful username creation
    localStorage.setItem("currentUser", username);
    existingUsernames.push(username);
    localStorage.setItem("usernames", existingUsernames.join(","));

    setUsername(username);
    setFormVisible(false);
    onSubmit();
  };

  return (
    <section id="form-wrapper">
      <form id="usernameForm" onSubmit={handleUsernameSubmit}>
        <h1 id="login-title">Choose A Cool Nickname</h1>
        <h3>(Your Football Nickname Works Fine Here)</h3>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="usernameInput"
            aria-placeholder="Username"
            placeholder="Username"
            aria-required="true"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="usernameInput">Nickname</label>
        </div>
        <button type="submit" disabled={!username}>
          Submit
        </button>
        <div id="username-warning">{usernameWarning}</div>
      </form>
    </section>
  );
};

FormComponent.propTypes = {
  setFormVisible: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
