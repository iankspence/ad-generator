import dynamic from 'next/dynamic';

const ClaimCanvas = dynamic(() => import('./ClaimCanvasClient'), { ssr: false });

export default ClaimCanvas;
