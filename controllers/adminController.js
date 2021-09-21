const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Subject = require('../models/subject')
const {db} = require('../db')


// STUDENTS
// document contains 
// id, firstname, lastname, email, classroom (object), year, semester, course (object), assignments(subcolleciton)
// course object contains id, name


const addStudent = async(req, res) => {

    // id, first name, lastname, email, year, semester

    try {
        const data = req.body;
       // console.log(data);
      
        await db.collection('students').doc(data.id).set(data).then(() => {
            res.status(200).json({success: true, msg:'Record created'});

        }).catch(err=> {
            res.status(400).json({success: false, err:err.error.message});
        });
    } catch (error) {
        res.status(400).json({success: false, err:err.error.message});
    }
}

const getAllStudents = async(req, res) => {

    try {
        const students = await db.collection('students');
        const data = await students.get();
        const studentList = [];
        if(data.empty){
            res.status(404).send('No student record found');
        }else{
            data.forEach(s => {

                const student = new Student(
                    s.id,
                    s.data().firstName,
                    s.data().lastName,
                    s.data().course.name,
                    s.data().email,
                    s.data().year,
                    s.data().semester,
                    s.data().classroom
                )
                studentList.push(student);
            })
            res.status(200).json({success: true, data: studentList});
        }
    } catch (error) {
        res.status(400).json({success: false, err: err.error.message});
    }
}

const getStudent = async(req, res) => {

    try{
        const studentid = req.params.id;
        const data = await db.collection('students').doc(studentid).get();

        if(data.empty){
            res.status(404).send('Student record not found')
        }else{
            const student = new Student (
                s.id,
                s.data().firstName,
                s.data().lastName,
                s.data().course.name,
                s.data().email,
                s.data().year,
                s.data().semester,
                s.data().classroom
            )
            res.status(200).json({success: true, data: student});
        }
    }catch(error){
        res.status(400).json({success: false, err: err.error.message});
    }
}

const updateStudent = async(req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const subject = await db.collection('students').doc(id);
        await subject.update(data)
        .then(() =>{
            res.status(200).JSON({success: true, msg: 'Student details updated'});
        }).catch(err => {
            res.status(200).JSON({success: false, err: err.error.message});
        });
       
    }catch(error){
        res.status(400).json({success: false, err: err.error.message});
    }
}

const deleteStudent = async(req, res) => {
    const id = req.params.id;
    await db.collection('students').doc(id).delete().then(() => {
        res.status(200).json({success: true, msg: 'Student deleted successfully'});
    }).catch(() => {
        res.status(400).json({success: false, err: err.error.message});
    })
}

// TEACHERS
// document contains 
// id, firstname, lastname, email, classroom (object)

const addTeacher = async(req, res) => {

    /* teacher template in database

    teacher = {
        id:"",
        firstName:"",
        lastName:"",
        email: "xyz",
        classroom : [
            {
                id:
                name:
            },
            {
                id:
                name:
            }
        ]
    } */

    try {
        const data = req.body;
        console.log(data);
      
        await db.collection('teachers').doc().set(data).then(() => {
            res.status(200).json({success: true, msg:'Teacher added'});
        }).catch(err=> {
            res.status(400).json({success: false, err:err.error.message});
        });
    } catch (error) {
        res.status(400).json({success: false, err:err.error.message});
    }
}

const getAllTeachers = async(req, res) => {
    try {
        const teachers = await db.collection('teachers');
        const data = await teachers.get();
        const teacherList = [];
        if(data.empty){
            res.status(400).json({success: false, err: 'No teachers found'});
            
        }else{
            data.forEach(s => {
                const teacher = new Teacher(
                    s.id,
                    s.data().firstName,
                    s.data().lastName,
                    s.data().email,
                    s.data().classroom
                )
                teacherList.push(teacher);
            })
            res.status(200).json({success: true, data: teacherList});
        }
    } catch (error) {
        res.status(400).json({success: false, err: err.error.message});
    }
}

