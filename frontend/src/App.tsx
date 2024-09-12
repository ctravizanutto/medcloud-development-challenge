import PatientDataTable from "./components/PatientDataTable.tsx";
import {Route, Routes} from "react-router";
import PatientForm from "./components/PatientForm.tsx";

export default function App() {
    return (
        <Routes>
            <Route path={"/"} element={<PatientDataTable/>}/>
            <Route path={"/create"} element={<PatientForm/>}/>
            {/*<Route path={"/:id"}/>*/}
        </Routes>
    )
}
