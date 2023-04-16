import { Typography } from '@material-ui/core';

export function TextBox({ content, styles }) {
    return (
        <Typography
            style={{
                fontSize: styles.fontSize,
                fontStyle: styles.fontStyle,
                color: styles.color,
                position: 'absolute',
                top: styles.position.top,
                left: styles.position.left,
            }}
        >
            {content}
        </Typography>
    );
}
