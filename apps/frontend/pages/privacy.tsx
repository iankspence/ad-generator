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
            'data-id': '288d3254-cd59-4f62-a62b-e69f2fa44daf',
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
