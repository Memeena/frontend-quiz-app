import Button from "../Button/Button";

export default function Submit({ dispatch }) {
  return (
    <Button
      onClick={() =>
        dispatch({
          type: "checkAnswer",
        })
      }
    >
      Submit answer
    </Button>
  );
}
