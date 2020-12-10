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
    }

    componentDidMount() {


    }

    fetchPhotos = query => {
        PhotosApi.fetchWithQuery({ query })
            .then(photos => this.setState({ photos }))
            .catch(error => this.setState({ error }))
    }



    render() {
        const { photos, error } = this.state
        return (
            <>
                {error && <Notification message={`Whoops, something went wrong: ${error.message}`} />}
                <Searchbar onSubmit={this.fetchPhotos} />
                {photos.length > 0 && <ImageGallery>
                    <ImageGalleryItem photos={photos} />
                </ImageGallery>}
                {photos.length > 0 && <Button />}
            </>
        )
    }
}