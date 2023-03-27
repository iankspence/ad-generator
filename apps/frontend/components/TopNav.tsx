import Link from 'next/link';
import {useRouter} from 'next/router';

const TopNav = () => {
    const router = useRouter();
    return (
        <nav className="bg-gray-800 py-2 text-white flex flex-col md:flex-row w-screen">
            <div className="flex-1 flex flex-col md:flex-row md:justify-center w-full lg:y-4">

                <span className={`block w-full text-center items-center m-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/learn-how' ? 'text-blue-500' : 'text-white'}`}>
                    <Link href="/learn-how" id="learn-how">
                        Learn How
                    </Link>
                </span>

                <span className={`block w-full text-center items-center m-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/steps' ? 'text-blue-500' : 'text-white'}`}>
                    <Link href="/steps" id="steps">
                        Steps
                    </Link>
                </span>

                <span className={`block w-full text-center items-center m-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/pricing' ? 'text-blue-500' : 'text-white'}`}>
                    <Link href="/pricing" id="pricing">
                        Pricing
                    </Link>
                </span>

                <span className={`block w-full text-center items-center m-2 md:my-0 md:inline-block md:mx-2 ${router.asPath === '/sign-in' ? 'text-blue-500' : 'text-white'}`}>
                    <Link href="/sign-in" id="sign-in">
                        Sign In
                    </Link>
                </span>

            </div>
        </nav>
    );
};

export default TopNav;
