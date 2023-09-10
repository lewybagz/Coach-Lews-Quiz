import PropTypes from "prop-types";

export const LeaderboardComponent = ({ users }) => {
  return (
    <section id="leaderboard">
      <h1>Top 5</h1>
      <ul className="leaderboard-list">
        {users.map((user, index) => (
          <li
            key={index}
            id={`user-${index}`}
            className={`list-item ${index === 0 ? "first-item" : ""} ${
              index === users.length - 1 ? "last-item" : ""
            }`}
          >
            {index === 0 && <i className="fa-solid fa-trophy"></i>}
            <span id="styled-username">{user.name} - </span>
            <span id="styled-score"> {user.score} </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

LeaderboardComponent.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
