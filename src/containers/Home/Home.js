import React, { Component } from "react";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import config from "../../config";
import "./Home.css";
class Home extends Component {
  state = {
    loading: false,
    error: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    fetch(this.props.base)
      .then((data) => {
        if (data.ok) {
          this.setState({ loading: false, error: false });
        } else {
          throw new Error("Network response was not ok." + data.statusText);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.setState({ error: true });
        console.log(error.message);
      });
  }

  render() {
    const { loading, error } = this.state;
    return (
      <div className="container">
        {" "}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error">Can't connect to Server Try Again!!</div>
        ) : (
          <div>
            <Link to={config.upload} className="uplbtn">
              Send
            </Link>
            <Link to={config.receive} className="recbtn">
              Receive
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
