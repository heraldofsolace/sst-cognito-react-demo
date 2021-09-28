import "./App.css";
import { Route, Switch } from "react-router-dom";
import Authentication from "./Authentication";
import PrivateComponent from "./PrivateComponent";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Authentication} />
        <Route path="/private" exact component={PrivateComponent} />
      </Switch>
    </div>
  );
};

export default App;
