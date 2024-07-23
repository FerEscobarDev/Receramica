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
            const position = containerRef.current.scrollTop; // Factor de 2 como ejemplo

            console.log('position', position);
    
            // Calcula el ancho total del contenedor de imágenes.
            // Asegúrate de que cada imagen tenga el mismo ancho o ajusta este cálculo según sea necesario.
            const totalWidth = containerRef.current.scrollWidth;
            const totalHigh = containerRef.current.scrollHeight;

            console.log('totalWidth', totalWidth);
            console.log('totalHigh', totalHigh);
            // Calcula el ancho de la ventana de visualización del contenedor.
            const viewportWidth = containerRef.current.offsetWidth;
            const viewportHigh = containerRef.current.offsetHeight;

            console.log('viewportWidth', viewportWidth);
            console.log('viewportHigh', viewportHigh);

            const scrollBar = containerRef.current.offsetWidth - containerRef.current.clientWidth;
    
            // Si la posición de scroll supera el ancho total menos el ancho de la ventana de visualización,
            // restablece la posición de scroll a 0.
            if (position >= totalHigh - viewportHigh) {
                // setScrollPosition(0);

                containerRef.current.scrollTo(0, 0);

                console.log('reset');
            } else {
                // setScrollPosition(position);
            }
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


