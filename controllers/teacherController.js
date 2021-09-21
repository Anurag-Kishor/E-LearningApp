const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Subject = require('../models/subject')
const Submission = require('../models/submission')
const {admin, db} = require('../db')


const getAllRegisteredStudents = async(req, res) => {
    
    try {
        const classroomId = req.params.classroomId;
        const classroom = await db.collection('classroom').doc(classroomId).get();
        const students = classroom.data().enrolled_students;
        // return students id, name
        res.status(400).json({success:true, data: students})

    } catch (error) {
        res.status(400).json({success: false, err: err.error.message});
    }
}

const createFolder = async(req, res) => {
    try {
        const classroomId = req.params.classroomId;
        const folderDetails = req.body;

        //adding folder details to folders collection
        const folderId = await db.collection('folders').add({
            name: folderDetails.name,
            parentFolderId: folderDetails.parentFolderId,
            filesId: null,
            foldersId: null,
            classroomId: classroomId
        });

        // if folder is in the classroom folder, adding it to the folders id array
        if(folderDetails.parentFolderId == "-1")
        {
            const classroomRef = db.collection('classroom').doc(classroomId);
            const unionRes = await classroomRef.update({
                foldersId: admin.firestore.FieldValue.arrayUnion(folderId)
            });

        }else {
            const foldersCollectionRef = db.collection('folders').doc(folderDetails.parentFolderId);
            const folderIdUnion = await foldersCollectionRef.update({
                foldersId: admin.firestore.FieldValue.arrayUnion(folderId)
            });  
        }

        res.status(200).json({success: true, msg: 'Folder Created'});
    } catch (error) {
        res.status(400).json({success: false, err: error.message});    
    }
}

const addFile = async(req, res) => {
    try {
        const classroomId = req.params.classroomId;
        const fileDetails = req.body;

        //adding folder details to folders collection
        const fileId = await db.collection('files').add({
            name: fileDetails.name,
            parentFolderId: fileDetails.parentFolderId,
            classroomId: classroomId
        });

        // if folder is in the classroom folder, adding it to the folders id array
        if(folderDetails.parentFolderId == "-1")
        {
            const classroomRef = db.collection('classroom').doc(classroomId);
            const unionRes = await classroomRef.update({
                foldersId: admin.firestore.FieldValue.arrayUnion(folderId)
            });

        }else {
            const foldersCollectionRef = db.collection('folders').doc(fileDetails.parentFolderId);
            const fileIdUnion = await foldersCollectionRef.update({
                filesId: admin.firestore.FieldValue.arrayUnion(fileId)
            })
        }

        res.status(200).json({success: true, msg: 'File Created'});
    } catch (error) {
        res.status(400).json({success: false, err: error.message});    
    }
}

const addAssignment = async(req, res) => {
    try {
        const classroomId = req.params.classroomId;
        const assignmentDetails = req.body;

        const classroomAssignmentsRef = db.collection('classroom').doc(classroomId).collection('assignments');
        const assignmentId = await classroomAssignmentsRef.add({
            name: assignmentDetails.name,
            file: assignmentDetails.file,
            classroomId: classroomId
        })
        res.status(200).json({success: true, msg: 'Assignment Created'});
    } catch (error) {
        res.status(400).json({success: false, err: error.message});    
    }
}

const createClassroom = async(req, res) => {
    try {
        const classroomDetails = req.body;

        const classroom = await db.collection('classroom').add({
            name: classroomDetails.name,
            course: {
                id: classroomDetails.course.id,
                name: classroomDetails.course.name
            }
        })
        res.status(200).json({success: true, msg: 'Classroom Created'});
    } catch (error) {
        res.status(400).json({success: false, err: error.message});    
    }
}

const viewSubmissions = async(req, res) => {
    try {
        const classroomId = req.params.classroomId;
        const assignmentId = req.body.assignmentId;

        const assignmentSubmissionsRef = await db.collection('classroom').doc(classroomId)
                                    .collection('assignments').doc(assignmentId)
                                    .collection('assignment_submissions').get();
      
        const submissions = [];

        if(assignmentSubmissionsRef.empty){
            res.status(400).json({success: false, err: 'No submissions yet'});
        }else{
            assignmentSubmissionsRef.forEach(s => {
                const submission = new Submission(
                    s.data().studentId,
                    s.data().fileName
                )
                submissions.push(submission);
            })
            res.status(200).json({success: true, data: submissions});
        }

    } catch (error) {
        res.status(400).json({success: false, err: err.error.message});
    }
}

const getSubmissionOfStudent = async(req, res) => {

}


module.exports = {
    getAllRegisteredStudents, 
    createFolder,
    addFile,
    addAssignment,
    createClassroom,
    viewSubmissions,
    getSubmissionOfStudent
}