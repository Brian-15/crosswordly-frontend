import Button from "react-bootstrap/Button";
import UserTable from "./UserTable";
import GameSetupForm from "../forms/GameSetupForm";

const UserView = ({ user }) => {
  const handleClick = () => {
    // TODO: log user out here
  };
  return (<>
    <UserTable highScore={ user.highScore } />
    <Button onClick={handleClick} variant="alert">Log Out</Button>
  </>);
};

export default UserView;