import { Route, Routes } from "react-router-dom";
import { About, Ecommerce, Landing } from "./pages/RicardoEscobar";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/e-commerce" element={<Ecommerce />} />
            <Route path="/about" element={<About/>} />
        </Routes>
    )
}
