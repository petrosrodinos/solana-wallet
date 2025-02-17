import AppBar from "../../components/AppBar";
import ActionButtons from "./ActionButtons";
import Header from "./Header";
import Transactions from "./Transactions";
const Home = () => {
  return (
    <div>
      <AppBar />
      <div className="min-h-screen text-white flex flex-col items-center">
        <Header />

        <ActionButtons />

        <Transactions />
      </div>
    </div>
  );
};

export default Home;
