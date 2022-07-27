export default function SimpleFooter() {
    return (
        <>
            <footer className="pt-8 pb-6">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="text-sm text-white font-medium">
                            Copyright © {new Date().getFullYear()} Material
                            Tailwind by{' '}
                            <a
                                href="https://www.creative-tim.com?ref=mtk"
                                className="text-white"
                            >
                                Creative Tim - Modify Khoiru Huda
                            </a>
                            .
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
