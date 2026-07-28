import Navbar from "../components/navbar/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100">
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;