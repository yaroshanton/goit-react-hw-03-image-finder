import React, { Component } from 'react'
import PhotosApi from '../services/PhotosApi'
import Notification from './Notification/Notification'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import Button from './Button/Button'
import Loader from './Loader/Loader'
import './styles.css'

// rfc

export default class App extends Component {
    state = {
        photos: '',
        error: null,
        serchQuery: '',
        page: 1,
        loading: false
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevState.serchQuery;
        const nextQuery = this.state.serchQuery;

        if (prevQuery !== nextQuery) {
            this.fetchPhotos();
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

    render() {

        const { photos, error, loading } = this.state

        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.message}`} />}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {photos.length > 0 && <ImageGallery>
                    <ImageGalleryItem photos={photos} />
                </ImageGallery>}
                {photos.length > 0 && !loading && <Button onClick={this.fetchPhotos} />}
                {loading && <Loader />}
            </>
        )
    }
}