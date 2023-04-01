import React, { useState } from 'react'
import { addQuiz } from '../../config/firebasemethod';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';

const QuizForm = () => {

    const [quizData, setQuizData] = useState({});

    const get = () => {
        if (Object.values(quizData).length >= 6) {
            addQuiz(quizData)
                .then((success) => {
                    alert(success)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            alert("Must Fill All Fields..")
        }
    }

    return (
        <div>
            <Box sx={{ justifyContent: 'center', marginTop: 1, color: 'white', display: 'flex' }}>
                <h1 className='h1courses'>Add Question in Quiz</h1>
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
                    <TextField label="Question" variant="outlined" onChange={e => setQuizData({ ...quizData, question: e.target.value })} />
                </Box>
                <Box>
                    <TextField label="Option 1" onChange={e => setQuizData({ ...quizData, option1: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Option 2" onChange={e => setQuizData({ ...quizData, option2: e.target.value })} type='text' variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Option 3" type='text' onChange={e => setQuizData({ ...quizData, option3: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Option 4" type='text' onChange={e => setQuizData({ ...quizData, option4: e.target.value })} variant="outlined" />
                </Box>
                <Box>
                    <TextField label="Correct Answer" type='text' onChange={e => setQuizData({ ...quizData, correctAns: e.target.value })} variant="outlined" />
                    <p>**Correct Answer should be match atleast 1 option.</p>
                </Box>
                <Box>
                    <Button onClick={get}>
                        Add Question
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default QuizForm;