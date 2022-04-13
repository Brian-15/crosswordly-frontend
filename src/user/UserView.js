import RegisterForm from "../forms/RegisterForm";
import LoginForm from "../forms/LoginForm";
import UserTable from "./UserTable";

const UserView = ({ user }) => {
  return user 
    ? <UserTable highScore={ user.highScore } />
    : <div className="d-flex flex-row">
        <RegisterForm />
        <LoginForm />
      </div>;
};

export default UserView;