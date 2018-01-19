import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Switch, Route, HashRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/LandingPage.jsx';
import CreateEvent from './components/CreateEvent.jsx';
import EventMap from './components/EventMap.jsx';
import LoadingPage from './components/LoadingPage.jsx';
import EventList from './components/EventList.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div style={{"padding": "30px", "textAlign": "center"}}>
        <main style={{"display": "inlineBlock", "padding": "50px"}}>

          <Switch>
            <Route exact path="/" component={LandingPage}/>
            <Route exact path="/create" component={CreateEvent}/>
            <Route exact path="/event/:number/:userName" component={EventMap}/>
            <Route exact path="/submit" component={LoadingPage}/>
            <Route exact path="/eventList/:name/:number" component={EventList}/>
          </Switch>
        </main>
      </div>
    );
  }
}


ReactDOM.render((
<MuiThemeProvider>
  <HashRouter>
    <App />
  </HashRouter>
</MuiThemeProvider>
), document.getElementById('app'));
