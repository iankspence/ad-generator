import React from 'react';

export function TextRect({ text, backgroundColor, textColor, borderRadius, styles }) {
    return (
        <div
            className="text-rect"
            style={{
                backgroundColor: backgroundColor,
                borderRadius: borderRadius,
                padding: '10px',
                ...styles,
            }}
        >
            <p style={{ color: textColor }}>{text}</p>
        </div>
    );
}
