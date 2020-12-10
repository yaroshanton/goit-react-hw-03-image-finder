import React from 'react'

export default function ImageGalleryItem({ photos }) {
    return (
        <>
            {
                photos.map(({ id, webformatURL }) => (
                    <li key={id} className="ImageGalleryItem">
                        <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
                    </li>
                ))
            }

        </>
    )
}