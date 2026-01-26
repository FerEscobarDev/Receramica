import { Route, Routes } from "react-router-dom";
import { About, Ecommerce, Landing, NotFound, ProductPage } from "./pages/RicardoEscobar";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/store" element={<Ecommerce />} />
            <Route path="/about" element={<About/>} />
            <Route path="/creaciones/:id" element={<ProductPage/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}
