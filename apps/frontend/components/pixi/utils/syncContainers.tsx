export const syncContainers = (containers) => {
    if (containers.length < 2) return;



    const referenceContainer = containers[0];

    for (let i = 1; i < containers.length; i++) {
        const container = containers[i];
        container.position.set(referenceContainer.position.x, referenceContainer.position.y);
        container.scale.set(referenceContainer.scale.x, referenceContainer.scale.y);
    }
};
