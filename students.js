import axios from "axios";
import { TOKEN, REPO_OWNER, REPO_NAME } from "./config/config.js";
import { students } from "./data/studentsData.js";
import { BOT_TOKEN, TEAM_ID } from "./config/slack.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { WebClient, LogLevel } = require("@slack/web-api");
const brain = require("brain.js")
const messgesData = require("./data/messgesData.json")


// create the config for our bot.
const bot = new WebClient({
  token: `token ${BOT_TOKEN}`,
  logLevel: LogLevel.DEBUG
});

// Get all the students that made the pull request.
const getStudents = async () => {
  try {
    const allPullRequestsData = await axios.get(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
    const studentsWithPullRequestLogin = allPullRequestsData.data.map(
      (pullRequest) => pullRequest.user.login
    );
    const studentsWithoutPullRequest = students.filter(
      (student) =>
        !studentsWithPullRequestLogin.includes(student.githubUsername)
    );
    // send messages to the students who didin't create a pull request.
    studentsWithoutPullRequest.map(async (student) => {
      try {
        const result = await bot.chat.postMessage({
          token: `${BOT_TOKEN}`,
          channel: `${student.studentId}`,
          text: `Hey @${student.display_name} please don't forget to create a pull request for ${REPO_NAME} repo`
        });
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
};


getStudents();



// train the brain.js to interact with the students and make it able to answer them.

// const network = new brain.recurrent.LSTM();

// const trainingdata = messgesData.map(message => ({
//   input: message.question,
//   output: message.answer
// }));

// network.train(trainingdata, {
//   iterations: 200
// });

// const output = network.run("i can not create a pull request");

// console.log("the answer", output)