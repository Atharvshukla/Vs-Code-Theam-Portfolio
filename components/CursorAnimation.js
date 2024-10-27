import React from "react";
import dynamic from "next/dynamic";
const AnimatedCursor = dynamic(import("react-animated-cursor"), { ssr: false });
function CursorAnimation() {
    return (
        <AnimatedCursor
            innerSize={8}
            outerSize={30}
            color="0, 255, 0"
            outerAlpha={0.2}
            innerAlpha={1}
            innerScale={0.7}
            outerScale={2.5}
        />
    );
}

export default CursorAnimation;
