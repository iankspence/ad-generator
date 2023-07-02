import ReactPixel from 'react-facebook-pixel';

export default function initFacebookPixel() {
    ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID);
    ReactPixel.pageView();
}
