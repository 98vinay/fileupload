import React, { Component } from 'react';
import './ImageViewer.css';
import Loader from '../../components/loader';
class ImageViewer extends Component {
    state= {
        images: [],
        loading: false,
        error: false,
        getImages: '/getImages',
        downdloadImage: '/downloadImage'

    }

    componentDidMount() {
        // Make API call to get image names
        this.setState({ loading: true });
        fetch(this.props.base + this.state.getImages)
            .then(response => response.json())
            .then(data => {
                this.setState({ images: data });
                this.setState({ loading: false });
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({ loading: false });
                this.setState({ error: true });
            });
    }

    onDownloadHandler = (event) => {
        event.preventDefault();
    }

    render() {
        const { images } = this.state;

        return (
            <div className={this.state.loading ? 'container' : 'container img-container'}>
                {
                    this.state.loading ? <Loader /> : this.state.error ? <div className="error">Can't connect to Server Try Again!!</div> : (
                
                <>
                <div className='title'>
                    <h1>Images on Server</h1>
                </div>
                <div className='images'>
                {
                    images.length > 0 ? (<ul>
                    {images.map((image,index) => (
                        <li key={Math.random()}>
                            <span className='sno'>{index+1}</span>
                            <span className='name'>{image}</span>
                            <button onClick={() => this.handleDownload(image)}>Download</button>
                        </li>
                    ))}
                </ul>) : <p> No Images found on the server</p>
                }

                </div>
                </>)}
            </div>
        );
    }

    handleDownload(image) {
        // Implement download logic here
        console.log('Downloading image:', image.name);
    }
}

export default ImageViewer;