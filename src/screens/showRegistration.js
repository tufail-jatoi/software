import { Box } from '@mui/system';
import React from 'react'
import { useLocation } from 'react-router-dom';
import "../App.css"
import gif from "../imgs/thank-you-gif-11.gif"

const ShowRegistration = () => {

    const location = useLocation();

    return (
        <>
            <div className="container">
                <Box className='badge bg-success my-4'>
                    <h1 className='fs-3'>Your Registration Details</h1>
                </Box>
                <h2>
                    <span className='leftSide'>
                        First Name:
                    </span>
                    <span className='rightSide'>
                        {location.state.firstName}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Father Name:
                    </span>
                    <span className='rightSide'>
                        {location.state.fathersName}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Course:
                    </span>
                    <span className='rightSide'>
                        {location.state.course}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Student Contact:
                    </span>
                    <span className='rightSide'>
                        {location.state.stuContact}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Father Contact:
                    </span>
                    <span className='rightSide'>
                        {location.state.fatherContact}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Student CNIC:
                    </span>
                    <span className='rightSide'>
                        {location.state.stuCnic}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Email:
                    </span>
                    <span className='rightSide'>
                        {location.state.email}
                    </span>
                </h2>
                <h2>
                    <span className='leftSide'>
                        Date of Birth:
                    </span>
                    <span className='rightSide'>
                        {location.state.dob}
                    </span>
                </h2>
            </div>
            <Box className='d-flex justify-content-center'>
                <img src={gif} alt="loading..." className='gif' />
            </Box>
        </>
    )
}

export default ShowRegistration;