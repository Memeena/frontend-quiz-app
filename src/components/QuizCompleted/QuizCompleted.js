import Button from "../Button/Button";
import ChoosenHeading from "../ChoosenHeading/ChoosenHeading";
import styles from "./QuizCompleted.module.css";

export default function QuizCompleted({
  noofcorrectanswers,
  questions,
  choosenTitle,
  dispatch,
  darkMode,
}) {
  return (
    <div className={styles.quizCompleted}>
      <div className={styles.heading}>
        <h1 className={styles.mainHead} data-mode={darkMode}>
          Quiz completed
        </h1>
        <h4 className={styles.head} data-mode={darkMode}>
          You scored...
        </h4>
      </div>
      <div className={styles.count} data-mode={darkMode}>
        <ChoosenHeading
          questions={questions}
          choosenTitle={choosenTitle}
          darkMode={darkMode}
        />
        <p className={styles.correctAnswers} data-mode={darkMode}>
          {noofcorrectanswers}
        </p>
        <p className={styles.totalQn} data-mode={darkMode}>
          {" "}
          out of {questions.questions.length}
        </p>
      </div>
      <Button
        className={styles.playbtn}
        onClick={() => dispatch({ type: "restart" })}
      >
        Play Again
      </Button>
    </div>
  );
}
