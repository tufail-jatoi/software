import React, { useEffect, useState } from 'react'
import { ReadFromDatabase } from '../config/firebasemethod';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import UserAppBar from '../components/UserNavbar';

const ShowCourse = () => {

    const [courseData, setCourseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

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
    // console.log(data)

    return (
        <div>
            <UserAppBar />
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
                                    <Card style={{ width: '100%', marginBottom: 20, marginTop: 5 }} key={i}>
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
                                            <Button variant="primary" onClick={() => navigate('/')}>Go for Registration</Button>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                    </Box>
            }
        </div>
    )
}

export default ShowCourse;