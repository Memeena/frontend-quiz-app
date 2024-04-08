import { useEffect, useReducer, useState } from "react";
import data from "./data/data.json";
import "./index.css";
import { ReactComponent as MoonLight } from "./assets/images/icon-moon-light.svg";
import { ReactComponent as SunLight } from "./assets/images/icon-sun-light.svg";
import Main from "./Main";
import Header from "./components/Header/Header";
import Questions from "./components/Questions/Questions";
import QuizCompleted from "./components/QuizCompleted/QuizCompleted";
import ChoosenHeading from "./components/ChoosenHeading/ChoosenHeading";

const initalState = {
  status: "ready", // status =["ready","active","finished"]
  questions: data, // array which consists of the current questions
  choosenTitle: null, // specifies the choosen title from "HTML","CSS","Javascript","Accessibility"
  index: 0, // index which specifies the current element
  answer: null, // specifies the selected answer
  answerSubmitted: false, //checks whether answer is submitted by clicking "Submit answer" button or not
  hasAnswered: false, // checks whether an answer is clicked by user
  iscorrect: false, // checks whether the answer is correct or not
  noofcorrectanswers: 0, // specifies the number of correct answers
  noanswer: false, // checks whether there is an answer clicked
};

//reducer function which handles the logic
function reducer(state, action) {
  switch (action.type) {
    case "choosenTopic":
      //handles the dispatch function when a topic is choosen, which has the index as selected topic index from the quizzes array as "payload"
      //1. updates the "choosenTitle" to the title choosen by the user
      //2. Updates the "status" to "active"
      //3. Updates the "questions" array to the topic choosen by the user
      const choosenTitle = state.questions.quizzes[action.payload].title;
      return {
        ...state,
        choosenTitle: choosenTitle,
        status: "active",
        questions: data.quizzes[action.payload],
      };

    case "answerClicked":
      //handles the dispatch function when an option is clicked before submitting the answer
      //1. Sets the "hasAnswered" to true and "noAnswer" to false since an answer is clicked
      //2. Sets the answer to the option clicked by the user
      return {
        ...state,
        answer: action.payload,
        hasAnswered: true,
        noanswer: false,
      };

    case "checkAnswer":
      //handles the dispatch function when the user submits the answer by clicking the "Submit Answer" button.
      //1.checks "hasAnswered" and sets "noAnswer" to true if no answer is clicked and returns to main function.

      if (!state.hasAnswered) return { ...state, noanswer: true };

      //2. If there is an answer, sets "answerSubmitted" to true and "hasAnswered" to false . [Have done logic based on traversing to sequence of steps. ]
      //3.Checks for correct answer and sets the 'iscorrect' to true
      //4.If the answer is correct, incrementing the "noofcorrectanswers" by 1

      return {
        ...state,
        answerSubmitted: true,
        hasAnswered: false,
        iscorrect:
          state.answer === state.questions.questions[state.index].answer,

        noofcorrectanswers:
          state.answer === state.questions.questions[state.index].answer
            ? state.noofcorrectanswers + 1
            : state.noofcorrectanswers,
      };

    case "nextQuestion":
      //handles the dispatch function when the user clicks the "Next Question" button
      //1. Incrementing the index by 1 to go the next element
      //2. Setting the "hasAnswered","answerSubmitted","answer","iscorrect","noanswer" to its initial state
      return {
        ...state,
        index: state.index + 1,
        hasAnswered: false,
        answerSubmitted: false,
        answer: null,
        iscorrect: false,
        noanswer: false,
      };

    case "finishQuiz":
      //handles the dispatch function called when the user Clicks the the "Finish Quiz" button
      //1. Checks the index to be the last element and if it is, updates the status to "finished"
      return {
        ...state,
        status:
          state.index + 1 === state.questions.questions.length
            ? "finished"
            : state.status,
      };

    case "restart":
      //handles the dispatch function when the user clicks "Play again" button at the end of the quiz
      //Returns the initial state.
      return initalState;

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  //To get the state values from the reducer function
  const [
    {
      questions,
      status,
      choosenTitle,
      index,
      answer,
      hasAnswered,
      iscorrect,
      noofcorrectanswers,
      answerSubmitted,
      noanswer,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  //Using useState for dark or light theme and determining the width of the device
  const [darkMode, setDarkMode] = useState(false);
  const [width, setWidth] = useState(0); //To update the width state based on the device

  function updateWidth() {
    const width = window.innerWidth;
    setWidth(width);
  }

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  //Checking the device of the user
  const device = width > 768 ? "desktop" : width > 592 ? "tablet" : "mobile";
  const mode = darkMode ? "dark" : "light";

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('../assets/images/pattern-background-${device}-${mode}.svg')`,
      }}
      data-mode={darkMode}
    >
      {status !== "ready" && (
        <ChoosenHeading
          questions={questions}
          choosenTitle={choosenTitle}
          darkMode={darkMode}
        />
      )}

      <div className="mode">
        <SunLight className="icon-mode" data-mode={darkMode} />
        <div
          className="mode-wrapper"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          <div className="mode-ball" data-mode={darkMode}></div>
        </div>
        <MoonLight className="icon-mode" data-mode={darkMode} />
      </div>

      <Main className="main">
        {status === "ready" && (
          <Header
            questions={questions}
            dispatch={dispatch}
            darkMode={darkMode}
          />
        )}

        {status === "active" && (
          <div>
            <Questions
              questions={questions.questions[index]}
              numQuestions={questions.questions.length}
              index={index}
              dispatch={dispatch}
              answer={answer}
              hasAnswered={hasAnswered}
              iscorrect={iscorrect}
              answerSubmitted={answerSubmitted}
              noanswer={noanswer}
              darkMode={darkMode}
            />
          </div>
        )}

        {status === "finished" && (
          <QuizCompleted
            questions={questions}
            choosenTitle={choosenTitle}
            noofcorrectanswers={noofcorrectanswers}
            dispatch={dispatch}
            darkMode={darkMode}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
