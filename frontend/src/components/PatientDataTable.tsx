import {Patient} from "../interfaces/patient.interface.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {http} from "../http";
import {APIGetResponse} from "../interfaces/api.interfaces.ts";
import {HttpStatusCode} from "axios";
import Paper from "@mui/material/Paper";

interface Page {
    isLoading: boolean,
    data: Patient[],
    total: number,
    page: number,
    pageSize: number
}

const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 250},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'birthday', headerName: 'Birthday', type: 'date', width: 120},
];

export default function PatientDataTable() {
    const [pageState, setPageState] = useState<Page>({
        isLoading: true,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
    })

    useEffect(() => {
        setPageState(old => ({
            ...old,
            isLoading: true
        }));
        http.get<APIGetResponse>(`/?page=${pageState.page}?limit=${pageState.pageSize}`)
            .then((response) => {
                if (response.status == HttpStatusCode.Ok) {
                    setPageState(old => (
                        {
                            ...old,
                            data: response.data.patients.map(patient => ({
                                ...patient,
                                birthday: new Date(patient.birthday)
                            })),
                            isLoading: false,
                        }
                    ))
                }
            })
    }, [pageState.page, pageState.pageSize]);

    return (
        <Paper sx={{height: 'fit-content', width: '50vw'}}>
            <DataGrid
                autoHeight
                columns={columns}
                rows={pageState.data}
                rowCount={pageState.total}

                loading={pageState.isLoading}

                paginationModel={{page: pageState.page, pageSize: pageState.pageSize}}
                paginationMode={"server"}
                pageSizeOptions={[10, 20, 30]}
                onPaginationModelChange={(paginationModel) =>
                    setPageState(old => ({...old, page: paginationModel.page, pageSize: paginationModel.pageSize}))}

                checkboxSelection
                sx={{border: 0}}
            />
        </Paper>
    );
}