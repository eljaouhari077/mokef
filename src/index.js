import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./App";
import Firebase, { FirebaseContext } from "./firebase";
import UserProvider from "./contexts/user-context";
import SelectedAnnounceProvider from "./contexts/selected-announce-context";
import SelectedJobProvider from "./contexts/selected-job.context";
import "antd/dist/antd.css";
import "./index.css";
import "video-react/dist/video-react.css";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <UserProvider>
      <SelectedAnnounceProvider>
        <SelectedJobProvider>
          <Router>
            <App />
          </Router>
        </SelectedJobProvider>
      </SelectedAnnounceProvider>
    </UserProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
