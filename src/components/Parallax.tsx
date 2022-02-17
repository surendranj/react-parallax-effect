import { useRef, useState, useEffect } from "react";
import useCanvas from "../hooks/useCanvas";
import Layer from "../utils/layer";

export const Parallax = () => {
    const bgLayerSrc = useRef("/images/sprites/halloween-background/1_game_background/layers/");
    const [gameSpeed, setGameSpeed] = useState(4);
    const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        setGameSpeed(() => inputValue);
    };

    const { canvasRef, ctx, canvasWidth, canvasHeight } = useCanvas();

    useEffect(() => {
        let requestId: number;
        const bgLayer1 = new Image();
        bgLayer1.src = bgLayerSrc.current + "1.png";
        const bgLayer2 = new Image();
        bgLayer2.src = bgLayerSrc.current + "2.png";
        const bgLayer3 = new Image();
        bgLayer3.src = bgLayerSrc.current + "3.png";
        const bgLayer4 = new Image();
        bgLayer4.src = bgLayerSrc.current + "4.png";
        const bgLayer5 = new Image();
        bgLayer5.src = bgLayerSrc.current + "5.png";
        const bgLayer6 = new Image();
        bgLayer6.src = bgLayerSrc.current + "6.png";
        const bgLayer7 = new Image();
        bgLayer7.src = bgLayerSrc.current + "7.png";

        const layer1 = new Layer({ image: bgLayer1, speedModifier: 0.01, gameSpeed, ctx: ctx.current! });
        const layer2 = new Layer({ image: bgLayer2, speedModifier: 0.1, gameSpeed, ctx: ctx.current! });
        const layer3 = new Layer({ image: bgLayer3, speedModifier: 0.2, gameSpeed, ctx: ctx.current! });
        const layer4 = new Layer({ image: bgLayer4, speedModifier: 0.3, gameSpeed, ctx: ctx.current! });
        const layer5 = new Layer({ image: bgLayer5, speedModifier: 0.4, gameSpeed, ctx: ctx.current! });
        const layer6 = new Layer({ image: bgLayer6, speedModifier: 0.5, gameSpeed, ctx: ctx.current! });
        const layer7 = new Layer({ image: bgLayer7, speedModifier: 1, gameSpeed, ctx: ctx.current! });

        const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6, layer7];

        const animate = () => {
            if (canvasWidth && canvasHeight) {
                ctx.current!.clearRect(0, 0, canvasWidth.current!, canvasHeight.current!);
                gameObjects.forEach((object) => {
                    object.update();
                    object.draw();
                });
                requestId = requestAnimationFrame(animate);
            }
        };
        animate();
        return () => {
            cancelAnimationFrame(requestId);
        };
    });

    return (
        <div className="overflow-hidden flex flex-col justify-center items-center w-full h-full">
            <canvas ref={canvasRef} className="w-full" width={640} height={360} />
            {/* <ParallaxSpeed gameSpeed={gameSpeed} handleSpeedChange={handleSpeedChange} /> */}
        </div>
    );
};

export default Parallax;
