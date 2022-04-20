import { useContext } from "react";
import UserContext from "./UserContext";
import Button from "react-bootstrap/Button";
import UserTable from "./UserTable";
import GameSetupForm from "../forms/GameSetupForm";
import Instructions from "../game/Instructions";

const UserView = () => {
  const { user, setUser } = useContext(UserContext);
  const handleClick = () => {
    setUser(null);
  };
  return (<>
    <Instructions />
    <GameSetupForm />
    <UserTable highScore={ user.highScore } />
    <Button className="mt-3" style={{ margin: "auto" }} onClick={handleClick} variant="danger">Log Out</Button>
  </>);
};

export default UserView;