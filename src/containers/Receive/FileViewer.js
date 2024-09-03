import React, { Component } from "react";
import "./FileViewer.css";
import Loader from "../../components/loader";
import { Link } from "react-router-dom";
import config from "../../config";
class ImageViewer extends Component {
  state = {
    images: [],
    loading: false,
    error: false,
    downloadSpinner: false,
    downloadImage: null,
  };

  componentDidMount() {
    // Make API call to get image names
    this.fetchImagesList();
  }

  fetchImagesList = () => {
    this.setState({ loading: true });
    let url = `${config.URL}${config.listImages}`;
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Failed to fetch images");
      })
      .then((data) => {
        this.setState({ images: data, loading: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ loading: false, error: true });
      });
  };

  onDownloadHandler = (event, img) => {
    event.preventDefault();
    this.setState({ downloadSpinner: true, downloadImage: img });
    //get call to download image
    let downloadUrl = `${config.URL}${
      config.downloadImage
    }?image=${encodeURIComponent(img)}`;
    fetch(downloadUrl)
      .then((response) => {
        if (response.status === 200) {
          return response.blob();
        } else {
          throw new Error("Failed to download image");
        }
      })
      .then((blob) => {
        this.downloadImage(blob, img);
        this.setState({ downloadSpinner: false, error: false });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ downloadSpinner: false, error: true });
        alert("File download failed");
      });
  };

  downloadImage = (res, fn) => {
    const url = window.URL.createObjectURL(res);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fn);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  render() {
    const { images } = this.state;

    return (
      <div
        className={this.state.loading ? "container" : "container img-container"}
      >
        {this.state.loading ? (
          <Loader />
        ) : this.state.error ? (
          <div className="error">Can't connect to Server Try Again!!</div>
        ) : (
          <>
            <div className="title">
              <Link to="/" className="back">
                Back
              </Link>
              <h1>Files on Server</h1>
            </div>
            <div className="images">
              {images.length > 0 ? (
                <ul>
                  {console.log(this.state.downloadImage)}
                  {images.map((image, index) => (
                    <li key={Math.random() + image}>
                      <span className="sno">{index + 1}</span>
                      <span className="name">{image}</span>
                      <div className="action">
                        <button
                          onClick={(event) =>
                            this.onDownloadHandler(event, image)
                          }
                        >
                          {this.state.downloadSpinner &&
                          this.state.downloadImage === image ? (
                            <Loader />
                          ) : (
                            "Download"
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p> No Images found on the server</p>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default ImageViewer;
