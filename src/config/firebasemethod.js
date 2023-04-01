import { getDatabase, ref, set, push, onValue, update, remove } from "firebase/database";
import app from "./firebaseconfig";

const dbStuData = getDatabase(app);

function writeToDatabase(obj) {
    return new Promise((resolve, reject) => {
        const reference = ref(dbStuData, 'students')




        const NewRef = push(reference).key;



        const send = ref(dbStuData, `students/${NewRef}`);
        obj.id = NewRef;


        set(send, obj)
            .then(() => {
                resolve("Registration Complete")
            })
            .catch((err) => {
                reject(err)
            })
    })
};

function addCourse(obj) {



    return new Promise((resolve, reject) => {
        const reference = ref(dbStuData, 'course data')
        const NewRef = push(reference).key;
        const send = ref(dbStuData, `course data/${NewRef}`);
        obj.id = NewRef;
        set(send, obj)



            .then(() => {



                resolve("Course Add Successfully")
            })
            .catch((err) => {
                reject(err)



            })
    })
};

function addQuiz(obj) {




    return new Promise((resolve, reject) => {

        
        const reference = ref(dbStuData, 'quiz data')
        const NewRef = push(reference).key;
        const send = ref(dbStuData, `quiz data/${NewRef}`);
        set(send, obj)
            .then(() => {
                resolve("Question Add Successfully")
            })
            .catch((err) => {
                reject(err)
            })
    })
};

function quizDetail(obj) {
    return new Promise((resolve, reject) => {
        const reference = ref(dbStuData, 'quiz detail')
        const NewRef = push(reference).key;
        const send = ref(dbStuData, `quiz detail/${NewRef}`);
        set(send, obj)
            .then(() => {
                resolve("Success")
            })
            .catch((err) => {
                reject(err)
            })
    })
};

const ReadFromDatabase = (nodeName, id) => {
    // console.log(`nodeName=======>`, nodeName)
    // console.log(`id=====>`, id && id)
    return new Promise((resolve, reject) => {
        const reference = ref(dbStuData, `${nodeName}/${id || ""}`)
        onValue(reference, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                resolve(data)
                return
            } else {
                reject('error')
                return
            }
        })
    })
}


const updateData = (newData) => {
    console.log(newData)
    const reference = ref(dbStuData, `course data/${newData.id}`)
    update(reference, newData)
        .then(() => {
            console.log("Success")
        })
        .catch(() => {
            console.log("Error")
        })
    // console.log(reference)
}

const DeleteDataFromDataBase = (nodeName) => {
    const reference = ref(dbStuData, `${nodeName}`)
    remove(reference).then(() => console.log("Deleted")).catch(err => console.error(err))
}

export {
    writeToDatabase,
    ReadFromDatabase,
    addCourse,
    addQuiz,
    quizDetail,
    updateData,
    DeleteDataFromDataBase
}