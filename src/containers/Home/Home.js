import React,{Component} from "react";
import Loader from "../../components/loader";
import "./Home.css";
class Home extends Component {
  state = {
    loading:false,
    error:false
  }
  componentDidMount() {
    this.setState({loading:true});
    fetch(this.props.base).then((data) => {
      if(data.status === 200) {
        this.setState({loading: false});
        this.setState({error:false});
      }
    }).catch((error) => {
      this.setState({loading: false});
      this.setState({error:true});
      console.log(error);
    });
  }

  render() {
    return (
      <div className="container"> {
        this.state.loading ? <Loader /> : this.state.error ? <div className="error">Can't connect to Server Try Again!!</div> :(
            <div>
              <a href="/upload" className="uplbtn">Send</a>
              <a href="/receive" className="recbtn">Receive</a>
            </div>
        )
      }
      </div>
    );
  }
}

export default Home;