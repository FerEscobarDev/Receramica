import { useEffect } from "react";
import { AboutUsHeader, ColorNavbar } from "../../components";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    Row,
    Col,
} from "reactstrap";
import { barro, ricardoAbout, taller, tecnica } from "../../assets/imgRicardoEscobar";

export const About = () => {
    document.documentElement.classList.remove("nav-open");

    useEffect(() => {
        document.body.classList.add("about-us");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
        document.body.classList.remove("about-us");
        };
    });

    return (
        <>
            <ColorNavbar />
            <AboutUsHeader />
            <div className="main padding-x-10">
                <div className="section">
                    <Container>
                        <h3 className="title-uppercase">El Artista</h3>
                        <p>
                            Ricardo Escobar es un destacado artista cuya visión y creatividad 
                            se manifiestan en cada una de sus obras. Sus piezas no solo son productos 
                            de su habilidad técnica, sino también portadoras de su identidad y esencia, 
                            convirtiendo el diseño en una expresión personal y la artesanía en una firma 
                            inconfundible. Su objetivo es embellecer la vida de las personas, creando objetos 
                            que no solo adornan los espacios, sino que también generan nuevas experiencias estéticas 
                            y sensoriales. 
                        </p>
                        <p style={{
                            marginBottom: "50px"
                        }}>
                            En cada creación, Escobar logra una fusión de originalidad y creatividad, 
                            ofreciendo un lujo que respeta la función mientras celebra la imagen, el tacto y 
                            la percepción visual.
                        </p>
                        
                       
                        <Row>
                            <Card className="card-plain card-blog">
                                <Row>
                                    <Col xs={{ order: 2 }} md={{ order: 1, size:5 }}>
                                        <div className="card-image">
                                            <img
                                            alt="..."
                                            className="img"
                                            src={tecnica}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={{ order: 1 }} md={{ order: 2, size: 7 }}>
                                        <CardBody>
                                            <CardTitle tag="h3">
                                                Innovación y Maestría
                                            </CardTitle>
                                            <p className="card-description">
                                                La técnica de Ricardo Escobar es el resultado de una exploración constante y desafiante. 
                                                Su enfoque se centra en llevar al límite las posibilidades del material cerámico y los 
                                                procesos básicos del taller, siempre con el objetivo de ofrecer emociones renovadas y 
                                                una sensación de plenitud. La obra de Escobar refleja resiliencia, siendo al mismo tiempo 
                                                frágil y fuerte, renaciendo como un Fénix en cada una de sus creaciones. Cada pieza es una 
                                                expresión de felicidad, entusiasmo y sorpresa perpetuos.
                                            </p>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card-plain card-blog">
                                <Row>
                                    <Col md="7">
                                        <CardBody>
                                            <CardTitle tag="h3">
                                                El Santuario Creativo
                                            </CardTitle>
                                            <p className="card-description">
                                                El taller de Ricardo Escobar es un centro de aprendizaje y creación. Este espacio está dedicado 
                                                al desarrollo de proyectos cerámicos que no solo son hermosos, sino también significativos. 
                                                Aquí, los asistentes encuentran un medio para la expresión personal y la mejora técnica, 
                                                explorando todos los aspectos del proceso cerámico. El taller promueve la reflexión y el autocuidado, 
                                                proporcionando un entorno donde la creatividad florece y las habilidades artesanales se perfeccionan.
                                            </p>
                                        </CardBody>
                                    </Col>
                                    <Col md="5">
                                        <div className="card-image">
                                            <img
                                            alt="..."
                                            className="img"
                                            src={taller}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card className="card-plain card-blog">
                                <Row>
                                    <Col xs={{ order: 2 }} md={{ order: 1, size:5 }}>
                                        <div className="card-image">
                                            <img
                                            alt="..."
                                            className="img"
                                            src={barro}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={{ order: 1 }} md={{ order: 2, size: 7 }}>
                                        <CardBody>
                                            <CardTitle tag="h3">
                                                La Esencia de la Materia
                                            </CardTitle>
                                            <p className="card-description">
                                                El barro es el corazón de las creaciones de Ricardo Escobar. Utilizando una pasta cerámica elaborada con materias 
                                                primas del altiplano cundiboyacense, sus piezas resultan ricas en información y textura. Esta alquimia entre 
                                                cerámica y vidrio da vida a esculturas únicas, donde los esmaltes formulados en su propio taller interactúan 
                                                con el barro para crear superficies distintivas. Cada pieza simboliza una búsqueda constante de influencias 
                                                culturales y propuestas orgánicas nuevas e inspiradoras.
                                            </p>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                        {/* <h3 className="more-info">Need more information?</h3>
                        <Row className="coloured-cards">
                        <Col md="4" sm="6">
                            <div className="card-big-shadow">
                            <Card
                                className="card-just-text"
                                data-background="color"
                                data-color="blue"
                                data-radius="none"
                            >
                                <CardBody>
                                <h6 className="card-category">Best cards</h6>
                                <CardTitle tag="h4">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Blue Card
                                    </a>
                                </CardTitle>
                                <p className="card-description">
                                    What all of these have in common is that they're pulling
                                    information out of the app or the service and making it
                                    relevant to the moment.
                                </p>
                                </CardBody>
                            </Card>
                            {/* end card 
                            </div>
                        </Col>
                        <Col md="4" sm="6">
                            <div className="card-big-shadow">
                            <Card
                                className="card-just-text"
                                data-background="color"
                                data-color="green"
                                data-radius="none"
                            >
                                <CardBody>
                                <h6 className="card-category">Best cards</h6>
                                <CardTitle tag="h4">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Green Card
                                    </a>
                                </CardTitle>
                                <p className="card-description">
                                    What all of these have in common is that they're pulling
                                    information out of the app or the service and making it
                                    relevant to the moment.
                                </p>
                                </CardBody>
                            </Card>
                            {/* end card *
                            </div>
                        </Col>
                        <Col md="4" sm="6">
                            <div className="card-big-shadow">
                            <Card
                                className="card-just-text"
                                data-background="color"
                                data-color="yellow"
                                data-radius="none"
                            >
                                <CardBody>
                                <h6 className="card-category">Best cards</h6>
                                <CardTitle tag="h4">
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                    Yellow Card
                                    </a>
                                </CardTitle>
                                <p className="card-description">
                                    What all of these have in common is that they're pulling
                                    information out of the app or the service and making it
                                    relevant to the moment.
                                </p>
                                </CardBody>
                            </Card>
                            {/* end card *
                            </div>
                        </Col>
                        </Row> */}
                    </Container>
                </div>
            </div>
        </>
    )
}
