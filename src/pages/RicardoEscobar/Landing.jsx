import { useEffect } from "react";
import { LandingSlider, WhiteNavbar } from "../../components";


export const Landing = () => {
    document.documentElement.classList.remove("nav-open");
    useEffect(() => {
        document.body.classList.add("index-page");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
        };
    });
    return (
        <>
            <WhiteNavbar />
            <LandingSlider />
        </>
    );
}

