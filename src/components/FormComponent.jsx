import { useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { logEvent } from "firebase/analytics";
import { firebaseConfig } from "../services/firebaseConfig";

export const FormComponent = ({ setFormVisible, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [usernameWarning, setUsernameWarning] = useState("");
  const db = getDatabase();

  const handleUsernameSubmit = (e) => {
    e.preventDefault();

    const userRef = ref(db, "usernames/");
    get(child(userRef, username)).then((snapshot) => {
      if (snapshot.exists()) {
        setUsernameWarning("Username already exists. Please try again.");
        logEvent(firebaseConfig.analytics, "username_warning");

        return;
      } else {
        set(ref(db, "usernames/" + username), username);

        setUsername(username);
        setFormVisible(false);
        onSubmit();
      }
    });
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
  setUsername: PropTypes.func.isRequired,
};
