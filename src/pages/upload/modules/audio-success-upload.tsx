import React from "react";

type Props = React.ComponentPropsWithoutRef<"audio">

const AudioSuccessUpload = React.forwardRef<HTMLAudioElement, Props>(({ ...rest }, refs) => (
    <audio ref={refs} src="/trumpet.mp3" className="hidden" preload="metadata" {...rest} />
))

export default AudioSuccessUpload