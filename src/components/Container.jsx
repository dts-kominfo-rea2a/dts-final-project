import React from "react";

const Container = ({ children, size = 'lg', className, ...props }) => {
    return (
        <div className={`${size}:container mx-auto ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Container