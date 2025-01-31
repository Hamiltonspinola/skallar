import { Link } from '@inertiajs/react'

export default function Layout({ children }: { children: any }) {
    return (
        <main>
            <header>
                    <Link href="/web/">Home </Link>
                    <Link href="/web/about">About </Link>
                    <Link href="/web/contact">Contact</Link>
            </header>
            <article>{children}</article>
        </main>
    )
}