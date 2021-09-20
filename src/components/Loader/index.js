import React from 'react';
import logo from '../../assets/img/logo.jpeg'

const Loader = () => {

    return (
        <div
        style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        }}
        >
            <img style={{ maxWidth: "500px" }} alt="Loader" src={logo} />
        </div>
    )
}

export default Loader;