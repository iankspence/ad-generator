import React from 'react';

export function DottedLines({ count, color, lineWidth, lineSpacing }) {
    const lines = [];
    for (let i = 0; i < count; i++) {
        lines.push(
            <div
                key={i}
                className="dotted-line"
                style={{
                    borderBottom: `${lineWidth}px dashed ${color}`,
                    margin: `${lineSpacing}px 0`,
                }}
            />,
        );
    }

    return <div className="dotted-lines">{lines}</div>;
}
