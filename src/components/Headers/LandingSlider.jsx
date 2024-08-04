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
    const images = [balmain_1, balmain_2, balmain_3, balmain_4, balmain_5, balmain_7, balmain_8, balmain_9];
    const [imagesItems, setImagesItems] = useState([images[0], images[1], images[2]]);

    // useEffect(() => {
    //     setImages([imagesArray[0], imagesArray[1], imagesArray[2]]);
    //     const handleScroll = () => {
            
    //         const position = containerRef.current.scrollLeft;

    //         const totalWidth = containerRef.current.scrollWidth;
    //         const viewportWidth = containerRef.current.offsetWidth;

            
    //         if (position >= totalWidth - viewportWidth) {
    //             // setScrollPosition(0);

    //             containerRef.current.scrollTo(0, 0);
    //         } else {
    //             // setScrollPosition(position);
    //         }
    //     };
    
    //     const container = containerRef.current;
    //     container.addEventListener('scroll', handleScroll);
    
    //     return () => container.removeEventListener('scroll', handleScroll);
    // }, []);

    const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mostrar la siguiente imagen
  const nextImage = () => {
    const current = (currentIndex + 1) % images.length;
    setCurrentIndex(current);

    if(current === 0) {
        const items = [images[images.length - 1], images[current], images[current + 1]];
        console.log('items primero', items);
        setImagesItems(items);
    }
    else if(current === images.length - 1) {
        const items = [images[current - 1], images[current], images[0]];
        console.log('items ultimo', items);
        setImagesItems(items);
    }
    else {
        setImagesItems([images[current - 1], images[current], images[current + 1]]);
    }
  };

  // Función para mostrar la imagen anterior
  const prevImage = () => {
    const current = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(current);
    if(current === 0) {
        const items = [images[images.length - 1], images[current], images[current + 1]];
        console.log('items primero', items);
        setImagesItems(items);
    }
    else if(current === images.length - 1) {
        const items = [images[current - 1], images[current], images[0]];
        console.log('items ultimo', items);
        setImagesItems(items);
    }
    else {
        setImagesItems([images[current - 1], images[current], images[current + 1]]);
    }
  
  };

        

    return (
        // <>
        //     <div className="container-slider">
        //         <div ref={containerRef} className="container-images scroll-styles" >
        //             {images.map((image, index) => (
        //                 <img style={{transform: `translateX(-${scrollPosition}px)`}} key={index} src={image} alt="..."  />
        //             ))}
        //         </div>                
        //     </div>
        // </>
        <div className="container-slider">
            <button onClick={prevImage}>Anterior</button>
            <div ref={containerRef} className="container-images" >
                
                    
                    {
                        imagesItems.map((image, index) => (
                            <img className={index === 1 ? 'slider-item active slideInRight' : 'slider-item' } src={image} alt={`Imagen ${ index}`} />
                        ))
                    } 
                
            </div>                   
            <button onClick={nextImage}>Siguiente</button>
        </div>
    );
}


