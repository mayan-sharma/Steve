import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
// import Login from "./components/auth/Login";
// import NavBar from "./components/dashboard/navbar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

// class Root extends React.Component {
//   componentDidMount() {
//     document.body.style = "background: rgb(145, 145, 145, .6)";
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <NavBar />
//         <Switch>
//           <Route exact path="/" component={App} />
//           <Route exact path="/login" component={Login} />
//         </Switch>
//       </React.Fragment>
//     );
//   }
// }

// const RootWithHistory = withRouter(Root);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      {/* <RootWithHistory /> */}
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
