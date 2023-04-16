import React from 'react';

export function GradientBackground({ gradient }) {
    return <div className="gradient-background" style={{ background: gradient, width: '100%', height: '100%' }} />;
}
