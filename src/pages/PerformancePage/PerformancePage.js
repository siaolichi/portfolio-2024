import "./PerformancePage.scss";
import performanceList from "../../content/performance-list";
import PerformanceCard from "./PerformanceCard";

function PerformancePage() {
  return (
    <div className='performance-page'>
      <h1>: // PERFORMANCE</h1>
      {performanceList.map((item) => (
        <PerformanceCard item={item} />
      ))}
      <footer>
        <div>by HSIAO LI CHI</div>
        <a href='https://hsiao-li-chi.com'>HSIAO-LI-CHI.com</a>
      </footer>
    </div>
  );
}

export default PerformancePage;
