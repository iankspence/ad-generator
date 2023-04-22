import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Props {
    onDataReceived: (data: any) => void;
}

export const WebsocketHandler: React.FC<Props> = ({ onDataReceived }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to the WebSocket server
        const newSocket = io('ws://localhost:3333');
        setSocket(newSocket);

        newSocket.on('reviewProcessed', (review) => {
            if (onDataReceived) {
                onDataReceived(review);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [onDataReceived]);

    return null;
};

export default WebsocketHandler;
