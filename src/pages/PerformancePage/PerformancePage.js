import "./PerformancePage.scss";
import performanceList from "../../content/performance-list";
import PerformanceCard from "./PerformanceCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

function PerformancePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHome = () => {
    dispatch(setPage("home"));
    navigate("/");
  };
  return (
    <div className='performance-page'>
      <div onClick={onClickHome}>
        <div className='performance-page__home'>HSIAO-LI-CHI.com</div>
      </div>
      <h1>: // PERFORMANCE</h1>
      {performanceList.map((item) => (
        <PerformanceCard item={item} key={item.title} />
      ))}
      <footer>
        <div>by HSIAO LI CHI</div>
        <a href='https://hsiao-li-chi.com'>HSIAO-LI-CHI.com</a>
      </footer>
    </div>
  );
}

export default PerformancePage;
