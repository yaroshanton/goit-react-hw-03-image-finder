import React from 'react';

export default function Button({ onClick }) {
    return (
        <button className="Button" type="button" onClick={onClick}> Load more </button>
    );
}