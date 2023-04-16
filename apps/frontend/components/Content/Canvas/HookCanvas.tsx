import { GradientBackground } from '../Groups/GradientBackground';
import { ManyCircles } from '../Groups/ManyCircles';
import { OverlappingShapes } from '../Groups/OverlappingShapes';
import { TextRect } from '../Groups/TextRect';
import React from 'react';

function HookCanvas({ hook }) {
    return (
        <div className="hook-canvas w-full h-full">
            <GradientBackground gradient="linear-gradient(135deg, rgba(95, 195, 228, 1) 0%, rgba(88, 147, 233, 1) 100%)" />

            <ManyCircles
                count={100}
                minSize={15}
                maxSize={50}
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.6)']}
            />

            <TextRect
                text={'This is a hook'}
                backgroundColor="rgba(255, 255, 255, 0.8)"
                textColor="#000"
                borderRadius="10px"
                styles={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '40px',
                    maxWidth: '80%',
                    textAlign: 'center',
                }}
            />

            <OverlappingShapes
                shapes={[
                    {
                        type: 'circle',
                        styles: {
                            position: { top: '5%', left: '5%' },
                            width: 50,
                            height: 50,
                            color: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                        },
                    },
                    {
                        type: 'circle',
                        styles: {
                            position: { top: '95%', left: '95%' },
                            width: 75,
                            height: 75,
                            color: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                        },
                    },
                    {
                        type: 'rectangle',
                        styles: {
                            position: { top: '10%', left: '90%' },
                            width: 50,
                            height: 50,
                            color: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '5%',
                        },
                    },
                ]}
            />
        </div>
    );
}

export default HookCanvas;
