import { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

class TeamData extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>{this.props.team.name}</CardTitle>
            <CardText>{this.props.team.wins}</CardText>
            <CardText>{this.props.team.losses}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TeamData;