const deleteTeacher = async(req, res) => {
    const id = req.params.id;
    await db.collection('teachers').doc(id).delete().then(() => {
        res.status(200).json({success: true, msg: 'Teacher deleted successfully'});
    }).catch(() => {
        res.status(400).json({success: false, err: err.error.message});
    })
}

// SUBJECTS

// const addSubjects = async(req, res) => {
//     /* Subject template in database
//         id: "",
//         name: "",
//         courseid: "",
//         year: "",
//         semester: "",
//         facultyid: ""
//     */

//     try {
//         const data = req.body;
//        // console.log("here", data);
        
//         await db.collection('subjects').doc(data.id).set(data).then(() =>{
//             res.status(200).json({success: true, msg:'Subject added'});
//         }).catch(err=> {
//             res.status(400).json({success: false, err: err.error.message});
//         });
//     } catch (error) {
//         res.status(400).json({success: false, err: err.error.message});
//     }
// }

// // PUT /api/admin/updateSubjectFaculty/:id
// // Body contains Updated details object
// const updateSubjectDetails = async(req, res, next) => {
    
//     try{
//         const id = req.params.id;
//         const data = req.body;
//         const subject = await db.collection('subjects').doc(id);
//         await subject.update(data).then(() => {
//             res.status(200).json({success: true, msg: 'Subject details updated'});
//         }).catch(() => {
//             res.status(400).json({success: false, err: 'Could not update subject details'});
//         })
//     }catch(error){
//         res.status(400).json({success: false, err: 'Could not update subject details'});
//     }
// }

// const getAllSubjects = async(req, res) =>{

//     try {
//         const subjects = db.collection('subjects');
//         const data = await subjects.get();
//         const subjectList = [];
//       //  data.forEach(d => console.log(d.data()));
//         if(data.empty){
//             res.status(404).send('No subjects found');
//         }else{
//             data.forEach(s => {
//                 const subject = new Subject(
//                     s.id,
//                     s.data().name,
//                     s.data().courseid,
//                     s.data().year,
//                     s.data().semester,
//                     s.data().facultyid
//                 )
//                 subjectList.push(subject);
//             })
//            res.status(200).json({success: true, data: subjectList});
//         }
//         //res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send({succes: false, err: err.error.message})
//     }
// }

// const deleteSubject = async(req, res) => {
//     const id = req.params.id;
//     await db.collection('subjects').doc(id).delete().then(() => {
//         res.status(200).json({success: true, msg: 'Subject deleted successfully'});
//     }).catch(() => {
//         res.status(400).json({success: false, err: err.error.message});
//     })
// }

// Courses

const addCourses = async(req, res) => {
    /* Courses template
        id: "",
        name: "",
    */
    try {
        const data = req.body;
        console.log(data);
        
        await db.collection('courses').doc(data.id).set(data).then(() =>{
            res.status(200).json({success: true, msg:'Course added'});
        }).catch(err=> {
            res.status(400).json({success: false, err: err.error.message});
        });
    } catch (error) {
        res.status(400).json({success: false, err: err.error.message});
    }
}
const deleteCourse = async(req, res) => {
    const id = req.params.id;
    await db.collection('courses').doc(id).delete().then(() => {
        res.status(200).json({success: true, msg: 'Course deleted successfully'});
    }).catch(() => {
        res.status(400).json({success: false, err: err.error.message});
    })
}


const deleteAllRecords = async(req, res) => {

    const recordName = req.params.id;
   
        await db.collection(recordName).doc().delete().then(() => {
            res.status(200).json({success: true, msg: 'Records deleted successfully'});
        }).catch(() => {
            res.status(400).json({success: false, err: err.error.message});
        });
    
}

module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    getAllTeachers,
    deleteTeacher,
    // addSubjects,
    // getAllSubjects,
    // updateSubjectDetails,
    // deleteSubject,
    addCourses,
    deleteCourse,
    deleteAllRecords

}