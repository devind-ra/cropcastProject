import React from "react";
//Component used to represent the information at the beginning when the application is opened 
const InitialScreen = () => {
    return (
        <div className={`initial-screen`}>
            <h1>Welcome to CropCast</h1>
            <p>Empowering Farmers with Precision Weather Forecasting</p>
        </div>
    );
};

export default InitialScreen; 