import { Component } from "react";
import mlbAPI from "../api/mlbAPI";
import TeamData from "../components/TeamData";
import UserContext from "../contexts/UserContext";

class TeamDataPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    team: null,
    mode: TeamDataPage.MODE_TYPE.VIEW,
  };

  async getTeam() {
    try {
      let teamId = this.props.match.params.teamId;
      let token = this.context ? this.context.token : null;
      let teamData = await mlbAPI.getTeamById(teamId, token);
      if (teamData) {
        this.setState({ team: teamData });
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updateTeam = async () => {
    try {
      let inputName = document.getElementById("team-name");
      let inputWins = document.getElementById("team-wins");
      let inputLosses = document.getElementById("team-losses");

      let teamId = this.state.team.id;
      let token = this.context ? this.context.token : null;
      if (inputName && inputWins && inputLosses && teamId && token) {
        let updatedTeam = {
          league: this.state.team.league,
          division: this.state.team.division,
          name: inputName.value,
          wins: inputWins.value,
          losses: inputLosses.value,
        };
        let data = await mlbAPI.updateTeamData(teamId, updatedTeam, token);
        if (data) {
          this.setState({ team: data });
          this.changeMode(TeamDataPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getTeam();
  }

  renderTeam() {
    if (!this.state.team) {
      return <p>No Team Found!</p>;
    }
    if (this.state.mode === TeamDataPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">Team: </h1>
            <input
              id="team-name"
              placeholder="name"
              defaultValue={this.state.team.name}
            />
          </div>
          <div>
            <h1 className="nonbreak">Wins: </h1>
            <input
              id="team-wins"
              placeholder="wins"
              defaultValue={this.state.team.wins}
            />
          </div>
          <div>
            <h1 className="nonbreak">Losses: </h1>
            <input
              id="team-losses"
              placeholder="losses"
              defaultValue={this.state.team.losses}
            />
          </div>
          <br />
          <button onClick={this.updateTeam}>Save</button>
          <button onClick={() => this.changeMode(TeamDataPage.MODE_TYPE.VIEW)}>
            Cancel
          </button>
        </div>
      );
    }
    return (
      <div>
        <TeamData team={this.state.team} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Team Data Page</h1>
        {this.renderTeam()}
        <hr />
        <button onClick={() => this.changeMode(TeamDataPage.MODE_TYPE.UPDATE)}>
          Update
        </button>
      </div>
    );
  }
}

TeamDataPage.contextType = UserContext;

export default TeamDataPage;
