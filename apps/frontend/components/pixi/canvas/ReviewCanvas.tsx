import dynamic from 'next/dynamic';

const ReviewCanvas = dynamic(() => import('./ReviewCanvasClient'), { ssr: false });

export default ReviewCanvas;
