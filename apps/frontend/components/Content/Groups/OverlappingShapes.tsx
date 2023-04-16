import Shape from '../Shape';
import React from 'react';

export function OverlappingShapes({ shapes }) {
    return (
        <div className="overlapping-shapes">
            {shapes.map((shape, index) => (
                <Shape key={index} type={shape.type} styles={shape.styles} />
            ))}
        </div>
    );
}
