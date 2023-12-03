import "./AudioPage.scss";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import { useFrame, useThree } from "@react-three/fiber";
import sound from "../../assets/audios/Im-still-alive.wav";

function AVPage() {
  const dispatch = useDispatch();

  let audio = new Audio();
  audio.src = sound;

  const audioCtx = new AudioContext();
  const audioSource = audioCtx.createMediaElementSource(audio);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);

  audio.play();

  useFrame((three) => {
    analyser.getByteFrequencyData(dataArray);
    const building1 = three.scene.getObjectByName("building1");
    const building2 = three.scene.getObjectByName("building2");
    const building3 = three.scene.getObjectByName("building3");
    const building4 = three.scene.getObjectByName("building4");
    const building5 = three.scene.getObjectByName("building5");
    building1.scale.y = 0.8 + dataArray[2] / 256;
    building2.scale.y = 0.8 + dataArray[5] / 256;
    building3.scale.y = 0.8 + dataArray[8] / 256;
    building4.scale.y = 0.8 + dataArray[11] / 256;
    building5.scale.y = 0.8 + dataArray[14] / 256;
  });

  const onClosePage = () => {
    if (audioCtx && audioCtx.state !== "closed") audioCtx.close();
    dispatch(setPage("home"));
  };
  return (
    <>
      <group onPointerMissed={onClosePage}></group>
    </>
  );
}

export default AVPage;
