import Shape from '../Shape';
import React from 'react';

export function ManyCircles({ count, minSize, maxSize, colors }) {
    const circles = [];
    for (let i = 0; i < count; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const top = Math.random() * 100;
        const left = Math.random() * 100;

        circles.push(
            <Shape
                key={i}
                type="circle"
                styles={{
                    position: { top: `${top}%`, left: `${left}%` },
                    width: size,
                    height: size,
                    color: color,
                    borderRadius: '50%',
                }}
            />,
        );
    }

    return <div className="many-circles">{circles}</div>;
}
