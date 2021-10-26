import { useEffect, useState } from "react";
import Button from "./button";
const Container = (props: any) => {
    const [sequence, setSequence] = useState<number[]>([]);
    const [index, setIndex] = useState(0);
    const [playerSequence, setPlayerSequence] = useState<number[]>([]);
    const [running, setRunning] = useState(false);
    const [current, setCurrent] = useState<number>();
    const [clickCounter, setClickCounter] = useState<number>(0)
    const [strict, setStrict] = useState(false)
    const [winner, setWinner] = useState(false)
    const [iterating, setIterating] = useState(false)

    // useEffect(() => {
    //     setRunning(true)
    // }, [running])
    useEffect(() => {
        const iterateSequence = (sequence: number[]) => {
            let i = 0
            if (running) {
                setIterating(true)
                const interval = setInterval(() => {
                    setCurrent(sequence[i++]);
                    // hack to force rerender
                    console.log('i', i)
                    setIndex(i)
                    if (i === sequence.length + 1) {
                        // i = 0
                        console.log('inter', interval)
                        clearInterval(interval)
                        setIterating(false)
                    }
                }, 1000);
                // clearInterval(interval)

            }
        };
        iterateSequence(sequence)

    }, [running, sequence])
    useEffect(() => {
        let idx = clickCounter - 1
        if (playerSequence.length > 0) {
            if (clickCounter > 0 && playerSequence[idx] && playerSequence[idx] !== sequence[idx]) {
                setPlayerSequence([])
                setClickCounter(0)
                setSequence([...sequence])
                if (strict) {
                    setSequence(generateSequence([]))
                }
            } if (playerSequence.length === sequence.length) {
                props.updateScore(sequence.length)
                setSequence(generateSequence(sequence))
                setPlayerSequence([])
                setClickCounter(0)
            } if (playerSequence.length === 20) {
                console.log('winner')
                setWinner(true)
                reset()
            }
        }
    }, [playerSequence])
    // useEffect(() => {

    // }, [index, sequence.length])
    const updatePlayerSequence = (value: number) => {
        setPlayerSequence(prevstate => [...prevstate, value])
        setClickCounter(prevstate => prevstate + 1)
    }
    const reset = () => {
        setSequence(generateSequence([]))
        setClickCounter(0)
        setPlayerSequence([])
        setRunning(false)
    }
    const handleClick = () => {
        if (running) {
            console.log('reset')
            setWinner(false)
            reset()
        } else {
            setRunning(true);
            setWinner(false)
            setSequence(generateSequence([]));
        }
    }
    return (
        <div className="button-container">
            {[...Array(4)].map((x, i) => (
                <Button class={i} key={i} current={current}  running={running} iterating={iterating} updatePlayerSequence={updatePlayerSequence} />
            ))}
            <button
                onClick={() => handleClick()}
            >
                {!running ?
                    <p>start</p> :
                    <p>reset</p>
                }
            </button>
            <button
                onClick={() => setStrict(prevstate => !prevstate)}
            >
                {!strict ?
                    <p>strict:true</p> :
                    <p>s:false</p>
                }
            </button>
            {winner && <p>winner</p>}
        </div >
    );
};
const randomInt = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const generateSequence = (sequence: any[]) => {
    sequence = [...sequence]
    const rand = randomInt(0, 3);
    sequence.push(rand);
    return sequence;
};

export default Container;
