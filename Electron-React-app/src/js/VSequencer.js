import React from 'react'
import ReactPlayer from 'react-player'

class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: true,
            blendState: false
        }
        this.isStrob = this.props.strobms > 0
        this.timerVisibility = null
        this.timerBlendMode = null

        this.toggleVisibility = this.toggleVisibility.bind(this)
        this.toggleBlendMode = this.toggleBlendMode.bind(this)
    }

    componentDidMount() {
        if (this.isStrob) {
            this.timerVisibility = window.setInterval(this.toggleVisibility, this.props.strobms)
        }
        this.timerBlendMode = window.setInterval(this.toggleBlendMode, this.props.blendms)
    }

    componentWillUnmount() {
        if (this.isStrob) {
            window.clearInterval(this.timerVisibility)
        }
        window.clearInterval(this.timerBlendMode)
    }

    toggleVisibility() {
        this.setState((state) => ({
            isVisible: !this.state.isVisible
        }))
    }

    toggleBlendMode() {
        this.setState((state) => ({
            blendState: !this.state.blendState
        }))
    }

    render() {
        return <div className="video-player">
            <div className={this.state.blendState ? this.props.blendx : "blend-normal"}>
                <div className={this.state.isVisible ? "visible" : "hidden"}>
                    <ReactPlayer
                        url={this.props.vsrc + '#t=3050'}
                        playing={true}
                        loop={true}
                    />
                </div>
            </div>
        </div>
    }
}

class VideoComposer extends React.Component {
    render() {
        return <div className="video-composer">
            <VideoPlayer vsrc={"assets/aftertv_nature.mp4"} strobms={500} blendms={20} blendx={"blend-normal"} />
            <VideoPlayer vsrc={"assets/aftertv_riot.mp4"} strobms={300} blendms={350} blendx={"blend-screen"} />
        </div>
    }
}

export class VSequencer extends React.Component {
    render() {
        return <div className='vsequencer-container'>
            <h2>vsequencer-main</h2>
            <VideoComposer />
        </div>
    }
}