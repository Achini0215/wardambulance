
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ward from './ward/ward';
import ambulance from './ambulance/ambulance';
import WardList from './ward/WardList';
import updateWard from './ward/updateWard';
import AmbulanceList from './ambulance/AmbulanceList';
import updateAmbulance from './ambulance/updateAmbulance';

function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route path='/ward' exact component={ward} />
      <Route path='/wardList' component={WardList} />
      <Route path='/updateWard' component={updateWard} />
      <Route path='/ambulance' component={ambulance} />
      <Route path='/ambulanceList' component={AmbulanceList} />
      <Route path='/updateAmbulance' component={updateAmbulance} />
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
