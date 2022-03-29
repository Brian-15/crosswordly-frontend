import "./Cell.css";

const Cell = ({ letter, isActive }) => {
  const className = " Cell" + letter ?
    (isActive ? "-active" : "-inactive")
    : "-blank";

  return <td className={"Cell" + className}>
    {letter && isActive ? letter : ""}
  </td>;
};

export default Cell;