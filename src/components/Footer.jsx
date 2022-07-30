import React from "react";
import Container from "./Container";

const Footer = () => {
    return (
        <div className="py-4 border-t border-gray-300 font-light text-xs w-full md:w-10/12 mx-auto px-4 md:px-0">
            <Container size="md">
                <div className="flex justify-between">

                    <span>&copy; Miaowbook {(new Date()).getFullYear()}</span>
                    <span>made with ❤️ by <a className="hover:text-red-400 font-bold" href="https://bardiz.my.id">Bardizba</a></span>
                </div>
            </Container>
        </div>
    )
}

export default Footer