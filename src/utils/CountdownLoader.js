import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const CountdownLoader = () => (
    <CountdownCircleTimer
        isPlaying
        duration={48}
        colors={['#022d4b', '#004777', '#0d8fe6', '#51b4f7', '#7f61ec', '#8b14ec', '#cd83f8', '#F7B801', '#f14747', '#A30000', '#004777', '#0d8fe6', '#51b4f7', '#7f61ec', '#8b14ec', '#cd83f8', '#F7B801', '#f14747', '#A30000']}
        colorsTime={[37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 2, 0]}
    >
        {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
)

export default CountdownLoader