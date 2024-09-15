import { useEffect, useState } from "react";

import classNames from "classnames";
import Slider from "react-slick";
import environmentConfig from "../../environment";


export const LandingSlider = () => {
	
    const { authToken, urlBaseApi, urlImages } = environmentConfig;
	const [activeSlide, setActiveSlide] = useState(0);

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
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.add("ecommerce-page");

        const fetchData = async () => {
        try {
            const response = await fetch(`${urlBaseApi}/api/images`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken,
            },
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        }
        };

        fetchData();

        return function cleanup() {
        document.body.classList.remove("ecommerce-page");
        };
    }, []);

	return (
		<>
			<div className="container-slider">
                <div className="container-landing">
                    <div className="slider-container">
                        <Slider
                            {...settings}
                        >
                        {
                            data.map((image, index) => (
                                <div className="container-img">
                                    <img className={ classNames( activeSlide === index ? 'slider-item active' : 'slider-item') } src={urlImages+image.url} alt={`Imagen ${index}`} />
                                </div>
                            ))
                        }
                        </Slider>
                    </div>
                </div>
			</div>
		</>
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
