import { useEffect, useState, useRef } from "react";
import { socket } from "../context/socket";

const BurstGraph = () => {
  const canvasRef = useRef();
  const [Counter, setCounter] = useState();
  const [BustRate, setBustRate] = useState([]);
  const [BustStatus, setBustStatus] = useState("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = 480;
    // canvas.height = 280;
    canvas.width = canvas.clientWidth;
    canvas.height = 280;
    const context = canvas.getContext("2d");

    // draw the x-axis
    context.beginPath();
    context.moveTo(0, 280);
    context.lineTo(480, 280);

    // draw the y axis
    context.moveTo(0, 20);
    context.lineTo(0, 280);
    context.strokeStyle = "#000";
    context.lineWidth = 10;
    context.stroke();

    context.beginPath();
    context.moveTo(0, 280);
    for (let start = 0; start < BustRate.length; start++) {
      const rate = BustRate[start];
      context.lineTo(20 * rate, 480 / rate);
    }
    context.strokeStyle = "#000";
    context.lineWidth = 10;
    context.stroke();

    context.font = "bold 50px sans-serif";
    context.fillStyle = "#FFBF00";
    context.fillText(`X${Counter}`, canvas.width / 3, 170);

    // socket functions
    socket.on("game_wait", (data) => {
      setBustStatus("wait");
      setCounter(data);
    });
    socket.on("game_play", (data) => {
      setBustStatus("play");
      BustRate.push(data);
      setCounter(data);
    });
    socket.on("game_end", (data) => {
      setBustStatus("end");
      setBustRate([]);
      setCounter(data);
    });
  });

  return (
    <div>
      {/* <BustGraph2 /> */}
      {BustStatus === "wait" && (
        <div className="grid place-items-center" style={{ height: "300px" }}>
          <p className="inline-block align-baseline text-4xl text-center">
            Next Round In <br></br>
            <span className="mt-0 p-0 text-6xl text-orange font-bold">
              {Counter}
            </span>
          </p>
        </div>
      )}

      <p className={BustStatus === "play" ? "" : "hidden"}>
        <canvas ref={canvasRef} className="w-80 md:w-96"></canvas>
      </p>

      {BustStatus === "end" && (
        <div className="grid place-items-center" style={{ height: "300px" }}>
          <p className="inline-block align-baseline text-4xl text-yellow">
            Busted @ <b></b>
            <span className="mt-0 p-0 text-6xl text-orange font-bold">
              {Counter}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BurstGraph;
