import Link from 'next/link';
import { useRouter } from 'next/router';

interface LinkItemProps {
    href?: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, children, className = "", onClick }) => {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if(onClick) {
            event.preventDefault();
            onClick();
        }
    }

    return (
        <span
            className={`inline-block text-center items-center whitespace-nowrap md:mx-2
        ${router.asPath === href ? 'text-blue-500' : ['/privacy', '/terms', '/cookies'].includes(href) ? 'text-reviewDrumMedGray' : 'text-white'  } ${className}`}
            onClick={handleClick}
        >
      <Link href={href ? href : '#'}>
        {children}
      </Link>
    </span>
    );
};

export default LinkItem;
