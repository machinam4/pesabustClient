import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const BurstGraph = () => {
  const canvasRef = useRef();
  const BustRate = useSelector((state) => state.auth.bustRate);
  const BustStatus = useSelector((state) => state.auth.bustStatus);
  const Counter = useSelector((state) => state.auth.counter);
  const inBet = useSelector((state) => state.auth.inBet);
  // const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = 480;
    // canvas.height = 280;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    // canvas.height = 280;
    const context = canvas.getContext("2d");

    // draw the x-axis
    context.beginPath();
    context.moveTo(0, canvas.height);
    context.lineTo(480, canvas.height);

    // draw the y axis
    context.moveTo(0, 20);
    context.lineTo(0, canvas.height);
    context.strokeStyle = "#000";
    context.lineWidth = 10;
    context.stroke();

    context.beginPath();
    context.moveTo(0, canvas.height);
    for (let start = 0; start < BustRate.length; start++) {
      const rate = BustRate[start];
      context.lineTo(20 * rate, canvas.height / rate);
    }
    context.strokeStyle = "#000";
    context.lineWidth = 10;
    context.stroke();

    context.font = "bold 50px sans-serif";
    context.fillStyle = inBet ? "#06FF00" : "#FFBF00";
    context.fillText(
      `X${BustRate[BustRate.length - 1]}`,
      canvas.width / 3,
      canvas.height / 2
    );
  });
  // socket functions
  // socket.on("game_wait", (data) => {
  //   setBustStatus("wait");
  //   setCounter(data);
  // });
  // socket.on("game_play", (data) => {
  //   setBustStatus("play");
  //   setCounter(data);
  //   BustRate.push(data);
  // });
  // socket.on("game_end", (data) => {
  //   setBustStatus("end");
  //   setBustRate([]);
  //   setCounter(data);
  // });

  return (
    <div>
      {/* <BustGraph2 /> */}
      {BustStatus === "wait" && (
        <div className="grid place-items-center h-40 md:h-72">
          <p className="inline-block align-baseline text-4xl text-center">
            Next Round In <br></br>
            <span className="mt-0 p-0 text-6xl text-orange font-bold">
              {Counter}
            </span>
          </p>
        </div>
      )}

      <p className={BustStatus === "play" ? "" : "hidden"}>
        <canvas ref={canvasRef} className="w-80 h-40 md:h-72 md:w-96"></canvas>
      </p>

      {BustStatus === "end" && (
        <div className="grid place-items-center h-40 md:h-72">
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
