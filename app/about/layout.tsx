import Link from "next/link";

export default function AboutLayout({ children }: {children: React.ReactNode}){
    return(
        <>
            <nav className="fixed right-0 top-10 z-10 h-screen w-60 bg-gray-800">
                <ul className="text-white px-5 py-5">
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
            <div>
                {children}
            </div>
        </>
    );
}