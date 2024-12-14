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
import { ColorNavbar, EcommerceHeader, FooterEcommerce } from "../../components";
import environmentConfig from "../../environment"
import { Link } from "react-router-dom";

export const Ecommerce = () => {
	const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { authToken, urlBaseApi, urlImages } = environmentConfig;

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
            setData(result.sort((a, b) => b.id - a.id));

        } catch (error) {
            setError(error.message);
        }
        };

        fetchData();

        return function cleanup() {
        document.body.classList.remove("ecommerce-page");
        };
    }, []);

    const truncateString = (string) => {
        return string.length > 80 
        ? string.substring(0, 80) + '...' 
        : string;
    }

    const sortData = (order) => {
        const sortedData = [...data].sort((a, b) => {
            if (order === "asc") {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });
        setData(sortedData);
    };

    const [sortOrder, setSortOrder] = useState("des");

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "des" : "asc";
        setSortOrder(newOrder);
        sortData(newOrder);
    };

    return (
        <>
            <ColorNavbar />
            <EcommerceHeader />
            <div className="wrapper">
                <div className="section latest-offers pading-botom-0" style={{paddingTop: window.innerWidth < 768 ? '20px' : '30px'}}>
                    <Container>
                        <div style={{ display:'flex', justifyContent: window.innerWidth < 768 ? 'center' : 'space-between', alignItems: window.innerWidth < 768 ? 'start' : 'center', height: window.innerWidth < 768 ? 'min-content' : "40px", marginBottom:'25px', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap:'10px' }}>
                            <h3 className="section-title" style={{margin:0}} >Creaciones</h3>
                            <button className="btn btn-primary btn-sm" onClick={toggleSortOrder}>
                                <i className={`fa fa-sort-alpha-${sortOrder === "asc" ? "asc" : "desc"}`} /> Orden {sortOrder === "asc" ? "Ascendente" : "Descendente"}
                            </button>
                        </div>

                        <Row>
                            {
                                data && data.map((creacion) => (
                                    <Col md="4" key={creacion.id}>
                                        <Card className="card-product card-plain">
                                            <div className="card-image">
                                                <Link to={`/creaciones/${creacion.id}`} >
                                                    <img
                                                        alt={creacion.name}
                                                        className="img-rounded img-responsive"
                                                        src={urlImages+creacion.images.filter((image) => Boolean(image.main))[0].url}
                                                    />
                                                </Link>
                                                <CardBody>
                                                    <div className="card-description">
                                                        <CardTitle tag="h5">{creacion.name}</CardTitle>
                                                        <p className="card-description">
                                                            {truncateString(creacion.description)}
                                                        </p>
                                                    </div>
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
            <FooterEcommerce />
        </>
    );
}
