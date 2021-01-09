import Button from '@material-ui/core/Button';
import * as Flex from '@twilio/flex-ui';
import * as React from 'react';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

export class AudioSettingsButton extends React.PureComponent {
    handleClick = () => {
        Flex.Actions.invokeAction('SetComponentState', {
            name: 'AudioSettingsDialog',
            state: {
                isOpen: true,
            }
        });
    }

    render() {
        return (
            <div style={{
                right: "350px",
                position: "absolute"}} key="audioSettings-button">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleClick()}
                ><SettingsVoiceIcon/></Button>
            </div>
        )
    }
}
