import { makeStyles } from '@material-ui/core';
import React from 'react';

interface ShapeStyles {
    position: { top: number | string; left: number | string };
    width: number | string;
    height: number | string;
    color: string;
    borderRadius: string;
}

const useStyles = makeStyles({
    shape: (props: ShapeStyles) => ({
        position: 'absolute',
        top: props.position.top,
        left: props.position.left,
        width: props.width,
        height: props.height,
        backgroundColor: props.color,
        borderRadius: props.borderRadius,
    }),
});

function starPath(size) {
    let starPoints = '';
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    const angle = (2 * Math.PI) / 5;

    for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = size / 2 + radius * Math.sin(i * angle);
        const y = size / 2 - radius * Math.cos(i * angle);

        starPoints += `${x},${y} `;
    }

    return starPoints.trim();
}

export function Shape({ type, styles }) {
    const classes = useStyles(styles);

    if (type === 'star') {
        return (
            <svg className={classes.shape} viewBox={`0 0 ${styles.width} ${styles.height}`}>
                <polygon points={starPath(styles.width)} fill={styles.color} />
            </svg>
        );
    }

    return <div className={classes.shape}></div>;
}

export default Shape;
