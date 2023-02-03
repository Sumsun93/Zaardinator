import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProtectedRoute: React.FC<{component: React.FC}> = ({
 component: Component,
}: any) => {
    const navigate = useNavigate();
    const {isInit} = useSelector((state: any) => state.game);

    useEffect(() => {
        if (!isInit) {
            navigate('/');
        }
    }, [isInit, navigate]);

    return <Component />;
};

export default ProtectedRoute;
