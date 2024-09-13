import { useEffect, useState } from "react";

// reactstrap components
import {
	Card,
	CardBody,
	CardTitle,
	Container,
	Row,
	Col,
} from "reactstrap";

// // core components
import { ColorNavbar, EcommerceHeader } from "../../components";

export const Ecommerce = () => {
	const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.documentElement.classList.remove("nav-open");
        document.body.classList.add("ecommerce-page");

        const fetchData = async () => {
        try {
            const response = await fetch("http://localhost/api/creaciones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YKgCrV95nc1AOL66hYUzWBSyC3YhVhU8SwLTm13A3b0eaf5e",
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
			<ColorNavbar />
			<EcommerceHeader />
			<div className="wrapper">
				<div className="section latest-offers">
					<Container>
						<h3 className="section-title">Creaciones</h3>
						<Row>
                            {
                                data && data.map((creacion) => (
                                    <Col md="4" key={creacion.id}>
                                        <Card className="card-product card-plain">
                                            <div className="card-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="img-rounded img-responsive alturaImg"
                                                        src={'http://localhost/storage/'+creacion.images.filter((image) => Boolean(image.main))[0].url}
                                                    />
                                                </a>
                                                <CardBody>
                                                    <div className="card-description">
                                                        <CardTitle tag="h5">{creacion.name}</CardTitle>
                                                        <p className="card-description">
                                                            {creacion.description}
                                                        </p>
                                                    </div>
                                                    {/* <div className="price">
                                                        <s className="mr-1">{creacion.precioAnterior} €</s>
                                                        <span className="text-danger">{creacion.precio} €</span>
                                                    </div> */}
                                                </CardBody>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            }
						</Row>
					</Container>
				</div>
			</div>
		</>
	);
}
