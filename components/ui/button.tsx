'use client'

import React from 'react'

export function Button({
                           children,
                           className = '',
                           ...props
                       }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
