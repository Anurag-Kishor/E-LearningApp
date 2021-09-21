const express = require('express');
const { addStudent, getAllStudents, getStudent, updateStudent, deleteStudent, 
        addTeacher, getAllTeachers, deleteTeacher,
        addCourses, deleteCourse, deleteAllRecords } = require('../controllers/adminController')
const router = express.Router();

// /api/admin/..
router.post('/addStudent', addStudent);
router.get('/getAllStudents', getAllStudents)
router.get('/getStudent/:id', getStudent)
router.put('/updateStudent/:id', updateStudent)
router.delete('/deletestudent/:id', deleteStudent)


router.post('/addTeacher', addTeacher)
router.get('/getAllTeachers', getAllTeachers)
router.delete('/deleteTeacher/:id', deleteTeacher)

/*router.post('/addSubjects', addSubjects)
router.put('/updateSubjectDetails/:id', updateSubjectDetails)
router.get('/getAllSubjects', getAllSubjects)
router.delete('/deleteSubject/:id', deleteSubject)*/

router.post('/addCourses', addCourses);
router.delete('/deleteCourse/:id', deleteCourse)

router.delete('/deleteAllRecords/:id', deleteAllRecords)


module.exports= {
    routes: router
}