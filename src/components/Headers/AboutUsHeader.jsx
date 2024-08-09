
import { Container } from "reactstrap";
import { ricardoAbout } from "../../assets/imgRicardoEscobar";


export const AboutUsHeader = () => {
    return (
        <>
            <div
                className="page-header page-header-small"
                style={{
                backgroundImage:
                    "url(" + ricardoAbout + ")",
                }}
            >
                <div className="filter filter-danger" />
                <div className="content-center">
                <Container>
                    <h1>
                        Sobre Ricardo Escobar
                    </h1>
                    {/* <h3>Let us tell you more about what we do.</h3> */}
                </Container>
                </div>
            </div>
        </>
    )
}


