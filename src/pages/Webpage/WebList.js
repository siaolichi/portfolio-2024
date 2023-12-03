import "./WebList.scss";
import websites from "../../content/websites";
import { Html } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

function WebList() {
  const dispatch = useDispatch();
  return (
    <Html className='web-list' fullscreen>
      <div className='web-list__wrapper' onClick={() => dispatch(setPage("home"))}>
        <div className='web-list__grid'>
          {websites.map((item) => (
            <a href={item.link} className='web-list__link' key={item.name}>
              <img className='web-list__image' src={`/assets/images/websites/${item.src}`} alt={item.name} />
            </a>
          ))}
        </div>
      </div>
    </Html>
  );
}

export default WebList;
