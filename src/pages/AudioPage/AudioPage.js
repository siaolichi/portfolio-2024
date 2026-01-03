import "./AudioPage.scss";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import { useFrame } from "@react-three/fiber";
import sound from "../../assets/audios/Im-still-alive.wav";
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import playButton from "../../assets/icons/play-button.png";
import pauseButton from "../../assets/icons/pause-button.png";
import forwardButton from "../../assets/icons/forward-button.png";
import rewindButton from "../../assets/icons/rewind-button.png";

function AVPage() {
  const dispatch = useDispatch();

  const audioRef = useRef();
  const audioCtx = useRef(new AudioContext());
  const analyser = useRef(audioCtx.current.createAnalyser());

  analyser.current.fftSize = 32;
  const bufferLength = analyser.current.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const [isPlaying, setIsPlaying] = useState(true);
  let audioSource = useRef(null);

  const handleAnalyser = () => {
    if (audioSource.current) return;
    audioSource.current = audioCtx.current.createMediaElementSource(audioRef.current);
    audioSource.current.connect(analyser.current);
    analyser.current.connect(audioCtx.current.destination);
  };

  useFrame((three) => {
    analyser.current.getByteFrequencyData(dataArray);
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

  const onClosePage = (e) => {
    if (audioCtx.current && audioCtx.current.state !== "closed") audioCtx.current.close();
    audioRef.current.pause();
    dispatch(setPage("home"));
  };

  const onPlay = (e) => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const onPause = (e) => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const onNext = (e) => {
    e.stopPropagation();
  };
  const onLast = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <Html fullscreen>
        <div className='audio-page' onClick={onClosePage}>
          <audio ref={audioRef} src={sound} autoPlay onPlay={handleAnalyser}></audio>
          <div className='audio-page__wrapper' onClick={(e) => e.stopPropagation()}>
            <div className='audio-page__current-source'>I'm Still Alive</div>
            <div className='audio-page__controller'>
              {/* <img className='audio-page__icon' alt='rewind button' onClick={onLast} src={rewindButton} /> */}
              {!isPlaying ? (
                <img className='audio-page__icon' alt='play button' onClick={onPlay} src={playButton} />
              ) : (
                <img className='audio-page__icon' alt='pause button' onClick={onPause} src={pauseButton} />
              )}
              {/* <img className='audio-page__icon' alt='forward button' onClick={onNext} src={forwardButton} /> */}
            </div>
          </div>
        </div>
      </Html>
    </>
  );
}

export default AVPage;
