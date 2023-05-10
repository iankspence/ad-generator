export const handleImageUpload = (event, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    }
};
