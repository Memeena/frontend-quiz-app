import Button from "../Button/Button";

export default function FinishButton({ dispatch }) {
  return (
    <Button onClick={() => dispatch({ type: "finishQuiz" })}>
      Finish Quiz
    </Button>
  );
}
