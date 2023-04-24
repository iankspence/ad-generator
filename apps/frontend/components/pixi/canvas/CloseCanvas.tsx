import dynamic from 'next/dynamic';

const CloseCanvas = dynamic(() => import('./CloseCanvasClient'), { ssr: false });

export default CloseCanvas;
