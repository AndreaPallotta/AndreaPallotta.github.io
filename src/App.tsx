import { Link, Outlet } from 'react-router-dom';

export default function App() {
    return (
        <>
            <header className="fixed top-0 right-0 left-0 z-10 mx-auto flex max-w-6xl items-center gap-4 p-3 text-white/90">
                <Link to="/" className="font-semibold hover:text-white">
                    Spacefolio
                </Link>
                <Link
                  to="https://drive.google.com/file/d/1dUc3GMAsi6v-EtoknBvVtK8vUQSEQhgh/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Static Resume
                </Link>
            </header>
            <Outlet />
        </>
    );
}
