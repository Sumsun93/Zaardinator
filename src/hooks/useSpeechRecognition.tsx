import {useRef, useState} from "react";

const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const [error, setError] = useState(null);
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
    const recognition = useRef<any>(null);

    const startListening = () => {
        setListening(true);
        setTranscript('');
        setError(null);
        try {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = 'fr-FR';
            recognition.current.onresult = (event: any) => {
                const interimTranscript = Array.from(event.results)
                    .map((result: any) => result[0])
                    .map((result) => result.transcript)
                    .join('');
                setTranscript(interimTranscript);
            };
            recognition.current.onerror = (event: any) => {
                setError(event.error);
            };
            recognition.current.onend = () => {
                setListening(false);
            };
            recognition.current.start();
        } catch (err: any) {
            console.log(err)
            setError(err);
        }
    };

    const stopListening = () => {
        setListening(false);
        setTranscript('');
        setError(null)
        recognition.current.stop();
    };

    return {
        transcript,
        listening,
        error,
        startListening,
        stopListening,
    };
}

export default useSpeechRecognition;
