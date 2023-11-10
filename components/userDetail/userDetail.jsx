import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import "./userDetail.css";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

const DETAILS = "Info about ";

/**
 * Define UserDetail, a React componment of project #5
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    let newUser;
    this.state = {
      user: newUser
    };
    let newUserID = props.match.params.userId;
    let prom = fetchModel(`http://localhost:8080/user/${newUserID}`);
    prom.then(response => {
      newUser = response.data;
      console.log(newUser);
      this.setState({ user: response.data });
      this.props.changeView(
        DETAILS, `${newUser.name}`
      );
    });
  }



  componentDidUpdate = () => {
    let newUserID = this.props.match.params.userId;
    if (this.state.user._id !== newUserID) {
      let self = this;
      fetchModel(`http://localhost:8080/user/${newUserID}`).then(response => {
        let newUser = response.data;
        self.setState({ user: newUser });
        self.props.changeView(
          DETAILS,
          `${newUser.name}`
        );
      });
    }
  };

  render() {
    return this.state.user ? (
      <Grid container
      justify="space-evenly"
      alignItems="center"
      >
        <Grid xs={6} item>
          <Typography variant="h3">
          {`${this.state.user.name}`}
        </Typography>
        <Typography variant="h5">
          Based in {this.state.user.location}
        </Typography>
        </Grid>
        <Grid xs={4} item>
          <Button variant="contained" size="large">
          <Link to={`/photos/${this.state.user._id}`}>See photos</Link>
        </Button>
        </Grid>
        
      </Grid>
    ) : (
      <div />
    );
  }
}

export default UserDetail;
