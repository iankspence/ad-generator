import React, { useEffect } from 'react';

const PrivacyPolicy = () => {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.termly.io/embed-policy.min.js";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Function to create the div element with custom attributes
    const createPolicyDiv = () => {
        return React.createElement('div', {
            name: 'termly-embed',
            'data-id': 'bba5899a-081a-4a9b-b092-e6e697e6b79f',
            'data-type': 'iframe',
        });
    };

    return (
        <div className="bg-reviewDrumLightGray min-h-screen">
            {createPolicyDiv()}
        </div>
    );
}

export default PrivacyPolicy;
