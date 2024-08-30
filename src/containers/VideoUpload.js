import React,{Component} from "react";
import Loader from "../components/loader";
import FileInput from "../components/file";
class VideoUpload extends Component {
  state = {
    loading:true,
    url: 'http://10.119.176.8:3001',
    file:null
  }
  componentDidMount() {
    fetch(this.state.url).then((data) => {
      if(data.status === 200) {
        this.setState({loading: false});
      }
    }).catch((error) => {
      this.setState({loading: true});
      console.log(error);
    });
  }
  onChangeHandler = (event) => {
    this.setState({file:event.target.files[0]});
  }
  onformSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('file',this.state.file);
    fetch(this.state.url, {
      method: 'POST',
      body: data
    }).then((response) => {
      console.log(response);
      if(response.status === 200) {
        alert('File uploaded successfully');
        event.target.reset();
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        {this.state.loading? <Loader />  : <div>
          <form onSubmit={this.onformSubmit}>
          <FileInput onChange={this.onChangeHandler} /> 
          <button type="submit">Upload</button>
          </form>
          </div>} 
      </div>
    );
  }
}

export default VideoUpload;