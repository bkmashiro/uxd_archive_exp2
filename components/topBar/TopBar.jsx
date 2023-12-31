import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import "./TopBar.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React componment of project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.props.view,
      version: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.view !== this.props.view) {
      this.setState({ view: this.props.view });
      let prom = fetchModel("http://localhost:8080/test/info");
      prom.then(response => {
        this.setState({ version: response.data.__v });
      });
    }
  }

  render() {
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="inherit">
              Photo Sharing Single Page App
            </Typography>
            <Typography variant="body1">
              version: {this.state.version}
            </Typography>
            <Typography variant="h5">{this.state.view}</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
