import Link from 'next/link';
import { useRouter } from 'next/router';

const LinkItem = ({ href, children }) => {
    const router = useRouter();

    return (
        <span
            className={`block w-full text-center items-center  mt-2 md:my-0 md:inline-block md:mx-2
            ${router.asPath === href ? 'text-blue-500' : 'text-white'}`}
        >
            <Link href={href}>
                {children}
            </Link>
        </span>
    );
};

export default LinkItem;
