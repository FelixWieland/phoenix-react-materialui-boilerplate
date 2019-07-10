import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Debug } from 'components';

import Home from './../components/Pages/Home'
import Error404 from './../components/Pages/Error404';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

class Root extends Component {

  render() {
    //pass props to route component with: {...props}
    return (
      <div className="full-height">
        <Debug />
        <Router history={this.props.history}>
          <MuiThemeProvider theme={theme}>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route component={Error404} />
            </Switch>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default Root;
