import { ReactSVG } from "react-svg";
import neonframe from "../../assets/imgs/neon-frame-2.svg";
import "./BackgroundElements.scss";

function BackgroundElements() {
  return (
    <div className='frame'>
      <ReactSVG className='svg-wrapper' src={neonframe} />
    </div>
  );
}
export default BackgroundElements;
