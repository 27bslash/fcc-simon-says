import { useState, useEffect } from "react";

const Button = (props: any) => {
    let highlight = `button-${props.class}`;
    const url = `https://s3.amazonaws.com/freecodecamp/simonSound${props.class + 1}.mp3`
    const audio = new Audio(url)
    const [isPlaying, setIsplaying] = useState(false)
    useEffect(() => {
        isPlaying ? audio.play() : audio.pause();
    }, [isPlaying]);
    const disabled = props.running ? props.iterating : true
    if (props.current === props.class) {
        setTimeout(() => {
            setIsplaying(true)
            document.querySelector(`.button-${props.current}`)?.setAttribute('class', `button-${props.current}-highlight`)
        }, 300);
        setTimeout(() => {
            setIsplaying(false)
            document.querySelector(`.button-${props.current}-highlight`)?.setAttribute('class', `button-${props.current}`)
        }, 1000);
    }
    const handleClick = (props: any) => {
        setIsplaying(true)
        props.updatePlayerSequence(props.class)
        setTimeout(() => {
            setIsplaying(false)
        }, 1000);
    }
    return (
        <button disabled={disabled}
            className={highlight}
            onClick={() => handleClick(props)}
        >
            button {props.class}
        </button>
    );
};
export default Button;
