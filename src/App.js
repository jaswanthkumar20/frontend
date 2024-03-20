import "./App.css";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/home" component={Home} />>
    </Switch>
  </BrowserRouter>
);

export default App;
