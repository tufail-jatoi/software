import React, { useState, useEffect } from 'react'
import { addCourse, DeleteDataFromDataBase, updateData } from '../../config/firebasemethod'
import { ReadFromDatabase } from '../../config/firebasemethod';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CircularProgress from '@mui/material/CircularProgress';

const Course = () => {

    const [courseObj, setCourseObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [courseData, setCourseData] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [EditData, setEditData] = useState()
    const [editIndex, setEditIndex] = useState(null)
    // console.log(courseObj)

    const addCourses = () => {
        if (Object.values(courseObj).length >= 6) {
            addCourse(courseObj)
                .then((success) => {
                    alert(success);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            alert("All Fields Must Be filled")
        }
    }


    useEffect(() => {
        ReadFromDatabase('course data')
            .then((res) => {
                setCourseData(Object.values(res));
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const UpdateCourse = (data, id) => {
        setEditData(data)
        setEditIndex(id)
        setEditMode(!editMode)
    }

    const EditCourseHandler = () => {
        courseData[editIndex] = EditData
        updateData(EditData)
        setCourseData([...courseData])
        setEditMode(!editMode)
        setEditData(false)
        setEditIndex(null)
    }

    const cancelEdit = () => {
        setEditData(false)
        setEditMode(!editMode)
    }

    // const deleteHander = (data) => {
    //     alert("Are You Sure?")
    //     DeleteDataFromDataBase('course data')
    //         .then((res) => {
    //             const newData = courseData.filter((e, i) => e !== data);
    //             setCourseData(newData);
    //             alert(res)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    return (
        <div>
            <Box sx={{ justifyContent: 'center', marginTop: 1, color: 'white', display: 'flex' }}>
                <h1 className='h1courses'>Add Courses</h1>
            </Box>
            {EditData
                ?
                <Box
                    sx={{
                        '& > :not(style)': { m: 2, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <TextField label={'COURSE NAME'} value={EditData.courseName} variant='outlined' onChange={e => setEditData({ ...EditData, courseName: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={'COURSE DESCRIPTION'} value={EditData.courseDes} variant='outlined' onChange={e => setEditData({ ...EditData, courseDes: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={"LEAD TEACHER"} value={EditData.nolt} variant='outlined' onChange={e => setEditData({ ...EditData, nolt: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField value={EditData.assissTeacher} label='ASSISTANT TEACHER' variant='outlined' onChange={e => setEditData({ ...EditData, assissTeacher: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label={'SEATS'} value={EditData.maxSeats} variant='outlined' type='number' onChange={e => setEditData({ ...EditData, maxSeats: e.target.value })} />
                    </Box>
                    <Box>
                        <TextField label='PRICE' value={EditData.price} variant='outlined' type='number' onChange={e => setEditData({ ...EditData, price: e.target.value })} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button onClick={EditCourseHandler}>
                            UPDATE DATA
                        </Button>
                        <Button onClick={cancelEdit}>
                            CANCEL
                        </Button>
                    </Box>
                </Box>
                :
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <>
                        <Box>
                            <TextField value={courseObj.courseName} label="Course Name" variant="outlined" onChange={e => setCourseObj({ ...courseObj, courseName: e.target.value })} />
                        </Box>
                        <Box>
                            <TextField value={courseObj.courseDes} label="Course Description" onChange={e => setCourseObj({ ...courseObj, courseDes: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.nolt} label="Name of Lead Teacher" onChange={e => setCourseObj({ ...courseObj, nolt: e.target.value })} type='text' variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.assissTeacher} label="Name of Assisstant Teachers" type='text' onChange={e => setCourseObj({ ...courseObj, assissTeacher: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.maxSeats} label="Maximum Seats" type='number' onChange={e => setCourseObj({ ...courseObj, maxSeats: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <TextField value={courseObj.price} label="Price" type='number' onChange={e => setCourseObj({ ...courseObj, price: e.target.value })} variant="outlined" />
                        </Box>
                        <Box>
                            <Button onClick={addCourses}>
                                Add
                            </Button>
                        </Box>
                    </>
                </Box>
            }
            <Box sx={{ justifyContent: 'center', color: 'white', display: 'flex' }}>
                <h1 className='h1courses'>Your Courses</h1>
            </Box>
            <Box sx={{ marginTop: 2 }}>
                {
                    isLoading
                        ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <CircularProgress />
                        </Box>
                        :
                        <Box>

                            {
                                courseData.map((e, i) => {
                                    return (

                                        <Card style={{ width: '100%', marginBottom: 20 }} key={i}>

                                            <Card.Body>
                                                <Card.Title>{e.courseName}</Card.Title>
                                                <Card.Text>
                                                    {e.courseDes}
                                                </Card.Text>
                                                <Card.Text>
                                                    Course Lead Teacher: <b> {e.nolt} </b>
                                                </Card.Text>
                                                <Card.Text>
                                                    Course Assisstant Teacher: <b> {e.assissTeacher} </b>
                                                </Card.Text>
                                                <Card.Text>
                                                    Seats: {e.maxSeats}
                                                </Card.Text>
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <h3>{e.price}/- Rs</h3>
                                                </Box>

                                            </Card.Body>

                                            <Box sx={{ display: 'flex', gap: 1, marginLeft: 2, marginBottom: 2 }}>
                                                <Box>
                                                    {
                                                        !editMode &&
                                                        <Button onClick={() => UpdateCourse(e, i)}>
                                                            Edit Course
                                                        </Button>
                                                    }
                                                </Box>
                                                <Box>
                                                    <Button /*onClick={() => deleteHander(e)}*/ variant="primary">Delete Course</Button>
                                                </Box>
                                            </Box>
                                        </Card>
                                    )
                                })
                            }
                        </Box>
                }
            </Box>
        </div >
    )
}

export default Course;