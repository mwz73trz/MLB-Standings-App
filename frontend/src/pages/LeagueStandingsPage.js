import { Component } from "react";
import { Link } from "react-router-dom";
import mlbAPI from "../api/mlbAPI";
import UserContext from "../contexts/UserContext";

class LeagueStandingsPage extends Component {
  state = {
    league: null,
  };

  async getLeague() {
    try {
      let leagueId = this.props.match.params.leagueId;
      let token = this.context ? this.context.token : null;
      let leagueData = await mlbAPI.getLeagueById(leagueId, token);
      if (leagueData) {
        this.setState({ league: leagueData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getLeague();
  }

  renderTeams() {
    let teamElements = this.state.league.teams.map((team, index) => {
      return (
        <tbody key={`team-${index}`}>
          <tr>
            <td>{team.name}</td>
            <td>{team.wins}</td>
            <td>{team.losses}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        {teamElements}
      </table>
    );
  }

  renderLeagueStanding() {
    if (!this.state.league) {
      return <p>No Teams Found!</p>;
    }
    return (
      <div>
        <h1>
          <Link to={`/divisions/${this.state.league.id}`}>
            {this.state.league.name} Standings
          </Link>
        </h1>
        {this.renderTeams()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>League Standings Page</h1>
        {this.renderLeagueStanding()}
      </div>
    );
  }
}

LeagueStandingsPage.contextType = UserContext;

export default LeagueStandingsPage;
