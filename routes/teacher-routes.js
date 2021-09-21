const express = require('express');
const router = express.Router();
const { getAllRegisteredStudents, 
    createFolder,
    addFile,
    addAssignment,
    createClassroom,
    viewSubmissions,
    getSubmissionOfStudent } = require('../controllers/teacherController')

/* 
Must be able to add Folders into the subject classroom
Must be able to add files to the folders
Must be able to see all the students registered in the subject
Must be able to add assignments to the subject
Must be able to view the assignments uploaded by the students (assignment wise)
View all students who havent submitted (assignment-wise)
*/

// /api/teacher/getAllRegisteredStudent/:classroomId
router.get('/getAllRegisteredStudents/:classroomId', getAllRegisteredStudents);


//must have folder name
// /api/teacher/createFolder/:classsroomId
// Body: name, parentFolderId   (id parentFolderId = -1, then the folder will be created in the classroom home page)
router.post('/createFolder/:classroomId', createFolder)

//must have file name, and folder name
// /api/teacher/createFolder/:classsroomId
// Body: name, parentFolderId   (id parentFolderId = -1, then the file will be created in the classroom home page)
router.post('/addFile/:classroomId', addFile);


//must have assignment name
// /api/teacher/addAssignment/:classroomId
// Body: assignment_name, filename(lab problem file)
router.post('/addAssignment/:classroomId', addAssignment)


// /api/teacher/createClassroom
// Body: name, course(object) 
router.post('/createClassroom', createClassroom)

// id is assignments id, not particular file id
// Body: assignmentId
router.get('/viewSubmissionList/:classroomId', viewSubmissions)

// id is the assignments id, but include student id in body to fetch the exact file
router.get('/getSubmissionOfStudent/:assignmentId', getSubmissionOfStudent)



module.exports= {
    routes: router
}