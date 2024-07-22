import { Route, Routes } from "react-router-dom";
import { Ecommerce, Landing } from "./pages";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/e-commerce" element={<Ecommerce />} />
        </Routes>
    )
}
