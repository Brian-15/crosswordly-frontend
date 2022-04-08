import "./Cell.css";

const Cell = ({ letter, isActive }) => {
  let className;

  if (letter) {
    className = "Cell-" + (isActive ? "active" : "inactive");
  } else {
    className = "Cell-blank";
  }

  return <td className={"Cell " + className}>
    <b>{isActive ? letter.toUpperCase() : ""}</b>
  </td>;
};

export default Cell;