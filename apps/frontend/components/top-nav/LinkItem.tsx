import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export const LinkItem = ({ href, children, className = "" }) => {
    const router = useRouter();

    const [windowWidth, setWindowWidth] = useState(null);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isBetween = windowWidth >= 640 && windowWidth <= 765;

    const styles = isBetween ? { marginTop: '-2px' } : {};  // You might need to adjust '-1rem' to get the desired effect

    return (
        <span
            className={`block w-full text-center items-center whitespace-nowrap sm:mt-2 md:mt-0 md:inline-block md:mx-2
            ${router.asPath === href ? 'text-blue-500' : 'text-white'} ${className}`}
            style={styles}
        >
            <Link href={href}>
                {children}
            </Link>
        </span>
    );
};

export default LinkItem;
