import React,{Component} from "react";
import Loader from "../../components/loader";
import FileInput from "../../components/file";
import "./VideoUpload.css";
class VideoUpload extends Component {
  state = {
    loading:true,
    file:null,
    uploadStatus:true,
  }
  
  onChangeHandler = (event) => {
    this.setState({file:event.target.files[0]});
    this.setState({uploadStatus:false});
  }
  onformSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    this.setState({loading:true});
    data.append('file',this.state.file);
    fetch(this.props.base, {
      method: 'POST',
      body: data
    }).then((response) => {
      if(response.status === 200) {
        alert('File uploaded successfully');
        event.target.reset();
        this.setState({loading:false});
        this.setState({uploadStatus:true});
        this.setState({file:null});
        this.setState({error:false});
      }
    }).catch((error) => {
      this.setState({loading:false});
      event.target.reset();
      alert('File upload failed');
      this.setState({uploadStatus:true});
      this.setState({file:null});
      this.setState({error:true});
      console.log(error);
    });
  }
  render() {
    return (
      <div className="container">
        {this.state.loading? <Loader /> : (<div>
          <form onSubmit={this.onformSubmit}>
          <FileInput onChange={this.onChangeHandler} /> 
          <button type="submit" className="upload_btn" disabled={this.state.uploadStatus}>Upload</button>
          </form>
          </div>)}
      </div>
    );
  }
}

export default VideoUpload;