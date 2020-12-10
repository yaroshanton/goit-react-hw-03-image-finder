import React from 'react'

export default function ImageGallery({ children }) {
    return (
        <>
            <ul className="ImageGallery">
                {children}
            </ul>
        </>
    )
}