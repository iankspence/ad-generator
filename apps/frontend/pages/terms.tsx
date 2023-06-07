import React, { useEffect } from 'react';

const TermsPage = () => {

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
            'data-id': 'b3fcb575-4a66-47f0-a859-c2d908c6246d',
            'data-type': 'iframe',
        });
    };

    return createPolicyDiv();
}

export default TermsPage;
