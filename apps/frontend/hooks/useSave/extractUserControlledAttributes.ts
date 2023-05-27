export const extractUserControlledAttributes = (app, backgroundImageLocation) => {
    const childrenNames = [];
    let imageControls;
    const textControls = [];
    app.stage.children.forEach(child => {
        childrenNames.push(child.name);
        if (child.name.split('-')[0] === 'image') {
            imageControls= {
                x: child.x,
                y: child.y,
                scaleX: child.scale.x,
                scaleY: child.scale.y,
                location: backgroundImageLocation
            }
        } else if (child.name.split('-')[0] === 'text') {
            const textControl = {
                name: child.name,
                x: child.x,
                y: child.y,
                text: child.text,
                style: child.style
            }
            textControls.push(textControl);
        }

    });
    return {childrenNames, imageControls, textControls};
};
