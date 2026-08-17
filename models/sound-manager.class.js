/**
 * Manages all game sounds, background music, volume settings
 * and the mute state.
 */
class SoundManager {
  /**
   * Stores all game audio objects.
   *
   * @type {Object.<string, HTMLAudioElement>}
   */
  sounds = {
    backgroundMusic: new Audio("audio/background_music.mp3"),
    jump: new Audio("audio/jump.mp3"),
    bottleThrow: new Audio("audio/bottle_throw.mp3"),
    bottleBreak: new Audio("audio/bottle_break.mp3"),
    chickenDeath: new Audio("audio/chicken_death.mp3"),
    pepeHurt: new Audio("audio/pepe_hurt.mp3"),
    pepeDeath: new Audio("audio/pepe_death.mp3"),
    pepeSnore: new Audio("audio/pepe_snore.mp3"),
    bossAlert: new Audio("audio/boss_alert.mp3"),
    bossAttack: new Audio("audio/boss_attack.mp3"),
    bossHurt: new Audio("audio/boss_hurt.mp3"),
    bossDeath: new Audio("audio/boss_death.mp3"),
    win: new Audio("audio/win.mp3"),
    lose: new Audio("audio/lose.mp3"),
  };

  /**
   * Indicates whether all sounds are muted.
   *
   * @type {boolean}
   */
  isMuted = false;

  /**
   * Stores the default volume for each sound effect.
   *
   * @type {Object.<string, number>}
   */
  soundVolumes = {
    jump: 0.6,
    bottleThrow: 1.0,
    bottleBreak: 0.8,
    chickenDeath: 1.0,
    pepeHurt: 1.0,
    pepeDeath: 1.0,
    pepeSnore: 0.7,
    bossAlert: 0.9,
    bossAttack: 1.0,
    bossHurt: 0.9,
    bossDeath: 1.0,
    win: 1.0,
    lose: 1.0,
  };

  /**
   * Current background music volume.
   *
   * @type {number}
   */
  musicVolume = 0.3;

  /**
   * Current sound effects volume.
   *
   * @type {number}
   */
  effectsVolume = 0.9;

  /**
   * Creates a new SoundManager and loads saved audio settings.
   */
  constructor() {
    const savedMusicVolume = localStorage.getItem("musicVolume");
    const savedEffectsVolume = localStorage.getItem("effectsVolume");
    const savedMuteState = localStorage.getItem("isMuted");

    if (savedMusicVolume !== null) {
      this.musicVolume = Number(savedMusicVolume);
    }

    if (savedEffectsVolume !== null) {
      this.effectsVolume = Number(savedEffectsVolume);
    }

    if (savedMuteState !== null) {
      this.isMuted = savedMuteState === "true";
    }

    this.sounds.pepeSnore.loop = true;

    this.setMusicVolume(this.musicVolume);

    if (this.isMuted) {
      Object.values(this.sounds).forEach((sound) => {
        sound.volume = 0;
      });
    }
  }

  /**
   * Plays a sound effect.
   *
   * @param {string} soundName - Name of the sound to play.
   * @returns {HTMLAudioElement|null} The played audio element or null if not found.
   */
  play(soundName) {
    const sound = this.sounds[soundName];
    if (!sound) {
      return;
    }
    sound.currentTime = 0;
    const soundVolume = this.soundVolumes[soundName] ?? 1.0;
    if (this.isMuted) {
      sound.volume = 0;
    } else {
      sound.volume = soundVolume * this.effectsVolume;
    }
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  /**
   * Stops a sound effect and resets its playback position.
   *
   * @param {string} soundName - Name of the sound to stop.
   */
  stop(soundName) {
    const sound = this.sounds[soundName];

    if (!sound) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * Starts or resumes the background music.
   * Stops the music when muted or when the volume is zero.
   */
  playMusic() {
    const music = this.sounds.backgroundMusic;
    if (this.isMuted || this.musicVolume === 0) {
      music.pause();
      music.volume = 0;
      return;
    }
    music.volume = this.musicVolume;
    if (!music.paused) {
      return;
    }
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
    music.ontimeupdate = () => {
      if (music.duration && music.currentTime >= music.duration - 2) {
        music.currentTime = 0;
      }
    };
  }

  /**
   * Toggles the global mute state.
   *
   * @returns {boolean} The current mute state.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    localStorage.setItem("isMuted", this.isMuted);

    if (this.isMuted) {
      Object.values(this.sounds).forEach((sound) => {
        sound.volume = 0;
      });

      this.sounds.backgroundMusic.pause();
    } else {
      this.sounds.backgroundMusic.volume = this.musicVolume;

      Object.keys(this.soundVolumes).forEach((soundName) => {
        const sound = this.sounds[soundName];

        if (sound) {
          sound.volume = this.soundVolumes[soundName] * this.effectsVolume;
        }
      });

      this.playMusic();
    }

    return this.isMuted;
  }

  /**
   * Stops the background music and resets its playback position.
   */
  stopMusic() {
    const music = this.sounds.backgroundMusic;

    music.pause();
    music.currentTime = 0;
    music.ontimeupdate = null;
  }

  /**
   * Sets the background music volume.
   *
   * @param {number} volume - Music volume between 0 and 1.
   */
  setMusicVolume(volume) {
    this.musicVolume = volume;
    const music = this.sounds.backgroundMusic;
    if (this.isMuted || volume === 0) {
      music.volume = 0;
      music.pause();
    } else {
      music.volume = volume;
      if (music.paused) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
    localStorage.setItem("musicVolume", volume);
  }

  /**
   * Sets the sound effects volume.
   *
   * @param {number} volume - Effects volume between 0 and 1.
   */
  setEffectsVolume(volume) {
    this.effectsVolume = volume;

    Object.keys(this.soundVolumes).forEach((soundName) => {
      const sound = this.sounds[soundName];

      if (sound) {
        sound.volume = this.soundVolumes[soundName] * this.effectsVolume;
      }
    });

    localStorage.setItem("effectsVolume", volume);
  }
}
