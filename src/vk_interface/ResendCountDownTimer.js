import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import './style.css';
import {Link, Gray} from "@happysanta/vk-app-ui";

class ResendCountDownTimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            over: false,
            timerId: null,
            seconds: this.props.seconds
        }
    }

    reset() {
        this.setState({timerId : null, over: false, seconds: this.props.seconds });
    }

    componentWillUnmount() {
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId);
            this.setState({timerId : null});
        }
    }

    tick() {
        if (this.state.seconds > 0)
            this.setState({ seconds: this.state.seconds - 1});
        else {
            clearInterval(this.state.timerId);
            this.setState({ over: true, timerId: null });
        }
    }

    startTimer() {
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId);
            this.setState({timerId : null});
        }
        this.setState({ over: false, seconds: this.props.seconds, timerId: setInterval(() => this.tick(), 1000)});
    }

    stopTimer() {
        console.log(this.state);
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId);
            this.reset();
        }
    }

    render() {
        return (<div>
        { this.state && this.state.over ?
            (<Link onClick={ this.props.onOver } component="a" className="vtelegram_validation_other_phone">
                Отправить код повторно
            </Link>) :
            (<Gray className="vtelegram_validation_no_code">
                Отправить код повторно через {this.state.seconds}
            </Gray>)
        }
        </div>
        );
    }
}

export default ResendCountDownTimer;
