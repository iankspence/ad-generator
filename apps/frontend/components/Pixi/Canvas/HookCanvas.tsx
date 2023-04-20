import dynamic from 'next/dynamic';

const HookCanvas = dynamic(() => import('./HookCanvasClient'), { ssr: false });

export default HookCanvas;
