import React, { Component } from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './loader.css'


export default class App extends Component {
    render() {
        return (
            <Loader className="loader"
                type="ThreeDots"
                color="#3f51b5"
                height={100}
                width={100}
                timeout={5000}
            />
        );
    }
}