import dynamic from 'next/dynamic';

const Canvas = dynamic(() => import('./CanvasClient'), { ssr: false });

export default Canvas;
