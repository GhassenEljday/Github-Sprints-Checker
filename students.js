import axios from "axios";
import { token, repoOwner, repoName } from "./config.js";
import { Students } from "./data/studentsData.js";
import { botToken, team_id } from "./slackConfig.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { WebClient, LogLevel } = require("@slack/web-api");

const bot = new WebClient({
  token: `token ${botToken}`,
  logLevel: LogLevel.DEBUG,
});

// Get all the students that made the pull request.
const getStudents = async () => {
  try {
    const getStudentsData = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?state=all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    var users = [];
    for (let i = 0; i < getStudentsData.data.length; i++) {
      var user = getStudentsData.data[i].user.login;
      users.push(user);
    }

    for (let j = 0; j < Students.length; j++) {
      var student = Students[j];
      if (!users.includes(student.githubUsername)) {
        try {
          const result = await bot.chat.postMessage({
            token: `${botToken}`,
            channel: `${student.studentId}`,
            text: `Hey @${student.display_name} please create pull request for ${repoName} repo`,
          });
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

getStudents();
