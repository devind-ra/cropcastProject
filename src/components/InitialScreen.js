import React from "react";
// Component which loads the initial screen before the information is all presented
const InitialScreen = () => {
    return (
        <div className={`initial-screen`}>
            {/* Initial screen info */}
            <h1>Welcome to CropCast</h1>
            <p>Empowering Farmers with Precision Weather Forecasting</p>
        </div>
    );
};

export default InitialScreen; 