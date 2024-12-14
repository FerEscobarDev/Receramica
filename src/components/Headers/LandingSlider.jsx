import { useEffect, useState } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import environmentConfig from "../../environment";
import { landingVacia } from "../../assets/imgRicardoEscobar";
import { Container } from "reactstrap";

export const LandingSlider = () => {
    const { authToken, urlBaseApi, urlImages } = environmentConfig;
    const [activeSlide, setActiveSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

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
                    dots: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    slidesToShow: 1,
                    dots: false,
                }
            }
        ]
    };

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

                if (response) setIsLoading(false);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                setData(shuffle(result));
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();

        return function cleanup() {
            document.body.classList.remove("ecommerce-page");
        };
    }, []);

    //escribe un método que organice el resultado de la api de manera aleatoria
    const shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return (
        <>
            {
                data && data.length >= 4 && !isLoading &&
                (<div className="container-slider">
                    <div className="container-landing">
                        <div className="slider-container">
                            <Slider {...settings}>
                                {
                                    data.map((image, index) => (
                                        <div className="container-img" key={index}>
                                            <img className={classNames(activeSlide === index ? 'slider-item active' : 'slider-item')} src={urlImages + image.url} alt={`Imagen ${index}`} />
                                        </div>
                                    ))
                                }
                            </Slider>
                        </div>
                    </div>
                </div>)
            }

            {
                isLoading && data.length === 0 &&
                <div className="reload-container">
                    <div className="uil-reload-css mr-1">
                        <div />
                    </div>
                </div>
            }

            {
                (data === null || data === undefined || data.length < 4) && !isLoading &&
                <div
                    className="page-header"
                    style={{
                        backgroundImage: "url(" + landingVacia + ")",
                    }}
                >
                    <div className="filter" />
                    <div className="content-center">
                        <Container className="text-center">
                            <h1>Ricardo Escobar</h1>
                        </Container>
                    </div>
                </div>
            }
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