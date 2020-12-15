import React, { Component } from 'react'
import PhotosApi from '../services/PhotosApi'
import Notification from './Notification/Notification'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import Button from './Button/Button'
import './styles.css'

// rfc

export default class App extends Component {
    state = {
        photos: '',
        error: null,
        serchQuery: '',
        page: 1,
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
        PhotosApi.fetchWithQuery(serchQuery, page)
            .then(photos => this.setState(prevState => ({
                photos: [...prevState.photos, ...photos],
                page: prevState.page + 1
            })))
            .catch(error => console.log(error))
    }

    handleFormSubmit = query => {
        this.setState({
            serchQuery: query, page: 1, photos: []
        })
    }

    render() {

        const { photos, error } = this.state

        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.message}`} />}
                <Searchbar onSubmit={this.handleFormSubmit} />
                {photos.length > 0 && <ImageGallery>
                    <ImageGalleryItem photos={photos} />
                </ImageGallery>}
                {photos.length > 0 && <Button onClick={this.fetchPhotos} />}
            </>
        )
    }
}