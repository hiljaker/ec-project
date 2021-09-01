import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import "./App.css"
import Home from './pages/home';
import { Login } from './pages/user';
import { LoginAction } from './redux/actions';


class App extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    let id = localStorage.getItem("id");
    if (id) {
      axios
        .get(`http://localhost:7000/users/${id}`)
        .then((res) => {
          this.props.LoginAction(res.data);
        })
        .catch((err) => {
          alert("server error");
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Loadingg</h1>
        </div>
      );
    }
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    )
  }
}

export default App;