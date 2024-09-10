import { useEffect, useState } from "react";
// plugin that creates slider
import Slider from "nouislider";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardTitle,
	Collapse,
	Label,
	FormGroup,
	Input,
	Container,
	Row,
	Col,
	UncontrolledTooltip,
} from "reactstrap";

// // core components
import { ColorNavbar, EcommerceHeader, FooterEcommerce } from "../../components";
import { imagen1, imagen2, imagen3, imagen4, imagen5, imagen6 } from "../../assets/imgRicardoEscobar";

export const Ecommerce = () => {
	document.documentElement.classList.remove("nav-open");
	useEffect(() => {
		
		document.body.classList.add("ecommerce-page");
		return function cleanup() {
			document.body.classList.remove("ecommerce-page");
		};
	});
	return (
		<>
			<ColorNavbar />
			<EcommerceHeader />
			<div className="wrapper">
				<div className="section latest-offers">
					<Container>
						<h3 className="section-title">Creaciones</h3>
						<Row>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen3}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Green Velvet Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">3.520 €</s>
												<span className="text-danger">2.900 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen1}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Crepe and Organza Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">2.675 €</s>
												<span className="text-danger">2.000 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen2}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Lace Mini Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">3.915 €</s>
												<span className="text-danger">3.125 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen4}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Green Velvet Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">3.520 €</s>
												<span className="text-danger">2.900 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen5}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Crepe and Organza Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">2.675 €</s>
												<span className="text-danger">2.000 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
							<Col md="4">
								<Card className="card-product card-plain">
									<div className="card-image">
										<a href="#pablo" onClick={(e) => e.preventDefault()}>
											<img
												alt="..."
												className="img-rounded img-responsive"
												src={imagen6}
											/>
										</a>
										<CardBody>
											<div className="card-description">
												<CardTitle tag="h5">Lace Mini Dress</CardTitle>
												<p className="card-description">
													This is a limited edition dress for the fall
													collection. Comes in 3 colours.
												</p>
											</div>
											<div className="price">
												<s className="mr-1">3.915 €</s>
												<span className="text-danger">3.125 €</span>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</>
	);
}
