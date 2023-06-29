import { shortenMaskName } from './shortenMaskName';

describe('shortenMaskName', () => {
    test('should shorten a mask name by removing the first two sections', () => {
        const maskName = 'mask-hook-basic-swoosh-tall-base-1';
        const result = shortenMaskName(maskName);
        expect(result).toEqual('basic-swoosh-tall-base-1');
    });

    test('should return the same name if there are less than three sections', () => {
        const maskName = 'mask-hook';
        const result = shortenMaskName(maskName);
        expect(result).toEqual('mask-hook');
    });

    test('should handle mask names with multiple sections', () => {
        const maskName = 'mask-hook-section1-section2-section3-section4';
        const result = shortenMaskName(maskName);
        expect(result).toEqual('section1-section2-section3-section4');
    });
});
