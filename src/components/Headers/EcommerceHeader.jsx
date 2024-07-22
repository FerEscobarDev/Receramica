
// reactstrap components
import { Container } from "reactstrap";
import { balmain_runway } from "../../assets/img";

// core components

export const EcommerceHeader = () => {
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + balmain_runway + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container className="text-center">
            <h1>Brace yourself!</h1>
            <h3>25% Off and Free global delivery for all products</h3>
          </Container>
        </div>
      </div>
    </>
  );
}

