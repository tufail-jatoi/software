import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '../screens/Admin Screen/Admin';
import CheckAdmin from '../screens/Admin Screen/CheckAdmin';
import Course from '../screens/Admin Screen/Course';
import Registration from '../screens/Registration';

import RegistrationDetail from '../screens/Admin Screen/RegistrationDetail';

import ShowCourse from '../screens/ShowCourse';

import ShowRegistration from '../screens/showRegistration';

import QuizDetail from '../screens/Admin Screen/QuizDetail';

import QuizForm from '../screens/Admin Screen/QuizForm';

import Quiz from '../screens/Quiz';



const AppRoutering = () => {



    return (
        <Router>
            <Routes>
                <Route path='/' element={<Registration />} />
            <Route path='/showReg' element={<ShowRegistration />} />
             <Route path='/admin' element={<CheckAdmin />} />
             <Route path='/a1ae0493-7826-43b9-90ae-76750cb43f09' element={<Admin />} />
                <Route path='/registrationDetail' element={<RegistrationDetail />} />
              <Route path='/course' element={<Course />} />
                <Route path='/showCourse' element={<ShowCourse />} />
 <Route path='/quizdetail' element={<QuizDetail />} />
                <Route path='/quizform' element={<QuizForm />} />
        <Route path='/quiz' element={<Quiz />} />
            </Routes>




        </Router >
    )
}

export default AppRoutering;