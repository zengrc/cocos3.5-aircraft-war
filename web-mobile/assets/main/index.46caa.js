System.register("chunks:///_virtual/contant.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        GAME_EVENT: void 0,
        GAME_MUSIC: void 0,
        PLAY_EVENT: void 0
      });

      cclegacy._RF.push({}, "07a71JkhnNDFrn6XA+sZ8cU", "contant", undefined);

      var GAME_EVENT;

      (function (GAME_EVENT) {
        GAME_EVENT["BACK_MENU"] = "BACK_MENU";
        GAME_EVENT["START_GAME"] = "START_GAME";
        GAME_EVENT["GAME_OVER"] = "GAME_OVER";
      })(GAME_EVENT || (GAME_EVENT = exports('GAME_EVENT', {})));

      var PLAY_EVENT;

      (function (PLAY_EVENT) {
        PLAY_EVENT["INIT"] = "INIT";
        PLAY_EVENT["PAUSE"] = "PAUSE";
        PLAY_EVENT["RESUME"] = "RESUME";
      })(PLAY_EVENT || (PLAY_EVENT = exports('PLAY_EVENT', {})));

      var GAME_MUSIC;

      (function (GAME_MUSIC) {
        GAME_MUSIC["BG"] = "game_music";
        GAME_MUSIC["SHOT"] = "bullet";
        GAME_MUSIC["CRASH_1"] = "enemy1_down";
        GAME_MUSIC["CRASH_2"] = "enemy2_down";
        GAME_MUSIC["CRASH_3"] = "enemy3_down";
        GAME_MUSIC["UFO_FLYING"] = "big_spaceship_flying";
        GAME_MUSIC["GET_BOMB"] = "get_bomb";
        GAME_MUSIC["UPGRADE_DOUBLE_SHOT"] = "get_double_laser";
        GAME_MUSIC["USE_BOMB"] = "use_bomb";
        GAME_MUSIC["GAME_OVER"] = "game_over";
      })(GAME_MUSIC || (GAME_MUSIC = exports('GAME_MUSIC', {})));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnemyController.ts", ['cc', './contant.ts', './_rollupPluginModLoBabelHelpers.js', './AudioManagement.ts', './GameManagement.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, director, Sprite, UITransform, Animation, BoxCollider2D, Size, Vec3, Component, GAME_MUSIC, _inheritsLoose, _extends, _defineProperty, _assertThisInitialized, AudioManagement, GameManagement;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Animation = module.Animation;
      BoxCollider2D = module.BoxCollider2D;
      Size = module.Size;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      GAME_MUSIC = module.GAME_MUSIC;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _extends = module.extends;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      AudioManagement = module.AudioManagement;
    }, function (module) {
      GameManagement = module.GameManagement;
    }],
    execute: function () {
      exports({
        Enemy_Event: void 0,
        Enemy_Type: void 0
      });

      var _Enemy_Config, _dec, _class, _temp;

      cclegacy._RF.push({}, "0c8115pcv5G9aig5ouZagy0", "EnemyController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = enemy
       * DateTime = Wed May 11 2022 15:21:29 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = enemy.ts
       * FileBasenameNoExtension = enemy
       * URL = db://assets/Scripts/enemy.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var Enemy_Type;

      (function (Enemy_Type) {
        Enemy_Type[Enemy_Type["plane"] = 0] = "plane";
        Enemy_Type[Enemy_Type["helicopter"] = 1] = "helicopter";
        Enemy_Type[Enemy_Type["UFO"] = 2] = "UFO";
      })(Enemy_Type || (Enemy_Type = exports('Enemy_Type', {})));

      var Enemy_Event;

      (function (Enemy_Event) {
        Enemy_Event["crash"] = "crash";
      })(Enemy_Event || (Enemy_Event = exports('Enemy_Event', {})));

      var Enemy_Config = exports('Enemy_Config', (_Enemy_Config = {}, _Enemy_Config[Enemy_Type.plane] = {
        spriteFrameName: 'enemy1',
        crashAnimateName: 'PlaneCrash',
        hitAnimateName: '',
        crashSound: GAME_MUSIC.CRASH_1,
        score: 1,
        width: 25,
        height: 20,
        speed: 120,
        crashHit: 2,
        randomSpeedDiff: 50
      }, _Enemy_Config[Enemy_Type.helicopter] = {
        spriteFrameName: 'enemy2',
        crashAnimateName: 'HelicopterCrash',
        hitAnimateName: 'HelicopterHit',
        crashSound: GAME_MUSIC.CRASH_2,
        width: 35,
        score: 8,
        height: 45,
        speed: 80,
        crashHit: 4,
        randomSpeedDiff: 20
      }, _Enemy_Config[Enemy_Type.UFO] = {
        spriteFrameName: 'enemy3_n1',
        crashAnimateName: 'UFOCrash',
        hitAnimateName: 'UFOHit',
        crashSound: GAME_MUSIC.CRASH_3,
        score: 20,
        width: 80,
        height: 120,
        speed: 50,
        crashHit: 8,
        randomSpeedDiff: 0
      }, _Enemy_Config));
      var EnemyController = exports('EnemyController', (_dec = ccclass('EnemyController'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EnemyController, _Component);

        function EnemyController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_sprite", void 0);

          _defineProperty(_assertThisInitialized(_this), "_uiTransform", void 0);

          _defineProperty(_assertThisInitialized(_this), "_type", null);

          _defineProperty(_assertThisInitialized(_this), "_pos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_iniPos", 0);

          _defineProperty(_assertThisInitialized(_this), "_parentW", 0);

          _defineProperty(_assertThisInitialized(_this), "_parentH", 0);

          _defineProperty(_assertThisInitialized(_this), "_speed", 0);

          _defineProperty(_assertThisInitialized(_this), "_config", null);

          _defineProperty(_assertThisInitialized(_this), "_animation", null);

          _defineProperty(_assertThisInitialized(_this), "_boxCollider", null);

          _defineProperty(_assertThisInitialized(_this), "_curHit", 0);

          _defineProperty(_assertThisInitialized(_this), "_gm", void 0);

          _defineProperty(_assertThisInitialized(_this), "isCrash", false);

          return _this;
        }

        var _proto = EnemyController.prototype;

        _proto.start = function start() {
          var _director$getScene$ge;

          this._gm = (_director$getScene$ge = director.getScene().getChildByName('GameManagement')) === null || _director$getScene$ge === void 0 ? void 0 : _director$getScene$ge.getComponent(GameManagement);
          this._sprite = this.node.getComponent(Sprite);
          this._uiTransform = this.node.getComponent(UITransform);
          this._animation = this.node.getComponent(Animation);
          this._boxCollider = this.node.getComponent(BoxCollider2D);
          this.node.getPosition(this._pos);
          var uiTransform = this.node.parent.getComponent(UITransform);
          var _uiTransform$contentS = uiTransform.contentSize,
              width = _uiTransform$contentS.width,
              height = _uiTransform$contentS.height;
          this._parentH = height;
          this._parentW = width;
          this.setEnemy();
        };

        _proto.setConfig = function setConfig(opt) {
          var pos = opt.pos,
              type = opt.type,
              speed = opt.speed;
          this._type = type;
          this._iniPos = pos;
          this._speed = speed || 0;
        };

        _proto.onHit = function onHit() {
          var _this$_animation$getS;

          if (this.isCrash) return;
          this._curHit += 1;

          if (this._config.hitAnimateName && !((_this$_animation$getS = this._animation.getState(this._config.hitAnimateName)) === null || _this$_animation$getS === void 0 ? void 0 : _this$_animation$getS.isPlaying)) {
            this._animation.play(this._config.hitAnimateName);
          }

          if (this._animation && this._curHit >= this._config.crashHit) {
            this.onCrash();
          }
        };

        _proto.onCrash = function onCrash() {
          var _this$_gm, _this$_gm$getComponen;

          if (this.isCrash) return;
          this.isCrash = true;
          this.node.emit(Enemy_Event.crash, this._config.score, this._type);

          this._animation.play(this._config.crashAnimateName);

          this._animation.once(Animation.EventType.FINISHED, this.onCrashAniFinish, this);

          (_this$_gm = this._gm) === null || _this$_gm === void 0 ? void 0 : (_this$_gm$getComponen = _this$_gm.getComponent(AudioManagement)) === null || _this$_gm$getComponen === void 0 ? void 0 : _this$_gm$getComponen.playSound(this._config.crashSound);
        };

        _proto.onCrashAniFinish = function onCrashAniFinish() {
          this.node.destroy();
        };

        _proto.setEnemy = function setEnemy() {
          var config = Enemy_Config[this._type];
          this._config = _extends({}, config, {
            speed: this._speed || config.speed
          });
          if (this._uiTransform) this._uiTransform.setContentSize(new Size(this._config.width, this._config.height));
          if (this._boxCollider) this._boxCollider.size = new Size(this._config.width, this._config.height);
          if (this._sprite) this._sprite.spriteFrame = this._sprite.spriteAtlas.spriteFrames[this._config.spriteFrameName];
          this._pos.y = this._parentH / 2 + this._config.height / 2;
          this._pos.x = this._iniPos;
          this.node.setPosition(this._pos);
        };

        _proto.update = function update(deltaTime) {
          if (this.isCrash) return;
          var deltaY = deltaTime * this._config.speed;
          this._pos.y -= deltaY;
          this.node.setPosition(this._pos);
          this.checkDestory();
        };

        _proto.checkDestory = function checkDestory() {
          var left = -this._parentW / 2;
          var right = -left;
          var down = -(this._parentH / 2 + this._config.height / 2);

          if (this._pos.x < left || this._pos.x > right || this._pos.y < down) {
            this.node.parent.removeChild(this.node);
            this.node.destroy();
          }
        };

        return EnemyController;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManagement.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, AudioSource, assetManager, AudioClip, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSource = module.AudioSource;
      assetManager = module.assetManager;
      AudioClip = module.AudioClip;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "13457UD/stKSZmF4k7E27oX", "AudioManagement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
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

      var AudioManagement = exports('AudioManagement', (_dec = ccclass('AudioManagement'), _dec2 = property({
        type: AudioSource
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManagement, _Component);

        function AudioManagement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "_sourceMap", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_bundle", null);

          _defineProperty(_assertThisInitialized(_this), "_audioMap", {});

          return _this;
        }

        var _proto = AudioManagement.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          this._sourceMap['bg_sound'] = this.node.addComponent(AudioSource);
          assetManager.loadBundle('Audio', function (err, bundle) {
            _this2._bundle = bundle;
            console.log(_this2._bundle);

            _this2._bundle.loadDir('/', AudioClip, function (err, audioList) {
              audioList.forEach(function (audio) {
                _this2._audioMap[audio.name] = audio;
              });
            });
          });
        };

        _proto.playSound = function playSound(clipName) {
          if (!this._audioMap[clipName] || !this._sourceMap['bg_sound']) return;

          this._sourceMap['bg_sound'].playOneShot(this._audioMap[clipName], 1);
        };

        _proto.playMusic = function playMusic(souceName, clipName, loop) {
          if (loop === void 0) {
            loop = true;
          }

          if (!this._audioMap[clipName]) return;

          if (!this._sourceMap[souceName]) {
            this._sourceMap[souceName] = this.node.addComponent(AudioSource);
          }

          this._sourceMap[souceName].loop = loop;
          this._sourceMap[souceName].playOnAwake = false;
          this._sourceMap[souceName].clip = this._audioMap[clipName];

          this._sourceMap[souceName].play();

          return this._sourceMap[souceName];
        };

        _proto.destroyMusic = function destroyMusic(souceName) {
          this._sourceMap[souceName].stop();

          var audioSource = this._sourceMap[souceName];
          this._sourceMap[souceName] = undefined;
          audioSource.destroy();
        };

        _proto.pauseAllMusic = function pauseAllMusic() {
          var _this3 = this;

          Object.keys(this._sourceMap).forEach(function (key) {
            if (_this3._sourceMap[key]) {
              _this3._sourceMap[key].pause();
            }
          });
        };

        _proto.stopAllMusic = function stopAllMusic() {
          var _this4 = this;

          Object.keys(this._sourceMap).forEach(function (key) {
            if (_this4._sourceMap[key]) {
              _this4._sourceMap[key].stop();
            }
          });
        };

        _proto.resumeAllMusic = function resumeAllMusic() {
          var _this5 = this;

          Object.keys(this._sourceMap).forEach(function (key) {
            if (_this5._sourceMap[key]) {
              _this5._sourceMap[key].play();
            }
          });
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return AudioManagement;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_sourceMap", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return {};
        }
      }), _class2)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EndManagement.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './GameManagement.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Label, director, Component, _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, GameManagement;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      GameManagement = module.GameManagement;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "15b4e03G1BHMb98hmPh9r7d", "EndManagement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = EndManagement
       * DateTime = Fri May 13 2022 17:31:16 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = EndManagement.ts
       * FileBasenameNoExtension = EndManagement
       * URL = db://assets/Scripts/EndManagement.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var EndManagement = exports('EndManagement', (_dec = ccclass('EndManagement'), _dec2 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EndManagement, _Component);

        function EndManagement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_gm", void 0);

          _initializerDefineProperty(_assertThisInitialized(_this), "Score", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = EndManagement.prototype;

        _proto.start = function start() {
          var _director$getScene$ge;

          this._gm = (_director$getScene$ge = director.getScene().getChildByName('GameManagement')) === null || _director$getScene$ge === void 0 ? void 0 : _director$getScene$ge.getComponent(GameManagement);

          if (this.Score && this._gm) {
            this.Score.getComponent(Label).string = "\u603B\u5206\uFF1A" + this._gm.score;
          }
        };

        _proto.backToMenu = function backToMenu() {
          var _this$_gm;

          (_this$_gm = this._gm) === null || _this$_gm === void 0 ? void 0 : _this$_gm.toMenu();
        };

        _proto.restartGame = function restartGame() {
          var _this$_gm2;

          (_this$_gm2 = this._gm) === null || _this$_gm2 === void 0 ? void 0 : _this$_gm2.startGame();
        };

        return EndManagement;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "Score", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayManagement.ts", ['cc', './contant.ts', './_rollupPluginModLoBabelHelpers.js', './AudioManagement.ts', './GameManagement.ts', './EnemyController.ts', './BonusController.ts', './PlayerController.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, Prefab, Label, director, UITransform, instantiate, Component, PLAY_EVENT, GAME_MUSIC, _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, _createClass, AudioManagement, GameManagement, Enemy_Type, Enemy_Config, Enemy_Event, EnemyController, BONUS_TYPE, BonusController, Hero_Event;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Prefab = module.Prefab;
      Label = module.Label;
      director = module.director;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      PLAY_EVENT = module.PLAY_EVENT;
      GAME_MUSIC = module.GAME_MUSIC;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
      _createClass = module.createClass;
    }, function (module) {
      AudioManagement = module.AudioManagement;
    }, function (module) {
      GameManagement = module.GameManagement;
    }, function (module) {
      Enemy_Type = module.Enemy_Type;
      Enemy_Config = module.Enemy_Config;
      Enemy_Event = module.Enemy_Event;
      EnemyController = module.EnemyController;
    }, function (module) {
      BONUS_TYPE = module.BONUS_TYPE;
      BonusController = module.BonusController;
    }, function (module) {
      Hero_Event = module.Hero_Event;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "18256Ok8oJO26aPI1fmyChM", "PlayManagement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Play_Status;

      (function (Play_Status) {
        Play_Status[Play_Status["start"] = 0] = "start";
        Play_Status[Play_Status["pause"] = 1] = "pause";
        Play_Status[Play_Status["resume"] = 2] = "resume";
      })(Play_Status || (Play_Status = {}));

      var PlayManagement = exports('PlayManagement', (_dec = ccclass('PlayManagement'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Prefab
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: Node
      }), _dec10 = property({
        type: Node
      }), _dec11 = property({
        type: Node
      }), _dec12 = property({
        type: Label
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayManagement, _Component);

        function PlayManagement() {
          var _defineProperty2;

          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_status", void 0);

          _defineProperty(_assertThisInitialized(_this), "_playW", 0);

          _defineProperty(_assertThisInitialized(_this), "_playH", 0);

          _defineProperty(_assertThisInitialized(_this), "_scoreLabel", null);

          _defineProperty(_assertThisInitialized(_this), "_gm", void 0);

          _defineProperty(_assertThisInitialized(_this), "_enemyCount", (_defineProperty2 = {}, _defineProperty2[Enemy_Type.plane] = 0, _defineProperty2[Enemy_Type.helicopter] = 0, _defineProperty2[Enemy_Type.UFO] = 0, _defineProperty2));

          _initializerDefineProperty(_assertThisInitialized(_this), "Mask", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "EnemyGroup", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "Enemy", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "BonusGroup", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "Bonus", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "Score", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "Hero", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "Playground", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "PauseBtn", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "BombBtn", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "BombCount", _descriptor11, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = PlayManagement.prototype;

        _proto.start = function start() {
          var _director$getScene$ge, _this$Playground, _this$Playground$getC, _this$BombBtn;

          this._gm = (_director$getScene$ge = director.getScene().getChildByName('GameManagement')) === null || _director$getScene$ge === void 0 ? void 0 : _director$getScene$ge.getComponent(GameManagement);
          this._score = 0;
          this._bombCount = 0;
          this.switchPlayStatus(Play_Status.start);

          if (this.PauseBtn) {
            this.PauseBtn.on(PLAY_EVENT.PAUSE, this.pauseGame, this);
            this.PauseBtn.on(PLAY_EVENT.RESUME, this.resumeGame, this);
          }

          if (this.Hero) {
            this.Hero.on(Hero_Event.crash, this.gameOver, this);
            this.Hero.on(Hero_Event.bonus, this.getBonus, this);
          }

          var playgroundSize = (_this$Playground = this.Playground) === null || _this$Playground === void 0 ? void 0 : (_this$Playground$getC = _this$Playground.getComponent(UITransform)) === null || _this$Playground$getC === void 0 ? void 0 : _this$Playground$getC.contentSize;

          var _ref = playgroundSize || {},
              width = _ref.width,
              height = _ref.height;

          this._playH = height || 0;
          this._playW = width || 0;
          (_this$BombBtn = this.BombBtn) === null || _this$BombBtn === void 0 ? void 0 : _this$BombBtn.on(Node.EventType.TOUCH_END, this.useBomb, this);
        };

        _proto.switchPlayStatus = function switchPlayStatus(status) {
          if (this._status === status) return;
          this._status = status;

          switch (status) {
            case Play_Status.start:
              if (this.Mask) this.Mask.active = false;
              this.updateScoreLabel();
              this.schedule(this.generateBonus, 20);
              this.schedule(this.generateEnemies, 2);
              break;

            case Play_Status.pause:
              if (this.Mask) this.Mask.active = true;
              director.pause();
              break;

            case Play_Status.resume:
              if (this.Mask) this.Mask.active = false;
              director.resume();
              break;
          }
        };

        _proto.updateScoreLabel = function updateScoreLabel() {
          if (!this.Score) return;
          if (!this._scoreLabel) this._scoreLabel = this.Score.getComponent(Label);
          if (!this._scoreLabel) return;
          this._scoreLabel.string = "" + this._score;
        };

        _proto.generateBonus = function generateBonus() {
          if (this.Bonus) {
            var randowmType = [BONUS_TYPE.doubleShoot, BONUS_TYPE.bomb][Math.floor(Math.random() * 2)];
            var bonus = instantiate(this.Bonus);
            var posRange = this._playW - bonus.getComponent(UITransform).contentSize.width;
            var randomPos = Math.floor(Math.random() * posRange) - posRange / 2;
            var controller = bonus.getComponent(BonusController);
            controller.setBonus({
              type: randowmType,
              pos: randomPos
            });
            (this.BonusGroup || this.Playground).addChild(bonus);
          }
        };

        _proto.generateEnemies = function generateEnemies() {
          if (this.Enemy) {
            var randowmType = [Enemy_Type.UFO, Enemy_Type.plane, Enemy_Type.helicopter][Math.floor(Math.random() * 3)];
            var enemyConfig = Enemy_Config[randowmType];
            var posRange = this._playW - enemyConfig.width;
            var randomPos = Math.floor(Math.random() * posRange) - posRange / 2;
            var randomSpeed = Math.floor(Math.random() * enemyConfig.randomSpeedDiff * 2) - enemyConfig.randomSpeedDiff;
            var enemy = instantiate(this.Enemy);
            enemy.on(Enemy_Event.crash, this.onEnemyCrash, this);
            var controller = enemy.getComponent(EnemyController);
            controller.setConfig({
              type: randowmType,
              pos: randomPos,
              speed: randomSpeed + enemyConfig.speed
            });
            (this.EnemyGroup || this.Playground).addChild(enemy);

            if (randowmType === Enemy_Type.UFO && this._enemyCount[randowmType] === 0) {
              var _this$_gm;

              console.log('play big ship flying');
              (_this$_gm = this._gm) === null || _this$_gm === void 0 ? void 0 : _this$_gm.getComponent(AudioManagement).playMusic('UFO_flying', GAME_MUSIC.UFO_FLYING);
            }

            this._enemyCount[randowmType] += 1;
          }
        };

        _proto.onEnemyCrash = function onEnemyCrash(score, type) {
          this._score += score;
          this.updateScoreLabel();
          this._enemyCount[type] = this._enemyCount[type] - 1 < 0 ? 0 : this._enemyCount[type] - 1;

          if (type === Enemy_Type.UFO && this._enemyCount[type] === 0) {
            var _this$_gm2;

            (_this$_gm2 = this._gm) === null || _this$_gm2 === void 0 ? void 0 : _this$_gm2.getComponent(AudioManagement).destroyMusic('UFO_flying');
          }
        };

        _proto.getBonus = function getBonus(type) {
          if (type === BONUS_TYPE.bomb) {
            var _this$_gm3, _this$_gm3$getCompone;

            this._bombCount += 1;
            (_this$_gm3 = this._gm) === null || _this$_gm3 === void 0 ? void 0 : (_this$_gm3$getCompone = _this$_gm3.getComponent(AudioManagement)) === null || _this$_gm3$getCompone === void 0 ? void 0 : _this$_gm3$getCompone.playSound(GAME_MUSIC.GET_BOMB);
          } else {
            var _this$_gm4, _this$_gm4$getCompone;

            (_this$_gm4 = this._gm) === null || _this$_gm4 === void 0 ? void 0 : (_this$_gm4$getCompone = _this$_gm4.getComponent(AudioManagement)) === null || _this$_gm4$getCompone === void 0 ? void 0 : _this$_gm4$getCompone.playSound(GAME_MUSIC.UPGRADE_DOUBLE_SHOT);
          }
        };

        _proto.pauseGame = function pauseGame() {
          var _this$_gm5, _this$_gm5$getCompone;

          (_this$_gm5 = this._gm) === null || _this$_gm5 === void 0 ? void 0 : (_this$_gm5$getCompone = _this$_gm5.getComponent(AudioManagement)) === null || _this$_gm5$getCompone === void 0 ? void 0 : _this$_gm5$getCompone.pauseAllMusic();
          this.switchPlayStatus(Play_Status.pause);
        };

        _proto.resumeGame = function resumeGame() {
          var _this$_gm6, _this$_gm6$getCompone;

          (_this$_gm6 = this._gm) === null || _this$_gm6 === void 0 ? void 0 : (_this$_gm6$getCompone = _this$_gm6.getComponent(AudioManagement)) === null || _this$_gm6$getCompone === void 0 ? void 0 : _this$_gm6$getCompone.resumeAllMusic();
          this.switchPlayStatus(Play_Status.resume);
        };

        _proto.gameOver = function gameOver() {
          var _this$_gm7;

          (_this$_gm7 = this._gm) === null || _this$_gm7 === void 0 ? void 0 : _this$_gm7.gameOver();
        };

        _proto.useBomb = function useBomb() {
          var _this$_gm8, _this$_gm8$getCompone, _this$EnemyGroup;

          if (this._bombCount <= 0) return;
          this._bombCount -= 1;
          (_this$_gm8 = this._gm) === null || _this$_gm8 === void 0 ? void 0 : (_this$_gm8$getCompone = _this$_gm8.getComponent(AudioManagement)) === null || _this$_gm8$getCompone === void 0 ? void 0 : _this$_gm8$getCompone.playSound(GAME_MUSIC.USE_BOMB);
          (_this$EnemyGroup = this.EnemyGroup) === null || _this$EnemyGroup === void 0 ? void 0 : _this$EnemyGroup.children.forEach(function (enemy) {
            var _enemy$getComponent;

            (_enemy$getComponent = enemy.getComponent(EnemyController)) === null || _enemy$getComponent === void 0 ? void 0 : _enemy$getComponent.onCrash();
          });
        };

        _createClass(PlayManagement, [{
          key: "_bombCount",
          get: function get() {
            var _this$BombCount;

            return +((_this$BombCount = this.BombCount) === null || _this$BombCount === void 0 ? void 0 : _this$BombCount.string);
          },
          set: function set(val) {
            if (this.BombCount) this.BombCount.string = "" + val;
          }
        }, {
          key: "_score",
          get: function get() {
            var _this$_gm9;

            return ((_this$_gm9 = this._gm) === null || _this$_gm9 === void 0 ? void 0 : _this$_gm9.score) || 0;
          },
          set: function set(val) {
            if (this._gm) this._gm.score = val;
          }
        }]);

        return PlayManagement;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Mask", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "EnemyGroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Enemy", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "BonusGroup", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "Bonus", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "Score", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "Hero", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "Playground", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "PauseBtn", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "BombBtn", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "BombCount", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PauseBtn.ts", ['cc', './contant.ts', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Button, Sprite, Component, PLAY_EVENT, _inheritsLoose, _defineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      PLAY_EVENT = module.PLAY_EVENT;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "2077ay1v7FKbYW9O1ANmjFg", "PauseBtn", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = PauseBtn
       * DateTime = Tue May 10 2022 15:52:51 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = PauseBtn.ts
       * FileBasenameNoExtension = PauseBtn
       * URL = db://assets/Scripts/PauseBtn.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var Btn_Status;

      (function (Btn_Status) {
        Btn_Status[Btn_Status["playing"] = 0] = "playing";
        Btn_Status[Btn_Status["pause"] = 1] = "pause";
      })(Btn_Status || (Btn_Status = {}));

      var PauseBtn = exports('PauseBtn', (_dec = ccclass('PauseBtn'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PauseBtn, _Component);

        function PauseBtn() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_status", Btn_Status.playing);

          _defineProperty(_assertThisInitialized(_this), "_btn", void 0);

          _defineProperty(_assertThisInitialized(_this), "_spriteAtlas", void 0);

          return _this;
        }

        var _proto = PauseBtn.prototype;

        _proto.start = function start() {
          var _this$getComponent;

          this._btn = this.getComponent(Button);
          this._spriteAtlas = (_this$getComponent = this.getComponent(Sprite)) === null || _this$getComponent === void 0 ? void 0 : _this$getComponent.spriteAtlas;
          this.switchSpriteFrame();
        };

        _proto.switchSpriteFrame = function switchSpriteFrame() {
          var resMap = {};
          resMap[Btn_Status.playing] = {
            normal: 'game_pause_nor',
            pressed: 'game_pause_pressed'
          };
          resMap[Btn_Status.pause] = {
            normal: 'game_resume_nor',
            pressed: 'game_resume_pressed'
          };

          if (this._btn && this._spriteAtlas) {
            var sFrameMap = resMap[this._status];
            this._btn.normalSprite = this._spriteAtlas.spriteFrames[sFrameMap.normal];
            this._btn.hoverSprite = this._spriteAtlas.spriteFrames[sFrameMap.pressed];
            this._btn.pressedSprite = this._spriteAtlas.spriteFrames[sFrameMap.pressed];
          }
        };

        _proto.onClick = function onClick() {
          if (this._status === Btn_Status.playing) {
            this._status = Btn_Status.pause;
            this.switchSpriteFrame();
            this.node.emit(PLAY_EVENT.PAUSE);
          } else {
            this._status = Btn_Status.playing;
            this.switchSpriteFrame();
            this.node.emit(PLAY_EVENT.RESUME);
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return PauseBtn;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BonusController.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Sprite, BoxCollider2D, UITransform, Vec3, Component, _inheritsLoose, _defineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      BoxCollider2D = module.BoxCollider2D;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      exports('BONUS_TYPE', void 0);

      var _SPRITE_MAP, _dec, _class, _temp;

      cclegacy._RF.push({}, "49f9dXYRvlIhbZT0vHGVwIB", "BonusController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = BonusController
       * DateTime = Fri May 13 2022 18:22:51 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = BonusController.ts
       * FileBasenameNoExtension = BonusController
       * URL = db://assets/Scripts/BonusController.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var BONUS_TYPE;

      (function (BONUS_TYPE) {
        BONUS_TYPE[BONUS_TYPE["bomb"] = 0] = "bomb";
        BONUS_TYPE[BONUS_TYPE["doubleShoot"] = 1] = "doubleShoot";
      })(BONUS_TYPE || (BONUS_TYPE = exports('BONUS_TYPE', {})));

      var SPRITE_MAP = (_SPRITE_MAP = {}, _SPRITE_MAP[BONUS_TYPE.bomb] = 'ufo2', _SPRITE_MAP[BONUS_TYPE.doubleShoot] = 'ufo1', _SPRITE_MAP);
      var BonusController = exports('BonusController', (_dec = ccclass('BonusController'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BonusController, _Component);

        function BonusController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "type", void 0);

          _defineProperty(_assertThisInitialized(_this), "_sprite", void 0);

          _defineProperty(_assertThisInitialized(_this), "_pos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_iniPos", 0);

          _defineProperty(_assertThisInitialized(_this), "_speed", 60);

          _defineProperty(_assertThisInitialized(_this), "_boxCollider", null);

          _defineProperty(_assertThisInitialized(_this), "size", null);

          _defineProperty(_assertThisInitialized(_this), "_parentW", 0);

          _defineProperty(_assertThisInitialized(_this), "_parentH", 0);

          return _this;
        }

        var _proto = BonusController.prototype;

        _proto.setBonus = function setBonus(opt) {
          var pos = opt.pos,
              type = opt.type;
          this.type = type;
          this._iniPos = pos;
        };

        _proto.start = function start() {
          this._sprite = this.node.getComponent(Sprite);
          this._boxCollider = this.node.getComponent(BoxCollider2D);
          this.node.getPosition(this._pos);
          this.size = this.node.getComponent(UITransform).contentSize;
          var uiTransform = this.node.parent.getComponent(UITransform);
          var _uiTransform$contentS = uiTransform.contentSize,
              width = _uiTransform$contentS.width,
              height = _uiTransform$contentS.height;
          this._parentH = height;
          this._parentW = width;
          if (this._sprite) this._sprite.spriteFrame = this._sprite.spriteAtlas.spriteFrames[SPRITE_MAP[this.type]];
          this._pos.y = this._parentH / 2 + this.size.height / 2;
          this._pos.x = this._iniPos;
          this.node.setPosition(this._pos);
        };

        _proto.update = function update(deltaTime) {
          var deltaY = deltaTime * this._speed;
          this._pos.y -= deltaY;
          this.node.setPosition(this._pos);
          this.checkDestory();
        };

        _proto.checkDestory = function checkDestory() {
          var left = -this._parentW / 2;
          var right = -left;
          var down = -(this._parentH / 2 + this.size.height / 2);

          if (this._pos.x < left || this._pos.x > right || this._pos.y < down) {
            this.node.parent.removeChild(this.node);
            this.node.destroy();
          }
        };

        return BonusController;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Bullet.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './EnemyController.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, UITransform, Collider2D, Contact2DType, Vec3, Component, _inheritsLoose, _defineProperty, _assertThisInitialized, EnemyController;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      EnemyController = module.EnemyController;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "5a68aRS6vxEYaK4jROMg9Sr", "Bullet", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = Bullet
       * DateTime = Tue May 10 2022 19:59:25 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = Bullet.ts
       * FileBasenameNoExtension = Bullet
       * URL = db://assets/Scripts/Bullet.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var Bullet = exports('Bullet', (_dec = ccclass('Bullet'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Bullet, _Component);

        function Bullet() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_pos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_speed", 600);

          _defineProperty(_assertThisInitialized(_this), "_parentW", 0);

          _defineProperty(_assertThisInitialized(_this), "_parentH", 0);

          _defineProperty(_assertThisInitialized(_this), "_boxCollider", null);

          return _this;
        }

        var _proto = Bullet.prototype;

        _proto.start = function start() {
          this.node.getPosition(this._pos);
          var uiTransform = this.node.parent.getComponent(UITransform);
          var _uiTransform$contentS = uiTransform.contentSize,
              width = _uiTransform$contentS.width,
              height = _uiTransform$contentS.height;
          this._parentH = height;
          this._parentW = width;
          this._boxCollider = this.node.getComponent(Collider2D);

          this._boxCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider, contact) {
          if (otherCollider.node.name === 'Enemy') {
            var enemyController = otherCollider.getComponent(EnemyController);

            if (!enemyController.isCrash) {
              this.node.destroy();
              enemyController.onHit();
            }
          }
        };

        _proto.update = function update(deltaTime) {
          var deltaY = deltaTime * this._speed;
          this._pos.y += deltaY;
          this.node.setPosition(this._pos);
          this.checkDestory();
        };

        _proto.checkDestory = function checkDestory() {
          if (this._pos.x < -this._parentW / 2 || this._pos.x > this._parentW / 2 || this._pos.y < -this._parentH / 2 || this._pos.y > this._parentH / 2) {
            this.node.destroy();
          }
        };

        return Bullet;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManagement.ts", ['cc', './contant.ts', './_rollupPluginModLoBabelHelpers.js', './AudioManagement.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, game, director, Component, GAME_MUSIC, _inheritsLoose, _defineProperty, _assertThisInitialized, AudioManagement;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      game = module.game;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      GAME_MUSIC = module.GAME_MUSIC;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      AudioManagement = module.AudioManagement;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "5cf63os9dRH34yBw7rwNGS2", "GameManagement", undefined);

      var ccclass = _decorator.ccclass;
      /**
       * Predefined variables
       * Name = GameManagement
       * DateTime = Tue May 10 2022 14:40:45 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = GameManagement.ts
       * FileBasenameNoExtension = GameManagement
       * URL = db://assets/Scripts/GameManagement.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var GM_Status;

      (function (GM_Status) {
        GM_Status[GM_Status["start"] = 0] = "start";
        GM_Status[GM_Status["playing"] = 1] = "playing";
        GM_Status[GM_Status["end"] = 2] = "end";
      })(GM_Status || (GM_Status = {}));

      var SCENE_MAP = {
        Game: 'Game',
        Menu: 'Menu',
        End: 'End'
      };
      var GameManagement = exports('GameManagement', (_dec = ccclass('GameManagement'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManagement, _Component);

        function GameManagement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "score", 0);

          return _this;
        }

        var _proto = GameManagement.prototype;

        _proto.start = function start() {
          game.addPersistRootNode(this.node);
        };

        _proto.switchGameStatus = function switchGameStatus(status) {
          var _this$node$getCompone, _this$node$getCompone2, _this$node$getCompone3;

          switch (status) {
            case GM_Status.start:
              this.score = 0;
              director.loadScene(SCENE_MAP.Menu);
              break;

            case GM_Status.playing:
              this.score = 0;
              director.loadScene(SCENE_MAP.Game);
              (_this$node$getCompone = this.node.getComponent(AudioManagement)) === null || _this$node$getCompone === void 0 ? void 0 : _this$node$getCompone.playMusic('bgm', GAME_MUSIC.BG);
              break;

            case GM_Status.end:
              director.loadScene(SCENE_MAP.End);
              (_this$node$getCompone2 = this.node.getComponent(AudioManagement)) === null || _this$node$getCompone2 === void 0 ? void 0 : _this$node$getCompone2.stopAllMusic();
              (_this$node$getCompone3 = this.node.getComponent(AudioManagement)) === null || _this$node$getCompone3 === void 0 ? void 0 : _this$node$getCompone3.playSound(GAME_MUSIC.GAME_OVER);
              break;
          }
        };

        _proto.toMenu = function toMenu() {
          this.switchGameStatus(GM_Status.start);
        };

        _proto.startGame = function startGame() {
          this.switchGameStatus(GM_Status.playing);
        };

        _proto.gameOver = function gameOver() {
          this.switchGameStatus(GM_Status.end);
        };

        return GameManagement;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MenuManagement.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './GameManagement.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, director, Component, _inheritsLoose, _defineProperty, _assertThisInitialized, GameManagement;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      GameManagement = module.GameManagement;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "7c176wxZZhElLqbxcqxSXgQ", "MenuManagement", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = MenuManagement
       * DateTime = Fri May 13 2022 17:48:15 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = MenuManagement.ts
       * FileBasenameNoExtension = MenuManagement
       * URL = db://assets/Scripts/MenuManagement.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var MenuManagement = exports('MenuManagement', (_dec = ccclass('MenuManagement'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MenuManagement, _Component);

        function MenuManagement() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_gm", void 0);

          return _this;
        }

        var _proto = MenuManagement.prototype;

        _proto.start = function start() {
          var _director$getScene$ge;

          this._gm = (_director$getScene$ge = director.getScene().getChildByName('GameManagement')) === null || _director$getScene$ge === void 0 ? void 0 : _director$getScene$ge.getComponent(GameManagement);
        };

        _proto.startGame = function startGame() {
          var _this$_gm;

          (_this$_gm = this._gm) === null || _this$_gm === void 0 ? void 0 : _this$_gm.startGame();
        };

        return MenuManagement;
      }(Component), _temp)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerController.ts", ['cc', './contant.ts', './_rollupPluginModLoBabelHelpers.js', './AudioManagement.ts', './GameManagement.ts', './BonusController.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Prefab, Node, Vec3, director, UITransform, Sprite, Animation, Input, Collider2D, Contact2DType, instantiate, Component, GAME_MUSIC, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, AudioManagement, GameManagement, BonusController, BONUS_TYPE;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      Vec3 = module.Vec3;
      director = module.director;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Animation = module.Animation;
      Input = module.Input;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      GAME_MUSIC = module.GAME_MUSIC;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      AudioManagement = module.AudioManagement;
    }, function (module) {
      GameManagement = module.GameManagement;
    }, function (module) {
      BonusController = module.BonusController;
      BONUS_TYPE = module.BONUS_TYPE;
    }],
    execute: function () {
      exports('Hero_Event', void 0);

      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "93573ek3qdCjooQ+h7CSn/b", "PlayerController", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = PlayerController
       * DateTime = Tue May 10 2022 15:25:03 GMT+0800 (中国标准时间)
       * Author = zengrc
       * FileBasename = PlayerController.ts
       * FileBasenameNoExtension = PlayerController
       * URL = db://assets/Scripts/PlayerController.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      var Bullet_Level;

      (function (Bullet_Level) {
        Bullet_Level[Bullet_Level["normal"] = 0] = "normal";
        Bullet_Level[Bullet_Level["double"] = 1] = "double";
      })(Bullet_Level || (Bullet_Level = {}));

      var Hero_Event;

      (function (Hero_Event) {
        Hero_Event["crash"] = "crashed";
        Hero_Event["bonus"] = "getBonus";
      })(Hero_Event || (Hero_Event = exports('Hero_Event', {})));

      var PlayerController = exports('PlayerController', (_dec = ccclass('PlayerController'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerController, _Component);

        function PlayerController() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "bullet", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "bulletGroup", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_pos", new Vec3());

          _defineProperty(_assertThisInitialized(_this), "_uiTransform", null);

          _defineProperty(_assertThisInitialized(_this), "_bulletlLevel", Bullet_Level.normal);

          _defineProperty(_assertThisInitialized(_this), "_spriteAtlas", null);

          _defineProperty(_assertThisInitialized(_this), "_boxCollider", null);

          _defineProperty(_assertThisInitialized(_this), "_animation", null);

          _defineProperty(_assertThisInitialized(_this), "_isCrash", false);

          _defineProperty(_assertThisInitialized(_this), "_gm", void 0);

          return _this;
        }

        var _proto = PlayerController.prototype;

        _proto.start = function start() {
          var _director$getScene$ge, _this$node$getCompone, _this$_animation;

          this._gm = (_director$getScene$ge = director.getScene().getChildByName('GameManagement')) === null || _director$getScene$ge === void 0 ? void 0 : _director$getScene$ge.getComponent(GameManagement);
          this._pos.x = 0;
          this._pos.y = -300;
          this._pos.z = 0;
          this.node.setPosition(this._pos);
          this._uiTransform = this.node.parent.getComponent(UITransform);
          this._spriteAtlas = (_this$node$getCompone = this.node.getComponent(Sprite)) === null || _this$node$getCompone === void 0 ? void 0 : _this$node$getCompone.spriteAtlas;
          this._animation = this.node.getComponent(Animation);
          (_this$_animation = this._animation) === null || _this$_animation === void 0 ? void 0 : _this$_animation.play('HeroFlying');
          this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this._boxCollider = this.node.getComponent(Collider2D);

          this._boxCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

          this.startFire();
        };

        _proto.onBeginContact = function onBeginContact(selfCollider, otherCollider) {
          var _this2 = this;

          if (this._isCrash) return;

          if (otherCollider.node.name === 'Enemy') {
            this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
            this.cancelFire();
            this._isCrash = true;

            if (this._animation) {
              this._animation.play('HeroCrash');

              this._animation.once(Animation.EventType.FINISHED, function () {
                var _this2$_gm, _this2$_gm$getCompone;

                _this2.node.emit(Hero_Event.crash);

                (_this2$_gm = _this2._gm) === null || _this2$_gm === void 0 ? void 0 : (_this2$_gm$getCompone = _this2$_gm.getComponent(AudioManagement)) === null || _this2$_gm$getCompone === void 0 ? void 0 : _this2$_gm$getCompone.playSound(GAME_MUSIC.CRASH_1);
              });
            }
          } else if (otherCollider.node.name === 'Bonus') {
            var controller = otherCollider.node.getComponent(BonusController);
            if (controller.type === BONUS_TYPE.doubleShoot) this.switchToDoubleShoot();
            this.node.emit(Hero_Event.bonus, controller.type);
            otherCollider.node.destroy();
          }
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (this._isCrash && !this._uiTransform) return;
          var newPos = event.getUILocation();

          var newPosLocal = this._uiTransform.convertToNodeSpaceAR(new Vec3(newPos.x, newPos.y, 0));

          this._pos = newPosLocal;
          this.node.setPosition(this._pos);
        };

        _proto.switchToDoubleShoot = function switchToDoubleShoot() {
          this._bulletlLevel = Bullet_Level["double"];
          this.unschedule(this.switchToNormalShoot);
          this.scheduleOnce(this.switchToNormalShoot, 10);
        };

        _proto.switchToNormalShoot = function switchToNormalShoot() {
          this._bulletlLevel = Bullet_Level.normal;
        };

        _proto.fire = function fire() {
          var _this$_gm, _this$_gm$getComponen;

          if (this._bulletlLevel === Bullet_Level.normal) {
            var bullet = instantiate(this.bullet);
            var sprite = bullet.getComponent(Sprite);
            if (this._spriteAtlas) sprite.spriteFrame = this._spriteAtlas.spriteFrames['bullet1'];
            bullet.setPosition(this._pos.x, this._pos.y + 50, 0);
            (this.bulletGroup || this.node.parent).addChild(bullet);
          } else {
            var bullet1 = instantiate(this.bullet);
            var bullet2 = instantiate(this.bullet);
            var sprite1 = bullet1.getComponent(Sprite);
            var sprite2 = bullet2.getComponent(Sprite);

            if (this._spriteAtlas) {
              sprite1.spriteFrame = this._spriteAtlas.spriteFrames['bullet2'];
              sprite2.spriteFrame = this._spriteAtlas.spriteFrames['bullet2'];
            }

            bullet1.setPosition(this._pos.x - 15, this._pos.y + 50, 0);
            bullet2.setPosition(this._pos.x + 15, this._pos.y + 50, 0);
            (this.bulletGroup || this.node.parent).addChild(bullet1);
            (this.bulletGroup || this.node.parent).addChild(bullet2);
          }

          (_this$_gm = this._gm) === null || _this$_gm === void 0 ? void 0 : (_this$_gm$getComponen = _this$_gm.getComponent(AudioManagement)) === null || _this$_gm$getComponen === void 0 ? void 0 : _this$_gm$getComponen.playSound(GAME_MUSIC.SHOT);
        };

        _proto.startFire = function startFire() {
          this.schedule(this.fire, 0.2);
        };

        _proto.cancelFire = function cancelFire() {
          this.unschedule(this.fire);
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return PlayerController;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bullet", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bulletGroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
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

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./contant.ts', './AudioManagement.ts', './GameManagement.ts', './EnemyController.ts', './EndManagement.ts', './BonusController.ts', './PlayerController.ts', './PlayManagement.ts', './PauseBtn.ts', './Bullet.ts', './MenuManagement.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});