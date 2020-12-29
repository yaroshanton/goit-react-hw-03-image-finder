import React, { Component } from 'react'
import PhotosApi from '../services/PhotosApi'
import Notification from './Notification/Notification'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import Button from './Button/Button'
import Loader from './Loader/Loader'
import Modal from './Modal/Modal'
import './styles.css'

// rfc

export default class App extends Component {
    state = {
        photos: '',
        error: null,
        serchQuery: '',
        page: 1,
        loading: false,
        disabled: false,
        largeImageURL: null
    }


    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.serchQuery;
        const nextQuery = this.state.serchQuery;

        if (prevQuery !== nextQuery) {
            this.fetchPhotos();
        }

        if (
            prevState.largeImageURL !== this.state.largeImageURL &&
            this.state.largeImageURL
        ) {
            this.setState({ disabled: true });
            window.addEventListener("keydown", this.closeModalWindow);
        }
    }

    closeModalWindow = (e) => {
        if (e.code === 'Escape' || e.target.id === 'overlay') {
            this.setState({ disabled: false, largeImageURL: null });
            window.removeEventListener("keydown", this.closeModalWindow);
        }
    }

    fetchPhotos = () => {
        const { serchQuery, page } = this.state

        this.setState({
            loading: true
        })

        PhotosApi.fetchWithQuery(serchQuery, page)
            .then((photos) => {
                this.setState(prevState => {
                    return {
                        photos: [...prevState.photos, ...photos],
                        page: prevState.page + 1
                    };
                });
                window.scrollTo({
                    top: document.documentElement.scrollHeight - 973,
                    behavior: "smooth",
                });
            })
            .catch(error => console.log(error))
            .finally(() => this.setState({ loading: false }))
    }

    handleFormSubmit = query => {
        this.setState({
            serchQuery: query, page: 1, photos: []
        })
    }

    handlerModalWindow = (largeImageURL) => {
        this.setState({ largeImageURL });
    };

    render() {

        const { photos, error, loading, disabled, largeImageURL } = this.state

        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.message}`} />}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {photos.length > 0 && <ImageGallery>
                    <ImageGalleryItem photos={photos} largeImg={this.handlerModalWindow} />
                </ImageGallery>}
                {photos.length > 0 && !loading && <Button onClick={this.fetchPhotos} />}
                {loading && <Loader />}
                {disabled && <Modal onClose={this.closeModalWindow}>
                    <img src={largeImageURL} alt="Large Img" />
                </Modal>}
            </>
        )
    }
}