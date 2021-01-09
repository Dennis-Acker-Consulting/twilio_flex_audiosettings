import Button from '@material-ui/core/Button';
import * as Flex from '@twilio/flex-ui';
import * as React from 'react';
import { Actions, withTheme,  withTaskContext } from '@twilio/flex-ui';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
import CancelIcon from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';

class AudioSettingsDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioSettings: null
        };

    }

    componentDidMount() {

        var audioSettings = Flex.Manager.getInstance().voiceClient.audio.audioConstraints;
        audioSettings = audioSettings ? audioSettings : {
            channelCount: 1,
            sampleRate: 16000,
            sampleSize: 16,
            volume: 1,
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false
        }

        this.setState({
            audioSettings: audioSettings
        })
    }
    
    closeDialog = () => {
        Actions.invokeAction('SetComponentState', {
            name: 'AudioSettingsDialog',
            state: {
                isOpen: false,
            }
        });
    }

    handleClick = () => {
        Flex.Manager.getInstance().voiceClient.audio.setAudioConstraints(this.state.audioSettings);
        this.setState({
            audioSettings: Flex.Manager.getInstance().voiceClient.audio.audioConstraints
        })
    }

    handleChange = (e, c) => {
        var audioSettings = this.state.audioSettings;
        switch (c) {
            case "channelCount":
                audioSettings.channelCount = e.target.value;
                break;
            case "sampleRate":
                audioSettings.sampleRate = e.target.value;
                break;
            case "sampleSize":
                audioSettings.sampleSize = e.target.value;
                break;
            case "volume":
                audioSettings.volume = e.target.value;
                break;
            case "echoCancellation":
                audioSettings.echoCancellation = e.target.checked;
                break;
            case "autoGainControl":
                audioSettings.autoGainControl = e.target.checked;
                break;
            case "noiseSuppression":
                audioSettings.noiseSuppression = e.target.checked;
                break;
        }

        this.setState({
            audioSettings: audioSettings
        })
    }
    
    render() {

        const Cancel = () => {
            return (
                <div style={{ position: "absolute", top: "5px", right: "5px" }}>
                    <Button color="default" onClick={() =>this.closeDialog()}>
                        <CancelIcon/>
                    </Button>
                </div>
            )
        }

        return (
            <Dialog open={this.props.isOpen ? true : false}>
                <div style={{ minWidth: "500px", minHeight: "500px" }}>
                    <div style={{ padding: "30px" }}>
                        <p> Audio Settings </p>
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>Samplerate: </p><Input onChange={(e) => this.handleChange(e, "sampleRate")} value={this.state.audioSettings ? this.state.audioSettings.sampleRate : 0} /><p style={{
                            marginLeft: "10px"
                        }}> Hz</p></div>
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>Samplesize: </p><Input onChange={(e) => this.handleChange(e, "sampleSize")} value={this.state.audioSettings ? this.state.audioSettings.sampleSize : 0} /><p style={{
                            marginLeft: "10px"
                        }}> Bit</p></div>
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>Channels: </p><Input onChange={(e) => this.handleChange(e, "channelCount")} value={this.state.audioSettings ? this.state.audioSettings.channelCount : 0} /></div>
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>Volume: </p><Input onChange={(e) => this.handleChange(e, "volume")} value={this.state.audioSettings ? this.state.audioSettings.volume : 0} /></div>
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>EchoCancellation: </p><Checkbox onChange={(e) => this.handleChange(e, "echoCancellation")} checked={this.state.audioSettings ? this.state.audioSettings.echoCancellation : false} /></div >
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>AutoGainControl: </p><Checkbox onChange={(e) => this.handleChange(e, "autoGainControl")} checked={this.state.audioSettings ? this.state.audioSettings.autoGainControl : false} /></div >
                        <div style={{ display: "inline-flex", lineHeight: "75px", width: "100%" }}><p style={{
                            marginRight: "10px"
                        }}>NoiseSuppression: </p><Checkbox onChange={(e) => this.handleChange(e, "noiseSuppression")} checked={this.state.audioSettings ? this.state.audioSettings.noiseSuppression : false} /></div >
                        <Cancel />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleClick()}
                        ><p>Speichern</p></Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const mapStateToProps = state => {
    const componentViewStates = state.flex.view.componentViewStates;
    const audioSettingsDialogState = componentViewStates && componentViewStates.AudioSettingsDialog;

    return audioSettingsDialogState;
};

export default connect(mapStateToProps)(withTheme(withTaskContext(AudioSettingsDialog)));