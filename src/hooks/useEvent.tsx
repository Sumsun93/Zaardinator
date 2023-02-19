import React, {useCallback, useEffect} from 'react';

export type EventCallback<T> = (data: T) => void;

function useEvent<T>(eventName: string, callback: EventCallback<T>) {
    const handleEventCallback = useCallback((event: CustomEvent<T>) => {
        callback(event?.detail);
    }, [callback]);

    useEffect(() => {
        // @ts-ignore
        window.addEventListener(eventName, handleEventCallback);

        return () => {
            // @ts-ignore
            window.removeEventListener(eventName, handleEventCallback);
        };
    }, [handleEventCallback, eventName]);

    return null;
};

export default useEvent;
