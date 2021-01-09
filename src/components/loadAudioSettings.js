import * as Flex from '@twilio/flex-ui';
import * as React from 'react';
import { AudioSettingsButton } from './audioSettingsButton';
import AudioSettingsDialog from './audioSettingsDialog';

export function loadAudioSettings() {
    Flex.MainHeader.Content.add(<AudioSettingsButton key="audioSettings-button" />, {
        sortOrder: 1,
        align: "start"
    });
    Flex.AgentDesktopView.Content.add(<AudioSettingsDialog key="audioSettings-dialog" />, { sortOrder: 100 });
}

