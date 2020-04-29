import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {

  state = {
    users: []
  };

  async componentDidMount() {
    const { data } = await http.get(config.apiEndpoint);
    this.setState({ users: data.data });
  }

  handleAdd = async () => {
    const obj = { first_name: "Antonio", last_name: "Esposito" };
    const { data: user } = await http.post(config.apiEndpoint, obj);
    const users = [user, ...this.state.users];
    this.setState({ users: users });
  };

  handleUpdate = async user => {
    user.first_name = "UPDATED";
    await http.put(config.apiEndpoint + "/" + user.id, user);
    const users = [...this.state.users];
    const index = users.indexOf(user);
    users[index] = { ...user };
    this.setState({ users });
  };

  handleDelete = async user => {
    const originalusers = [...this.state.users];

    const users = this.state.users.filter(p => p.id !== user.id);
    this.setState({ users });

    try {
      await http.delete(config.apiEndpoint + "/" + user.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This user has already been deleted.");
      this.setState({ users: originalusers });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name and Surname</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(user)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
