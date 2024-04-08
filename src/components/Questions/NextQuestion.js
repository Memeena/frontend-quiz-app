import Button from "../Button/Button";

export default function NextQuestion({ dispatch }) {
  return (
    <Button onClick={() => dispatch({ type: "nextQuestion" })}>
      Next Question
    </Button>
  );
}
