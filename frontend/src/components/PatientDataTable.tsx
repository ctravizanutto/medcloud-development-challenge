import {Patient} from "../interfaces/patient.interface.ts";
import {DataGrid, GridActionsCellItem, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {http} from "../http";
import {APIGetResponse} from "../interfaces/api.interfaces.ts";
import {HttpStatusCode} from "axios";
import Paper from "@mui/material/Paper";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Page {
    isLoading: boolean,
    total: number,
    page: number,
    pageSize: number
}


export default function PatientDataTable() {
    const [pageState, setPageState] = useState<Page>({
        isLoading: true,
        total: 0,
        page: 0,
        pageSize: 10
    })

    const [patients, setPatients] = useState<Patient[]>([])

    useEffect(() => {
        setPageState(old => ({
            ...old,
            isLoading: true
        }));
        http.get<APIGetResponse>(`/?page=${pageState.page}&limit=${pageState.pageSize}`)
            .then((response) => {
                console.log(response)
                if (response.status == HttpStatusCode.Ok) {
                    setPageState(old => (
                        {
                            ...old,
                            total: response.data.totalPages,
                            isLoading: false,
                        }
                    ))
                    const patients = response.data.patients.map(patient => ({
                        ...patient,
                        birthday: new Date(patient.birthday)
                    }))
                    setPatients(patients)
                }
            })
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Name', width: 250},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'birthday', headerName: 'Birthday', type: 'date', width: 120},
        {
            field: 'address',
            headerName: 'Address',
            type: 'actions',
            width: 120,
            getActions: () => [
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => console.log('test')}
                >
                    Expand
                </Button>
            ]
        },
        {
            field: 'edit',
            type: 'actions',
            resizable: false,
            width: 100,
            getActions: (params) => [
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log('test')}
                >
                    Edit
                </Button>,
                <GridActionsCellItem
                    icon={<DeleteIcon/>}
                    color={"error"}
                    label="Delete"
                    onClick={() => {
                        http.delete(`/${params.id}`)
                            .then(() => setPatients(old => old.filter(patient => patient.id != params.id)))

                    }}
                />,
            ],
        }
    ];

    return (
        <Paper sx={{height: 'fit-content', width: 'fit-content'}}>
            <DataGrid
                autoHeight
                columns={columns}
                rows={patients}
                rowCount={pageState.total}

                loading={pageState.isLoading}

                paginationModel={{page: pageState.page, pageSize: pageState.pageSize}}
                paginationMode={"server"}
                pageSizeOptions={[10, 20, 30]}
                onPaginationModelChange={(paginationModel) =>
                    setPageState(old => ({...old, page: paginationModel.page, pageSize: paginationModel.pageSize}))}

                sx={{border: 0}}
            />
        </Paper>
    );
}