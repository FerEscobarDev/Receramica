
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
            <h1>Obras</h1>
          </Container>
        </div>
      </div>
    </>
  );
}

