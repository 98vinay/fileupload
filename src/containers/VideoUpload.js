import React,{Component} from "react";
import Loader from "../components/loader";
class VideoUpload extends Component {
  state = {
    loading:true,
  }
  render() {
    return (
      <div>
        {this.state.loading? <Loader />  : <h1>Hello world</h1>} 
      </div>
    );
  }
}

export default VideoUpload;