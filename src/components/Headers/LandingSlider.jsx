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
    const imagesArray = [balmain_1, balmain_2, balmain_3, balmain_4, balmain_5, balmain_7, balmain_8, balmain_9];
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([imagesArray[0], imagesArray[1], imagesArray[2]]);
        const handleScroll = () => {
            
            const position = containerRef.current.scrollLeft;

            const totalWidth = containerRef.current.scrollWidth;
            const viewportWidth = containerRef.current.offsetWidth;

            
            if (position >= totalWidth - viewportWidth) {
                // setScrollPosition(0);

                containerRef.current.scrollTo(0, 0);
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
                <div ref={containerRef} className="container-images scroll-styles" >
                    {images.map((image, index) => (
                        <img style={{transform: `translateX(-${scrollPosition}px)`}} key={index} src={image} alt="..."  />
                    ))}
                </div>                
            </div>
        </>
    );
}


