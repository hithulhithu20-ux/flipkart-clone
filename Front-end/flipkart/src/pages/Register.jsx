import MainLayout from "../layouts/MainLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <MainLayout>
      <div className="flex min-h-[80vh] items-center justify-center p-4">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default Register;