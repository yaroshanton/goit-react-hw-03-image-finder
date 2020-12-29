import React from "react";
import PropTypes from "prop-types";

function Modal({ onClose, children }) {
    return (
        <div className="Overlay" onClick={onClose}>
            <div className="Modal">
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default Modal;