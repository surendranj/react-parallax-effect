import { useEffect, useRef } from "react";

const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = useRef<CanvasRenderingContext2D | null>(null);
    const canvasWidth = useRef<number | null>(null);
    const canvasHeight = useRef<number | null>(null);
    const canvasPosition = useRef<DOMRect | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctx.current = canvas.getContext("2d");
            canvasWidth.current = canvas.width;
            canvasHeight.current = canvas.height;
            canvasPosition.current = canvas.getBoundingClientRect();
        }
    });

    return { canvasRef, ctx, canvasWidth, canvasHeight, canvasPosition };
};

export default useCanvas;
