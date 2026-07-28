import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default Login;