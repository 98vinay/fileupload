import React, { Component } from "react";
import Loader from "../../components/loader";
import FileInput from "../../components/file";
import "./VideoUpload.css";
import config from "../../config";
import { Link } from "react-router-dom";
class VideoUpload extends Component {
  state = {
    loading: false,
    file: null,
    uploadStatus: true,
    filename: "",
    error: false,
  };

  onChangeHandler = (event) => {
    if (event.target.files.length)
      this.setState({ file: event.target.files[0], uploadStatus: false });
  };
  onFilenameChangeHandler = (event) => {
    this.setState({ filename: event.target.value });
  };
  onFileresetHandler = () => {
    this.setState({ file: null, uploadStatus: true, filename: "" });
    document.querySelector("#file").value = "";
  };
  onformSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    this.setState({ loading: true });
    data.append("file", this.state.file);
    data.append("filename", this.state.filename);
    const url = config.URL + config.upload;
    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.status === 200) {
          alert("File uploaded successfully");
          event.target.reset();
          this.setState({
            loading: false,
            uploadStatus: true,
            file: null,
            error: false,
            filename: "",
          });
        }
      })
      .catch((error) => {
        event.target.reset();
        alert("File upload failed");
        this.setState({
          loading: false,
          uploadStatus: true,
          file: null,
          error: true,
          filename: "",
        });
        console.log(error);
      });
  };
  render() {
    return (
      <div
        className={this.state.loading ? "container" : "container img-container"}
      >
        {this.state.loading ? (
          <Loader />
        ) : (
          <>
            <div className="title">
              <Link to="/" className="back">
                Back
              </Link>
              <h1>Upload to Server</h1>
            </div>
            <div>
              <form onSubmit={this.onformSubmit}>
                <FileInput
                  onChange={this.onChangeHandler}
                  filename={this.state.filename}
                  filenameChangeHandler={this.onFilenameChangeHandler}
                  selectedFile={this.state.file}
                  resetFileInput={this.onFileresetHandler}
                />
                <button
                  type="submit"
                  className="upload_btn"
                  disabled={this.state.uploadStatus}
                >
                  Upload
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default VideoUpload;
