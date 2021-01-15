import axios from "axios";
import { TOKEN, REPO_OWNER, REPO_NAME } from "./config/config.js";
import { students } from "./data/studentsData.js";
import { BOT_TOKEN, TEAM_ID } from "./config/slack.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { WebClient, LogLevel } = require("@slack/web-api");

const bot = new WebClient({
  token: `token ${BOT_TOKEN}`,
  logLevel: LogLevel.DEBUG,
});

// Get all the students that made the pull request.
const getStudents = async () => {
  try {
    const allPullRequestsData = await axios.get(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const studentsWithPullRequestLogin = allPullRequestsData.data.map(
      (pullRequest) => pullRequest.user.login
    );
    const studentsWithoutPullRequest = students.filter(
      (student) =>
        !studentsWithPullRequestLogin.includes(student.githubUsername)
    );
    Promise.all(
      studentsWithoutPullRequest.map((student) =>
        bot.chat.postMessage({
          token: `${BOT_TOKEN}`,
          channel: `${student.studentId}`,
          text: `Hey @${student.display_name} please create pull request for ${REPO_NAME} repo`,
        })
      )
    );
  } catch (error) {
    console.error(error);
  }
};

getStudents();
