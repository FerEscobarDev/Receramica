import {
	Button,
	Card,
	Container,
	Row,
	Col,
	Carousel,
	CarouselItem,
	CarouselIndicators,
	CarouselCaption,
} from "reactstrap";

// core components
import { WhiteNavbar } from "../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import environmentConfig from "../../environment";


export const ProductPage = () => {

	const [data, setData] = useState({images: []});
    const [error, setError] = useState(null);
    const { authToken, urlBaseApi, urlImages } = environmentConfig;
	// carousel states and functions
	const [activeIndex, setActiveIndex] = useState(0);
	const [animating, setAnimating] = useState(false);
    const idProduct = useParams().id;


	const onExiting = () => {
		setAnimating(true);
	};
	const onExited = () => {
		setAnimating(false);
	};
	const next = () => {
		if (animating) return;
		const nextIndex =
			activeIndex === data.images.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};
	const previous = () => {
		if (animating) return;
		const nextIndex =
			activeIndex === 0 ? data.images.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};
	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	};


    useEffect(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.add("ecommerce-page");

        const fetchData = async () => {
        try {
            const response = await fetch(`${urlBaseApi}/api/creaciones`, {
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

            const product = result.find((product) => product.id == idProduct);

            setData(product);
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
			<WhiteNavbar />
                <div className="body-producto">
                    <Container>
                        <Row>
                            <Col md="7" sm="6">
                                <div className="ml-auto mr-auto" id="carousel">
                                    <Card className="page-carousel">
                                        <Carousel
                                            activeIndex={activeIndex}
                                            next={next}
                                            previous={previous}
                                        >
                                            <CarouselIndicators
                                                items={data?.images}
                                                activeIndex={activeIndex}
                                                onClickHandler={goToIndex}
                                            />
                                            {data?.images.map((item) => {
                                                return (
                                                    <CarouselItem
                                                        onExiting={onExiting}
                                                        onExited={onExited}
                                                        key={item.url}
                                                    >
                                                        <img src={`${urlImages+item.url}`} alt={item.alt} />
                                                        <CarouselCaption
                                                            captionText={item.alt}
                                                            captionHeader=""
                                                        />
                                                    </CarouselItem>
                                                );
                                            })}
                                            <a
                                                className="left carousel-control carousel-control-prev"
                                                data-slide="prev"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    previous();
                                                }}
                                                role="button"
                                            >
                                                <span className="fa fa-angle-left" />
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a
                                                className="right carousel-control carousel-control-next"
                                                data-slide="next"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    next();
                                                }}
                                                role="button"
                                            >
                                                <span className="fa fa-angle-right" />
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </Carousel>
                                    </Card>
                                </div>
                                {/* end carousel */}
                            </Col>
                            <Col md="5" sm="6">
                                <h2>{data.name}</h2>
                                <hr />
                                <p>
                                    {data.description}
                                </p>
                                <hr />
                                <Row>
                                    <Col className="offset-md-5" md="7" sm="8">
                                        <a href={`https://api.whatsapp.com/send?phone=573153529978&text=Hola%20Ricardo%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tu%20pieza%20${data.name}%20-%20https%3A%2F%2Freceramica.com%2Fcreaciones%2F${data.id}`} target="_blank">
                                            <Button block className="btn-round" color="danger">
                                                Saber más  <i className="fa fa-chevron-right" />
                                            </Button>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
		</>
    )
}
