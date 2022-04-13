import Table from "react-bootstrap/Table";

const UserTable = ({ highScore }) => {
  return (
    <Table>
      <thead>
        <tr>
          <td>High Score</td>
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