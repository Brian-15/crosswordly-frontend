import Table from "react-bootstrap/Table";

const UserTable = ({ highScore }) => {
  return (
    <Table bordered hover style={{ width: "15%", margin: "auto" }}>
      <thead>
        <tr>
          <td>Your High Score</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{ highScore }</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserTable;