import { useEffect, useRef, useState } from "react";

import {
    balmain_1,
    balmain_2, 
    balmain_3, 
    balmain_4, 
    balmain_5, 
    balmain_7, 
    balmain_8,
    balmain_9
} from '@/assets/img';




export const LandingSlider = () => {
    
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Asumiendo que deseas que el slider se mueva más rápido o más lento que el scroll
            // puedes ajustar el factor multiplicador según sea necesario.
            const position = containerRef.current.scrollTop * 2; // Factor de 2 como ejemplo
            console.log(position);
            // setScrollPosition(position);
        };

        const container = containerRef.current;
        container.addEventListener('scroll', handleScroll);

        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="container-slider">
                <div ref={containerRef} className="container-images" style={{transform: `translateX(-${scrollPosition}px)`}}>
                    {[balmain_1, balmain_2, balmain_3, balmain_4, balmain_5, balmain_7, balmain_8, balmain_9].map((image, index) => (
                        <img key={index} src={image} alt="..."  />
                    ))}
                </div>                
            </div>
        </>
    );
}


