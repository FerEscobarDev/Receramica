import { useEffect, useRef, useState } from "react";

import { imagen1, imagen2, imagen3, imagen4, imagen5, imagen6 } from "../../assets/imgRicardoEscobar";
import classNames from "classnames";
import Slider from "react-slick";
import { Container } from "reactstrap";




export const LandingSlider = () => {
	
	const [activeSlide, setActiveSlide] = useState(0);
	let sliderRef = useRef(null);
	const images = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6];

	const settings = {
		dots: true,
		centerMode: true,
		infinite: true,
		centerPadding: "20px",
		slidesToShow: 3,
		speed: 500,
		
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,		
		beforeChange: (current, next) => {
			setActiveSlide(next);
		},
		
		responsive: [
			{
			  breakpoint: 2400,
			  settings: {
				slidesToShow: 3,
			  }
			},
			{
			  breakpoint: 1300,
			  settings: {
				centerMode: false,
				slidesToShow: 2,
			  }
			},
			{
			  breakpoint: 700,
			  settings: {
				centerMode: false,
				slidesToShow: 1,
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				centerMode: false,
				slidesToShow: 1,
			  }
			}
		  ]
	  };

	return (
		<>
			<div className="container-slider">
			<Container>
				<div className="slider-container">
					<Slider
						ref={slider => {
							sliderRef = slider;
						}}
						{...settings}
					>
					{
						images.map((image, index) => (
							<div className="container-img">
								<img className={ classNames( activeSlide === index ? 'slider-item active' : 'slider-item') } src={image} alt={`Imagen ${index}`} />
							</div>
						))
					}
					</Slider>
				</div>
			</Container>
			</div>
		</>
		// <div className="container-slider">
		// 	<button onClick={prevImage}>Ant
		// 	<div ref={containerRef} className="container-images" >


		// 		{
		// 			imagesItems.map((image, index) => (
		// 				<img className={ classNames(index === 1 ? 'slider-item active' : 'slider-item',animation(index,direction))} src={image} alt={`Imagen ${index}`} />
		// 			))
		// 		}

		// 	</div>
		// 	<button onClick={nextImage}>Siguiente</button>
		// </div>
	);
}

function NextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={classNames(className, 'arrow')}
		style={{ ...style, display: "block" }}
		onClick={onClick}
	  />
	);
  }
  
  function PrevArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
	  className={classNames(className, 'arrow')}
	  style={{ ...style, display: "block" }}
		onClick={onClick}
	  />
	);
  }
