//LoopingCard.js
import React from 'react';
import { useSpring, animated } from 'react-spring'

const LoopingCard = () => {

    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 360 },
        duration: 2000,
    });

    return (<animated.div
        style={{
            width: 80,
            height: 80,
            backgroundColor: 'd6d6d6',
            borderRadius: 16,
            boxShadow: 'rgb(0,0,0,0.44) 0px 5px 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'green',
            margin: 250,
            ...styles,
        }} >Gaurav Mahajan</animated.div>
    );
}

export default LoopingCard;