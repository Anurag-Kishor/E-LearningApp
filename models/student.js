class Student {
    constructor(id, firstName, lastName, 
        courseName, email, year, semester, classroomName){
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.courseName = courseName;
            this.email = email;
            this.year = year;
            this.semester = semester;
            this.classroomName = classroomName;
    }
}

module.exports = Student