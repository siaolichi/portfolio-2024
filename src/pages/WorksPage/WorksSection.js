import "./WorksSection.scss";

import WorkCard from "./WorkCard";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

function WorksSection() {
  const dispatch = useDispatch();
  console.log("show works section");
  const closeWorksPage = () => {
    dispatch(setPage("home"));
    console.log("on miss click");
  };
  return (
    <group onPointerMissed={closeWorksPage}>
      <WorkCard position={[0, 0, 3]} />
    </group>
  );
}

export default WorksSection;
