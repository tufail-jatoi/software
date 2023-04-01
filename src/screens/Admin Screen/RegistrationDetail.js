import React, { useEffect, useState } from 'react';
import { ReadFromDatabase } from "../../config/firebasemethod";
import Table from 'react-bootstrap/Table';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function DataTable() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        ReadFromDatabase('students')
            .then((res) => {
                setData(Object.values(res))
                // console.log(res);
                setIsLoading(false)
            })
            .catch((err) => {
                alert(err);
                setIsLoading(false)
            })
    }, []);
    // console.log(data)

    return (
        <div>
            <h1 className='regisdetail'>All Registration Details</h1>
            {
                isLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <CircularProgress />
                    </Box>
                    :

                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Uid</th>
                                <th>First Name</th>
                                <th>Father Name</th>
                                <th>Course</th>
                                <th>Student Contact</th>
                                <th>Father Contact</th>
                                <th>Student Cnic</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{e.id}</td>
                                            <td>{e.firstName}</td>
                                            <td>{e.fathersName}</td>
                                            <td>{e.course}</td>
                                            <td>{e.stuContact}</td>
                                            <td>{e.fatherContact}</td>
                                            <td>{e.stuCnic}</td>
                                            <td>{e.email}</td>
                                            <td>{e.dob}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
            }
        </div>
    );
}