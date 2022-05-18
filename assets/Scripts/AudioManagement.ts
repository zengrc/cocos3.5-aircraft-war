
import { _decorator, Component, Node, AudioClip, assetManager, AssetManager, AudioSource } from 'cc';
import { GAME_MUSIC } from './contant';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = AudioManagement
 * DateTime = Mon May 16 2022 15:20:32 GMT+0800 (中国标准时间)
 * Author = zengrc
 * FileBasename = AudioManagement.ts
 * FileBasenameNoExtension = AudioManagement
 * URL = db://assets/Scripts/AudioManagement.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */
 
@ccclass('AudioManagement')
export class AudioManagement extends Component {

    @property({ type: AudioSource })
    public _sourceMap: { [key: string]: AudioSource } = {};

    private _bundle: AssetManager.Bundle | null = null;
    private _audioMap: { [key: string]: AudioClip } = {};

    loadAudioSource (onLoad) {
        this._sourceMap['bg_sound'] = this.node.addComponent(AudioSource);
        assetManager.loadBundle('Audio', (err, bundle) => {
            this._bundle = bundle;
            this._bundle.loadDir('/', AudioClip, (cur, total) => {
                onLoad(cur, total);
            }, (err, audioList) => {
                audioList.forEach((audio) => {
                    this._audioMap[audio.name] = audio;
                });
            });
        });
    }

    playSound (clipName) {
        if (!this._audioMap[clipName] || !this._sourceMap['bg_sound']) return;
        this._sourceMap['bg_sound'].playOneShot(this._audioMap[clipName], 1);
    }

    playMusic (souceName, clipName, loop = true) {
        if (!this._audioMap[clipName]) return;
        if (!this._sourceMap[souceName]) {
            this._sourceMap[souceName] = this.node.addComponent(AudioSource)
        }
        this._sourceMap[souceName].loop = loop;
        this._sourceMap[souceName].playOnAwake = false;
        this._sourceMap[souceName].clip = this._audioMap[clipName];
        this._sourceMap[souceName].play();
        return this._sourceMap[souceName];
    }

    destroyMusic (souceName) {
        if (!this._sourceMap[souceName]) return; 
        this._sourceMap[souceName].stop();
        const audioSource = this._sourceMap[souceName];
        this._sourceMap[souceName] = undefined;
        audioSource.destroy();
    }

    pauseAllMusic () {
        Object.keys(this._sourceMap).forEach((key) => {
            if (this._sourceMap[key]) {
                this._sourceMap[key].pause();
            }
        });
    }

    stopAllMusic () {
        Object.keys(this._sourceMap).forEach((key) => {
            if (this._sourceMap[key]) {
                this._sourceMap[key].stop();
            }
        });
    }

    resumeAllMusic () {
        Object.keys(this._sourceMap).forEach((key) => {
            if (this._sourceMap[key]) {
                this._sourceMap[key].play();
            }
        });
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
