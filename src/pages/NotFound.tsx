export default function NotFound() {
    return (
        <div className="grid h-screen place-items-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="mb-4 opacity-80">Page not found</p>
                <a href="/" className="text-blue-400 underline">
                    Go home
                </a>
            </div>
        </div>
    );
}
