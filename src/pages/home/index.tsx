import ActionButtons from "./ActionButtons";
import Header from "./Header";
import Transactions from "./Transactions";
const Home = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <Header />

      <ActionButtons />

      <Transactions />
    </div>
  );
};

export default Home;
