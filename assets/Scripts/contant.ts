export enum GAME_EVENT {
    BACK_MENU = 'BACK_MENU',
    START_GAME = 'START_GAME',
    GAME_OVER = 'GAME_OVER',
  }
  
  export enum PLAY_EVENT {
    INIT = 'INIT',
    PAUSE = 'PAUSE',
    RESUME = 'RESUME'
  }

  export enum RESOURCE_LOAD_EVENT {
    PRELOAD = 'preload'
  }

  export enum GAME_MUSIC {
    BG = 'game_music',
    SHOT = 'bullet',
    CRASH_1 = 'enemy1_down',
    CRASH_2 = 'enemy2_down',
    CRASH_3 = 'enemy3_down',
    UFO_FLYING = 'big_spaceship_flying',
    GET_BOMB = 'get_bomb',
    UPGRADE_DOUBLE_SHOT = 'get_double_laser',
    USE_BOMB = 'use_bomb',
    GAME_OVER = 'game_over',
  }