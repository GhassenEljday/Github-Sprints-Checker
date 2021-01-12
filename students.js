import axios from "axios";
import { token, repoOwner, repoName } from "./config.js";
import { Students } from "./data/studentsData.js";

// Get all the students that made the pull request.
const getStudents = async () => {
  try {
    const getStudentsData = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    var missingStudent = [];
    var users = [];
    for (let i = 0; i < getStudentsData.data.length; i++) {
      var user = getStudentsData.data[i].user.login;
      users.push(user)
    }
    for (let j = 0; j < Students.length; j++) {
      var student = Students[j].githubUsername;
      if(!users.includes(student)){
        missingStudent.push(student)
      }
    }
    console.log(missingStudent);
  } catch (error) {
    console.error(error);
  }
};

getStudents();
