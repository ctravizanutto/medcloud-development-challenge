import PatientDataTable from "./pages/PatientDataTable";
import {Route, Routes} from "react-router";
import PatientForm from "./pages/PatientForm";
import {Toaster} from "react-hot-toast";
import Overlay from "./components/Overlay";

export default function App() {
    return (
        <>
            <Overlay>
                <Routes>
                    <Route path={"/"} element={<PatientDataTable/>}/>
                    <Route path={"/create"} element={<PatientForm/>}/>
                    <Route path={"/:id"} element={<PatientForm/>}/>
                </Routes>
            </Overlay>
            <Toaster/>
        </>

    )
}
