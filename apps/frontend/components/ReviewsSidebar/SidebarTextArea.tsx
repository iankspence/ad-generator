import React from 'react';

interface SidebarTextAreaProps {
    textArray: string[];
    position: number;
    rows: number;
}

const SidebarTextArea: React.FC<SidebarTextAreaProps> = ({ textArray, position, rows }) => {
    const text = textArray?.[position - 1] || '';
    return (
        <div className="w-3/4 px-6 pb-4">
            <textarea
                className="w-full bg-reviewDrumDarkGray text-reviewDrumLightGray border-none text-md"
                rows={rows}
                readOnly
                value={text}
            />
        </div>
    );
};

export default SidebarTextArea;
