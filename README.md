
# English Vocabulary Trainer is a cool app where you can test your English skills with fun word games. It gives you a bunch of words and challenges you to show off your knowledge. Plus, it keeps track of your progress and gives you instant feedback on how you did. The app is super easy to use and has a bunch of interactive exercises that make learning vocab a breeze. It's perfect for anyone who wants to boost their English skills, whether you're a language learner or just want to get better at English. So, if you're looking for a fun and effective way to improve your English vocab, give English Vocabulary Trainer a try. It's a total game-changer!


## Run Locally

Clone the project
```bash
  git clone https://github.com/Zaharenko/english-vocabulary-trainer.git
```

Go to the project directory
```bash
  cd english-vocabulary-trainer
```

Install dependencies
```bash
  npm install
```

Start
```bash
  npm run start
```

Dev
```bash
  npm run build
```

Prettier format
```bash
  npm run format
```


## 🛠 Skills
Webpack 5, Babel, TypeScript, HTML5, TailwildCSS


## Lessons Learned

There were problems with the task, when a word is being typed from the keyboard, the backlight only works if the letter is present in the word. If it is absent, then the application simply considers an error without indication.

And the question was when catching an error, if the user pressed the missing letter on the keyboard, then the application considers the error.

I also thought for a long time how best to implement the task with the maximum number of errors per task.

Time to complete all tasks | 8-9 hours



## Features

- Each workout contains 6 random words from the list and is a sequential set of tasks.
- In each task, the user receives a word, divided into letters, mixed in random order.
- The task of the user is to collect the whole word.
- The user can click on the buttons with letters or press the corresponding keys on the keyboard.
- If the user selects an incorrect letter, the application counts the error and highlights the corresponding button in red.
- When entering from the keyboard, the backlight only works if the letter is present in the word. If it is missing, then the application simply counts the error without indication.
- The maximum number of errors on one task is 3. When this limit is reached, all buttons are placed in the correct order, but are repainted in red.
- If the user pressed the missing letter on the keyboard, the application counts an error.
- After completing the workout, the application gives statistics:
     - The number of collected words without errors.
     - Number of errors.
     - The word with the most errors.
- There is no ready-made UI for displaying statistics, display the data in any convenient way.


## Authors

- [@Zaharenko](https://www.linkedin.com/in/anton-zaharenko/)

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Success Color | ![#0a192f](https://via.placeholder.com/10/22C55E?text=+) #22C55E |
| Error Color | ![#f8f8f8](https://via.placeholder.com/10/EF4444?text=+) #EF4444 |
| Default Color | ![#00b48a](https://via.placeholder.com/10/3B82F6?text=+) #3B82F6 |