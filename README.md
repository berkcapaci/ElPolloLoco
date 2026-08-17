# 🌵 El Pollo Loco

A browser-based 2D platform game built with **HTML, CSS and vanilla JavaScript**.

Help Pepe collect coins and bottles, defeat enemies and finally defeat the Endboss!

---

## 🎮 Game

El Pollo Loco is a side-scrolling platform game inspired by the classic browser game style.

The player controls Pepe and has to travel through the level, collect items, defeat chickens and reach the Endboss.

The game includes:

- 🏃 Character movement
- 🦘 Jumping
- 🍾 Bottle throwing
- 🐔 Enemy chickens
- 👹 Endboss with multiple states
- 🪙 Coin collection
- 🍾 Bottle collection
- 🛒 In-game shop
- 🧲 Coin Magnet placeholder
- ❤️ Health system
- ⚔️ Endboss health bar
- 🔊 Sound effects
- 🎵 Background music
- 🔇 Mute system
- ⚙️ Sound settings
- ⏸️ Pause system
- 🏆 Win screen
- 💀 Lose screen
- 📱 Mobile controls
- 🔄 Landscape orientation support
- 🖥️ Fullscreen mode

---

## 🕹️ Controls

### Desktop

| Key | Action |
|---|---|
| `←` | Move left |
| `→` | Move right |
| `SPACE` | Jump |
| `D` | Throw bottle |
| `ESC` | Pause |
| Mouse | Menu interaction |

### Mobile

The game provides touch controls for:

- Move left
- Move right
- Jump
- Throw bottle
- Open shop
- Pause

The game is designed to run in **landscape orientation** on mobile devices.

---

## 🪙 Coins & Bottles

Coins can be collected throughout the level.

Collected coins can be used in the shop to purchase additional bottles.

### Shop

| Item | Price |
|---|---:|
| 1 Bottle | 3 Coins |
| 5 Bottles | 10 Coins |
| Coin Magnet | Coming Soon |

The shop can be opened both from the main menu and during the game.

---

## 👹 Endboss

The Endboss has several different states:

- Walk
- Alert
- Attack
- Hurt
- Dead

The Endboss also has:

- Health system
- Attack animation
- Attack cooldown
- Damage timing
- Hurt animation
- Death animation
- Death sound
- Small chicken spawning

The player must hit the Endboss with bottles until its energy reaches zero.

After the Endboss death animation and death sound are completed, the win sequence starts.

---

## 🔊 Audio System

The project contains a dedicated `SoundManager` responsible for:

- Background music
- Sound effects
- Music volume
- Effects volume
- Mute state
- Saved audio settings

The following sounds are currently implemented:

- Jump
- Bottle throw
- Bottle break
- Chicken death
- Pepe hurt
- Pepe death
- Pepe snore
- Endboss alert
- Endboss attack
- Endboss hurt
- Endboss death
- Win
- Lose

Audio settings are stored using `localStorage`.

---

## 🛒 Shop System

The shop can be accessed from the main menu or while playing.

When the shop is opened during the game:

1. The game is paused.
2. Enemies are frozen.
3. Mobile controls are hidden.
4. The current coin balance is displayed.
5. The player can purchase bottles.
6. Returning to the game resumes the game state.

The shop also prevents the active game from losing its current state while the player is shopping.

---

## ⏸️ Pause System

The game can be paused during gameplay.

When paused:

- The game loop stops.
- Enemy movement stops.
- Game animations stop.
- Mobile controls remain available for menu interaction.
- The player can resume the game or return to the menu.

---

## 🏆 Game States

The game contains several states:

### Start Screen

The main menu provides access to:

- Play
- Shop
- Settings
- Controls
- Impressum

### Playing

The player explores the level, collects items and fights enemies.

### Pause

The game can be temporarily stopped.

### Win

The player wins after defeating the Endboss.

The Endboss death sound finishes before the win sound is played.

### Lose

The player loses when Pepe's energy reaches zero.

---

## 📱 Responsive Design

The game supports desktop and mobile screen sizes.

Mobile-specific features include:

- Touch controls
- Landscape orientation
- Responsive buttons
- Responsive shop layout
- Responsive settings screen
- Responsive controls screen
- Responsive impressum screen
- Responsive win and lose screens

The interface adapts to smaller landscape displays using CSS media queries and `clamp()`.

---

## 🖥️ Fullscreen

The game supports browser fullscreen mode.

Fullscreen mode automatically scales the game to fit the available screen while maintaining the game's aspect ratio.

---

## 🧱 Project Structure

```text
El-Pollo-Loco/
│
├── audio/
│   ├── background_music.mp3
│   ├── boss_alert.mp3
│   ├── boss_attack.mp3
│   ├── boss_death.mp3
│   ├── boss_hurt.mp3
│   ├── bottle_break.mp3
│   ├── bottle_throw.mp3
│   ├── chicken_death.mp3
│   ├── jump.mp3
│   ├── lose.mp3
│   ├── pepe_death.mp3
│   ├── pepe_hurt.mp3
│   ├── pepe_snore.mp3
│   └── win.mp3
│
├── css/
│   ├── style.css
│   ├── media.css
│   └── dialog.css
│
├── img/
│   ├── 2_character_pepe/
│   ├── 3_enemies_chicken/
│   ├── 4_enemie_boss_chicken/
│   ├── 5_background/
│   ├── 6_salsa_bottle/
│   ├── 7_statusbars/
│   └── 8_coin/
│
├── js/
│   ├── game.js
│   ├── keyboard.class.js
│   ├── sound-manager.class.js
│   └── ...
│
├── levels/
│   └── level1.js
│
├── models/
│   ├── background-object.class.js
│   ├── bottle.class.js
│   ├── character.class.js
│   ├── chicken.class.js
│   ├── cloud.class.js
│   ├── coin-counter.class.js
│   ├── coin.class.js
│   ├── drawable-object.class.js
│   ├── endboss-bar.class.js
│   ├── endboss.class.js
│   ├── level.class.js
│   ├── movable-object.class.js
│   ├── status-bar.class.js
│   └── throwable-object.class.js
│
├── index.html
└── README.md
