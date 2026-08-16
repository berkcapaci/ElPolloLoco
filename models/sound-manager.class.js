class SoundManager {
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

  isMuted = false;

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

  musicVolume = 0.3;
  effectsVolume = 0.9;

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

    sound.play();
  }

  stop(soundName) {
    const sound = this.sounds[soundName];

    if (!sound) {
      return;
    }

    sound.pause();
    sound.currentTime = 0;
  }

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
    music.play();
    music.ontimeupdate = () => {
      if (music.duration && music.currentTime >= music.duration - 2) {
        music.currentTime = 0;
      }
    };
  }

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

  stopMusic() {
    const music = this.sounds.backgroundMusic;

    music.pause();
    music.currentTime = 0;
    music.ontimeupdate = null;
  }

  setMusicVolume(volume) {
    this.musicVolume = volume;
    const music = this.sounds.backgroundMusic;
    if (this.isMuted || volume === 0) {
      music.volume = 0;
      music.pause();
    } else {
      music.volume = volume;
      if (music.paused) {
        music.play();
      }
    }
    localStorage.setItem("musicVolume", volume);
  }

  setEffectsVolume(volume) {
    this.effectsVolume = volume;
    localStorage.setItem("effectsVolume", volume);
  }
}
