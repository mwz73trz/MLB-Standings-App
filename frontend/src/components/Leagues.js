import { Component } from "react";
import { Link } from "react-router-dom";

class Leagues extends Component {
  render() {
    return (
      <span>
        <Link to={`/leagues/${this.props.league.id}`}>
          {this.props.league.name}
        </Link>
      </span>
    );
  }
}

export default Leagues;
