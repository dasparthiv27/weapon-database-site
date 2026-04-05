import { assets } from "../lib/assets";

function BackgroundFrame() {
  return (
    <>
      <div className="bg-fallback" />
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={assets.bgVideo} type="video/mp4" />
      </video>
      <div className="grid-overlay" />
      <div className="scanline" />
    </>
  );
}

export default BackgroundFrame;
