
// reactstrap components
import { Container } from "reactstrap";
import { fondoReceramica } from "../../assets/imgRicardoEscobar";

// core components

export const EcommerceHeader = () => {
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + fondoReceramica + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container className="text-center">
            <h1>Tesoros de barro: Arte y Pasión</h1>
            <h3>Transformando el barro en arte, una pieza a la vez</h3>
          </Container>
        </div>
      </div>
    </>
  );
}

