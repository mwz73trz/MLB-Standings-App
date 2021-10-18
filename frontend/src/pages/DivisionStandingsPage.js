import { Component } from "react";
import mlbAPI from "../api/mlbAPI";
import UserContext from "../contexts/UserContext";

class DivisionStandingsPage extends Component {
  state = {
    division: null,
  };

  async getDivision() {
    try {
      let divisionId = this.props.match.params.divisionId;
      let divisionData = await mlbAPI.getDivisionById(divisionId);
      if (divisionData) {
        this.setState({ division: divisionData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getDivision();
  }

  renderTeams() {
    let teamElements = this.state.division.teams.map((team, index) => {
      return (
        <tbody key={`team-${index}`}>
          <tr>
            <td>{team.name}</td>
            <td>{team.wins}</td>
            <td>{team.losses}</td>
            <td>{team.ties}</td>
          </tr>
        </tbody>
      );
    });
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          </tr>
        </thead>
        {teamElements}
      </table>
    );
  }

  renderDivision() {
    if (!this.state.division) {
      return <p>No Teams Found!</p>;
    }
    return (
      <div>
        <h1>{this.state.division.name}</h1>
        {this.renderTeams()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Division Standings Page</h1>
        {this.renderDivision()}
      </div>
    );
  }
}

DivisionStandingsPage.contextType = UserContext;

export default DivisionStandingsPage;
