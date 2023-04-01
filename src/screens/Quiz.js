import { Box, TextField } from '@mui/material';
import React from 'react'
import '../App.css'
import UserAppBar from '../components/UserNavbar';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import { quizDetail, ReadFromDatabase } from '../config/firebasemethod';
import CircularProgress from '@mui/material/CircularProgress';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [isShowResult, setIsShowResult] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [startQuiz, setStartQuiz] = useState('');
    // console.log(startQuiz)

    useEffect(() => {
        ReadFromDatabase('quiz data')
            .then((res) => {
                const resolve = Object.values(res)
                const a = resolve.length > 0 && resolve.map((e, i) => {
                    const obj = {
                        q: e.question,
                        options: [e.option1, e.option2, e.option3, e.option4],
                        correctAnswer: e.correctAns
                    }
                    return obj
                })
                setData(a)
                // console.log('a====>', a)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    // console.log('data=====>', data)

    const checkQuestion = (a, b) => {
        if (a == b) {
            setScore(score + 1)
        }
        if (questionCount + 1 == data.length) {
            setShowQuiz(true);
        } else {
            setQuestionCount(questionCount + 1)
        }
    }

    const perc = (score / data.length) * 100;
    // console.log(perc)

    let resultText = "";

    if (perc <= 100 && perc >= 80) {
        resultText = "Congratulations 🎉, You Played Better. I think you are a good coder, but still something which can be improved. Take a little rest, and come back for quiz at least one more time."
    } else if (perc <= 79 && perc >= 60) {
        resultText = "Played Better 😔, But you have to need a lot of hardwork. Take a little bit rest and start work again."
    } else if (perc <= 59 && perc >= 40) {
        resultText = "You need a lot of hard work 😭. You are a near to fail. If you work hard, it will happen."
    } else {
        resultText = "Failed 😤."
    }

    const sendQuizDetail = () => {
        if (!startQuiz) {
            alert("Please Enter Your Name")
        } else {
            quizDetail({ startQuiz, perc })
                .then((success) => {
                    // alert(success)
                    setShowQuiz(false)
                    setIsShowResult(true)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        // alert("Ssss ")
    }

    return (
        <div>
            <UserAppBar />
            <Box>
                {showQuiz
                    ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Firstly, Enter Your Name.</Card.Title>
                                <Card.Subtitle className="mb-3 mt-3 text-muted">
                                    <TextField label='Enter Your Real Name' onChange={(e) => setStartQuiz(e.target.value)} />
                                </Card.Subtitle>
                                <Card.Link><Button onClick={sendQuizDetail}>Start Quiz</Button></Card.Link>
                            </Card.Body>
                        </Card>
                    </Box>
                    :
                    <Box>
                        {
                            isShowResult
                                ?
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>Quiz Result</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{perc.toFixed(2)}%</Card.Subtitle>
                                            <Card.Text>
                                                {resultText}
                                            </Card.Text>
                                            <Card.Link>Play Again</Card.Link>
                                            <Card.Link onClick={() => navigate('/')}>Back to Registration</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </Box>
                                :
                                <div>
                                    <Box className='quiz_headings text-center mt-2'>
                                        <h1 className='text-center bg-secondary text-white'>HTML, CSS Quiz</h1>
                                        <h2><Badge>This Quiz Makes Your Code More Perfect.</Badge></h2>
                                    </Box>
                                    <Box className='container mt-5'>
                                        {
                                            isLoading
                                                ?
                                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                                    <CircularProgress />
                                                </Box>
                                                :
                                                <Box>
                                                    <h5>Question No {questionCount + 1} / {data.length}:</h5>
                                                    <h3 className='ms-3'>{data[questionCount].q}</h3>
                                                    <Box sx={{ display: "flex", justifyContent: 'space-around', flexWrap: "wrap" }}>
                                                        {data[questionCount].options.map((e, i) =>
                                                            <Box key={i} sx={{ paddingTop: 5 }}>
                                                                <Button onClick={() => checkQuestion(e, data[questionCount].correctAnswer)} variant="outline-light text-dark">
                                                                    {e}
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
                                                        <Button variant='outline-dark' onClick={() => checkQuestion(data[questionCount])}>Skip Question</Button>
                                                    </Box>
                                                </Box>
                                        }
                                    </Box>

                                </div>
                        }
                    </Box>
                }
            </Box>
        </div >
    )
}

export default Quiz;

// 2nd Quiz

// import React, { useState } from 'react'
// import { Button, Grid, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import Chip from "@mui/material/Chip";

// const Quiz = () => {

// const [quizData, setQuizData] = useState([
//         {
//             question: "Html Stands For _______________________",
//             options: [
//                 "Hyper Text Makeup Language",
//                 "html",
//                 "Case Cading Style Sheet",
//                 "Hypertext markup language",
//             ],
//             correctAns: "Hypertext markup language",
//         },
//         {
//             question: "Css Stands For _______________________",
//             options: [
//                 "Casecading Style Sheet",
//                 "Java",
//                 "Ram",
//                 "Hypertext markup language",
//             ],
//             correctAns: "Casecading Style Sheet",
//         },
//         {
//             question: "Js Stands For _______________________",
//             options: ["Java Style", "Java Script", "Script", "Script Src"],
//             correctAns: "Java Script",
//         },
//         {
//             question: "Dom Stands For _______________________",
//             options: ["Document Object Model", "html", "Css", "Java"],
//             correctAns: "Document Object Model",
//         },
//         {
//             question: "Ram Stands For _______________________",
//             options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
//             correctAns: "Random Acccess Memory",
//         },
//         {
//             question: "Rom Stands For _______________________",
//             options: [
//                 "Hyper Text Markup Language",
//                 "html",
//                 "HTml",
//                 "Read Only Memory",
//             ],
//             correctAns: "Read Only Memory",
//         },
//     ]);

//     const [indexNumber, setIndexNumber] = useState(0);
//     const [score, setScore] = useState(0);
//     const [isShowResult, setIsShowResult] = useState(false);

//     const checkQuestion = (a, b) => {
//         if (a == b) {
//             setScore(score + 1);
//         }
//         if (indexNumber + 1 == quizData.length) {
//             setIsShowResult(true)
//         } else {
//             setIndexNumber(indexNumber + 1)
//         }
//     }

//     return (
//         <div>
//             <h1>Quiz App</h1>
//             {isShowResult
//                 ?
//                 <h1>Your Percentage is {(score / quizData.length) * 100}</h1>
//                 :
//                 <Box>
//                     <Box sx={{ padding: 1 }}>
//                         <Typography variant='h6'>
//                             {[indexNumber + 1]}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ padding: 1 }}>
//                         <Typography variant='h5'>
//                             {quizData[indexNumber].question}
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Grid container>
//                             {quizData[indexNumber].options.map((e, i) => (
//                                 <Grid key={i} item md={6} sx={{ padding: 5 }}>
//                                     <Chip onClick={() => checkQuestion(e, quizData[indexNumber].correctAns)} label={e} />
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </Box>
//                     <Box sx={{ padding: 5, display: 'flex', justifyContent: 'center' }}>
//                         <Button variant='contained' onClick={() => checkQuestion(quizData[indexNumber])}>Next Ques</Button>
//                     </Box>
//                 </Box>
//             }
//         </div>
//     )
// }

// export default Quiz;