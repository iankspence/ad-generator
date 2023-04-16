import Shape from '../Shape';
import React from 'react';

export function FiveStars({ size, color, spacing }) {
    const starArray = new Array(5).fill(null);

    return (
        <div
            className="five-stars"
            style={{ display: 'flex', justifyContent: 'space-between', width: 5 * size + 4 * spacing }}
        >
            {starArray.map((_, index) => (
                <Shape
                    key={index}
                    type="star"
                    styles={{
                        position: { top: '50%', left: `${index * (size + spacing)}%` },
                        width: size,
                        height: size,
                        color: color,
                        borderRadius: '0',
                    }}
                />
            ))}
        </div>
    );
}
