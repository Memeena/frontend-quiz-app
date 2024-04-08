import styles from "./Question.module.css";
import "../../index.css";
import NextQuestion from "./NextQuestion";
import Submit from "./Submit";
import FinishButton from "./FinishButton";

export default function Questions({
  questions,
  numQuestions,
  index,
  dispatch,
  answer,
  hasAnswered,
  iscorrect,
  answerSubmitted,
  noanswer,
  darkMode,
}) {
  const borderStyle = (option) => ({
    border: answerSubmitted
      ? iscorrect
        ? option === questions.answer
          ? "3px solid var(--color-green)"
          : "none"
        : option === answer
        ? "3px solid var(--color-red)"
        : "none"
      : hasAnswered
      ? option === answer
        ? "3px solid var(--color-blue)"
        : "none"
      : "none",
  });

  return (
    <div className={styles.questions}>
      <div className={styles.question}>
        <h5 className={styles.qnNumber} data-mode={darkMode}>
          Question {index + 1} of {numQuestions}
        </h5>
        <h2 className={styles.qn} data-mode={darkMode}>
          {questions.question}
        </h2>
      </div>
      <progress
        className={styles.progress}
        max={numQuestions}
        value={index + Number(answer !== null)}
        data-mode={`${darkMode}`}
      />

      <div className={styles.options}>
        {questions.options.map((option, i) => (
          <button
            key={option}
            disabled={answerSubmitted}
            onClick={() => dispatch({ type: "answerClicked", payload: option })}
            className={styles.option}
            style={borderStyle(option)}
            data-mode={`${darkMode}`}
          >
            <span
              className={styles.optionCount}
              style={{
                backgroundColor: answerSubmitted
                  ? iscorrect
                    ? option === questions.answer
                      ? "var(--color-green)"
                      : "none"
                    : option === answer
                    ? "var(--color-red)"
                    : "none"
                  : hasAnswered
                  ? option === answer
                    ? "var(--color-blue)"
                    : "var(--color-mostly-white)"
                  : "var(--color-mostly-white)",
                color:
                  answerSubmitted || hasAnswered
                    ? option === answer
                      ? "var(--color-white)"
                      : "var(--color-light-grey)"
                    : "var(--color-light-grey)",
              }}
            >
              {i === 0 ? "A" : String.fromCharCode("A".charCodeAt() + i)}
            </span>
            <p className={styles.optionName} data-mode={`${darkMode}`}>
              {option}
            </p>
            {answerSubmitted ? (
              iscorrect ? (
                option === answer ? (
                  <img
                    className={styles.chkicon}
                    src="../../assets/images/icon-correct.svg"
                    alt="icon"
                  />
                ) : (
                  ""
                )
              ) : option === questions.answer ? (
                <img
                  className={styles.chkicon}
                  src="../../assets/images/icon-correct.svg"
                  alt="icon"
                />
              ) : option === answer ? (
                <img
                  className={styles.chkicon}
                  src="../../assets/images/icon-incorrect.svg"
                  alt="icon"
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </button>
        ))}
      </div>

      <div className={styles.button}>
        {answerSubmitted ? (
          index + 1 < numQuestions ? (
            <NextQuestion dispatch={dispatch} />
          ) : (
            index + 1 === numQuestions && <FinishButton dispatch={dispatch} />
          )
        ) : (
          <div>
            <Submit dispatch={dispatch} />
            {noanswer && (
              <div className={styles.error}>
                <img src="../../assets/images/icon-incorrect.svg" alt="error" />
                <p className={styles.errorMsg} data-mode={darkMode}>
                  {" "}
                  Please select an answer
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
