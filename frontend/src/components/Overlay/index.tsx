import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router";


export default function Overlay({children}: any) {
    const navigate = useNavigate()

    return (
        <>
            <AppBar position="static" sx={{marginBottom: '10px', height: '60px', display: 'flex', justifyContent: 'center'}}>
                <Toolbar variant="dense">
                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <Typography onClick={() => navigate('/')} variant="h6" color="inherit" component="div" sx={{cursor: 'pointer'}}>
                            Medcloud
                        </Typography>
                        {window.location.toString() === 'http://localhost:5173/' && (
                            <Button sx={{color: 'white', backgroundColor: '#007fff'}} onClick={() => navigate('/create')}>
                                Novo Paciente
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            {children}
        </>

)
}
