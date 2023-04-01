import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField } from '@mui/material';
import './checkAdmin.css'

const CheckAdmin = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const checkAdmin = () => {
        if (userName === "adminadmin" && password === "admin123") {
            alert('Success');
            navigate('/a1ae0493-7826-43b9-90ae-76750cb43f09');
        } else {
            alert('Error')
        }
    }

    return (
        <div className='main'>
            <section className='section'>
                <h1 className='heading'>Admin Login</h1>
                <Box className='input'>
                    <TextField onChange={(e) => setUserName(e.target.value)} label="User Name" variant="filled" />
                </Box>
                <Box className='input'>
                    <TextField onChange={(e) => setPassword(e.target.value)} label="Password" type='password' variant="filled" />
                </Box>
                <Button variant="outlined" onClick={checkAdmin}>Signup</Button>
            </section>
        </div>
    )
}

export default CheckAdmin;