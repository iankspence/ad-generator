import Link from 'next/link';
import { useRouter } from 'next/router';

export const LinkItem = ({ href, children, className = "" }) => {
    const router = useRouter();

    return (
        <span
            className={`inline-block text-center items-center whitespace-nowrap md:mx-2
            ${router.asPath === href ? 'text-blue-500' : 'text-white'} ${className}`}
        >
            <Link href={href}>
                {children}
            </Link>
        </span>
    );
};

export default LinkItem;
