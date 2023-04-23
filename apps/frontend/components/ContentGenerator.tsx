import dynamic from 'next/dynamic';

const ContentGenerator = dynamic(() => import('./ContentGeneratorClient'), { ssr: false });

export default ContentGenerator;
