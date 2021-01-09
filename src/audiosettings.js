import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { loadAudioSettings } from "./components/loadAudioSettings"
import * as Flex from '@twilio/flex-ui';
//import { loadInternalCallInterface } from './components/InternalCall';


const PLUGIN_NAME = 'AudioSettings';

export default class AudioSettings extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    init(flex, manager) {
        loadAudioSettings(flex);


        //set Default Audio Settings
        var audioSettings = audioSettings ? audioSettings : {
            channelCount: 1,
            sampleRate: 16000,
            sampleSize: 16,
            volume: 1,
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false
        }

        Flex.Manager.getInstance().voiceClient.audio.setAudioConstraints(audioSettings);
    }

}

