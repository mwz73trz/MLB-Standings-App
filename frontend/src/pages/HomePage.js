import { Component } from "react";
import { Link } from "react-router-dom";
import Leagues from "../components/Leagues";
import mlbAPI from "../api/mlbAPI";
import UserContext from "../contexts/UserContext";

class HomePage extends Component {
  state = {
    leagues: [],
  };

  getLeagues = async () => {
    try {
      let token = this.context ? this.context.token : null;
      if (token) {
        let leagueData = await mlbAPI.getLeagues(token);
        this.setState({ leagues: leagueData });
      }
    } catch {}
  };

  componentDidMount() {
    this.getLeagues();
  }

  renderWelcome() {
    if (!this.context) {
      return (
        <Link to="/login">
          <button>Login</button>
        </Link>
      );
    }
    let leagueElements = this.state.leagues.map((league, index) => {
      return (
        <li key={`league-${index}`}>
          <Leagues league={league} />
        </li>
      );
    });

    return (
      <div>
        <h2>Welcome to Your MLB Standings App {this.context.user.username}</h2>
        <h2>Leagues</h2>
        <ul className="simple-list" style={{ listStyle: "none" }}>
          {leagueElements}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

HomePage.contextType = UserContext;

export default HomePage;
