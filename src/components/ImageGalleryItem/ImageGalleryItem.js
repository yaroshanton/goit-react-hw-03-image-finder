import React, { Component } from "react";
import ImageItem from "./ImageItem";
import PropTypes from "prop-types";

export default class ImageGalleryItem extends Component {
    static propTypes = {
        largeImg: PropTypes.func.isRequired,
        images: PropTypes.array.isRequired
    };

    onClickImage = () => {
        this.props.largeImg();
    };

    render() {
        const { photos, largeImg } = this.props;
        return (
            <ul className="ImageGallery">
                {photos.map((photo) => {
                    return <ImageItem image={photo} largeImg={largeImg} key={photo.id} />;
                })}
            </ul>
        );
    }
}