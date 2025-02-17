import { NavLink } from "react-router";

const Wallet = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Crypto Wallet</h1>

        <p className="text-gray-600 mb-6">
          Securely manage your cryptocurrencies. Create a new wallet or import an existing one to
          get started.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <NavLink
            to="/wallet/create"
            className="flex-1 text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create New Wallet
          </NavLink>
          <NavLink
            to="/wallet/import"
            className="flex-1 text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Import Existing Wallet
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
