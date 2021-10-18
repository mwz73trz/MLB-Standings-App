import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LeagueStandingsPage from "./pages/LeagueStandingsPage";
import LeagueDivisionsPage from "./pages/LeagueDivisionsPage";
import DivisionStandingsPage from "./pages/DivisionStandingsPage";
import UserContext from "./contexts/UserContext";

class App extends Component {
  state = {
    user: null,
  };

  updateUser = (newUserData) => {
    this.setState({ user: newUserData });
  };

  renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={this.updateUser} />;
  };

  render() {
    return (
      <div className="App">
        <Router>
          <UserContext.Provider value={this.state.user}>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact render={this.renderLoginPage} />
              <Route
                path="/leagues/:leagueId"
                exact
                component={LeagueStandingsPage}
              />
              <Route
                path="/leagues/:leagueId"
                exact
                component={LeagueDivisionsPage}
              />
              <Route
                path="/divisions/:divisionId"
                exact
                component={DivisionStandingsPage}
              />
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
