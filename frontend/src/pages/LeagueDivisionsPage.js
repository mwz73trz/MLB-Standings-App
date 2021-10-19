import { Component } from "react";
import { Link } from "react-router-dom";
import mlbAPI from "../api/mlbAPI";
import UserContext from "../contexts/UserContext";

class LeagueDivisionsPage extends Component {
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

  renderDivisions() {
    let divisionElements = this.state.league.divisions.map(
      (division, index) => {
        return (
          <li key={`division-${index}`}>
            <Link to={`/divisions/${division.id}`}>{division.name}</Link>
          </li>
        );
      }
    );
    return <ul style={{ listStyle: "none" }}>{divisionElements}</ul>;
  }

  renderLeagueDivisions() {
    if (!this.state.league) {
      return <p>No Divisions Found!</p>;
    }
    return <div>{this.renderDivisions()}</div>;
  }

  render() {
    return (
      <div>
        <h1>Division Standings</h1>
        {this.renderLeagueDivisions()}
      </div>
    );
  }
}

LeagueDivisionsPage.contextType = UserContext;

export default LeagueDivisionsPage;
