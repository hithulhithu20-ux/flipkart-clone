import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <MainLayout>

      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="rounded bg-white p-10 text-center">

          <h1 className="text-4xl font-bold text-green-600">
            Order Placed Successfully
          </h1>

          <p className="mt-4 text-gray-600">
            Thank you for shopping with us.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block bg-[#2874f0] px-6 py-3 text-white"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </MainLayout>
  );
};

export default OrderSuccess;