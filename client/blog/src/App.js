import React, { Fragment } from "react";
import MenuBar from "./components/MenuBar";
import AddBlog from "./components/AddBlog";
import Dashboard from "./components/dashboard"
import "./App.css";
import register from './components/register'
import login from "./components/login";
import Viewblogs from './components/Viewblogs'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Single_blog from "./components/Single_blog"

import authenticated from "./authentication"
// import BlogCard from "./components/BlogCard";
function App() {
  return (
    <Router>
      <div>
        <MenuBar />
        <div className="links">





        </div>

        <Switch>



          {
            authenticated(localStorage.getItem("token")) ? <Fragment>
              <Route path="/create" exact component={AddBlog} />
                <Route path="/:username/:blog_id" exact component={Single_blog} />

              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/" exact component={Viewblogs} />

            </Fragment>
              :
              <Fragment>


                <Route path="/login" exact component={login} />

                <Route path="/:username/:blog_id" exact component={Single_blog} />

                <Route path="/signup" exact component={register} />
                <Route path="/" exact component={Viewblogs} />

              </Fragment>
          }
          <Route path="" exact component={Viewblogs} />
          

        </Switch>
        <div className="App"></div>
      </div>

    </Router>
  );
}

export default App;
