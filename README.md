# Github-Sprints-Checker


I've built this project just cus I'm lazy and I don't wanna keep checking students one by one, so I made a function that will contact the Github API looking for a result which is an Object that contains all the students who made a pull request then all I do is just checking with the data that I have saved before about the student (it's contains there information like slack_Id, GitHub username, and his real name), after checking this function will take all the students who didin't made a pull request and send them a privet message in Slack using a bot that you can just add it to your workspace and give it the following permissions: 

`chat:write`
`chat:write.customize`
`chat:write.public`
`users:write`

If you don't know how to create a Slack Bot you can check this link: [Create a bot for your workspace](https://slack.com/intl/en-tn/help/articles/115005265703-Create-a-bot-for-your-workspace)



##  How to use?


* First step:  

```sh
Fill the configs files and the data files.
```
You can check the example files.


* Second Step:

```sh
npm install
```


* Third Step:

 ```sh
npm start 
```


## Have Fun 😊
