import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { writeToDatabase } from '../config/firebasemethod';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../screens/Admin Screen/checkAdmin.css'
import UserAppBar from '../components/UserNavbar';
import CircularProgress from '@mui/material/CircularProgress';

const Registration = () => {
    const [studentObj, setStudentObj] = useState({});
    const [buttonLoading, setButtonLoading] = useState(false);
    const navigate = useNavigate();

    const submit = () => {
        setButtonLoading(true)
        if (Object.values(studentObj).length >= 8) {
            writeToDatabase(studentObj)
                .then((success) => {
                    // Signed in 
                    alert(success);
                    navigate("/showReg", {
                        state: studentObj
                    });
                    setButtonLoading(false)
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    const errorMessageUp = errorMessage.toUpperCase();
                    alert(errorMessageUp)
                    setButtonLoading(false)
                });
        } else {
            alert('ALL FIELDS MUST BE FILLED')
            setButtonLoading(false)
        }
    }

    const selectValHandler = (e) => {
        setStudentObj({ ...studentObj, course: e.target.value })
    }
    // console.log(studentObj)
    return (
        <div className='main-regis'>
            <UserAppBar />
            <Box sx={{ marginTop: 2 }}>
                <h1 className='regisdetail'>Registration</h1>
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box>
                    <TextField label="Your Name" variant="outlined" onChange={e => setStudentObj({ ...studentObj, firstName: e.target.value })} />
                </Box>
                <Box>
                    <TextField label="Father Name" onChange={e => setStudentObj({ ...studentObj, fathersName: e.target.value })} variant="outlined" />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Select Course"
                            onChange={selectValHandler}
                            value={studentObj?.course || 'none'}
                        >
                            <MenuItem value='Web and Mobile App Dev'>Web and Mobile App Dev</MenuItem>
                            <MenuItem value='Graphics Designing'>Graphic Designing</MenuItem>
                            <MenuItem value='Blockchain Development'>Blockchain Development</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField label="Your Contact" onChange={e => setStudentObj({ ...studentObj, stuContact: e.target.value })} type='number' variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Father Contact" type='number' onChange={e => setStudentObj({ ...studentObj, fatherContact: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="CNIC" type='number' onChange={e => setStudentObj({ ...studentObj, stuCnic: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Email" type='text' onChange={e => setStudentObj({ ...studentObj, email: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Date of Birth" onChange={e => setStudentObj({ ...studentObj, dob: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    {buttonLoading
                        ?
                        <Button>
                            <CircularProgress />
                        </Button>
                        :
                        <Button onClick={submit}>
                            Submit
                        </Button>
                    }
                </Box>
            </Box>
        </div>
    )
}

export default Registration;