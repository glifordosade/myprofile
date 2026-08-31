import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="fixed w-full z-10 flex bg-gray-800 py-5 px-20">
            <h1 className="text-white">Navbar</h1>
            <ul className="flex ml-5 text-blue-300">
                <Link href="/">
                    <li className="mr-6 cursor-pointer">HOME</li>
                </Link>
                <Link href="/about">
                    <li className="mr-6 cursor-pointer">ABOUT</li>
                </Link>
                <Link href="/about/profile">
                    <li className="mr-6 cursor-pointer">PROFILE</li>
                </Link>
                <Link href="/">
                    <li className="mr-6 cursor-pointer">HOME</li>
                </Link>
                <Link href="/">
                    <li className="mr-6 cursor-pointer">HOME</li>
                </Link>
            </ul>
        </nav>
    );
}