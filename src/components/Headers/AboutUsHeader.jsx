
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
                backgroundPosition: "top center"
                }}
            >
                <div className="filter filter-danger" />
                <div className="content-center">
                <Container>
                    <h1>
                       Ricardo Escobar
                    </h1>
                </Container>
                </div>
            </div>
        </>
    )
}


