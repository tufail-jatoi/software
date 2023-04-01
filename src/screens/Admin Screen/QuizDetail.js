import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { ReadFromDatabase } from '../../config/firebasemethod';

const QuizDetail = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        ReadFromDatabase('quiz detail')
            .then((res) => {
                // console.log(res)
                setData(Object.values(res))
            })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <div>
            <h1 className='regisdetail'>Quiz Details</h1>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{e.startQuiz}</td>
                            <td>{e.perc.toFixed(2)} %</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default QuizDetail;