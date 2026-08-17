<div align="center">

# El Pollo Loco

**A browser-based 2D jump-and-run game built with vanilla HTML, CSS and JavaScript**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Framework](https://img.shields.io/badge/Framework-None-lightgrey?style=flat-square)

[Live Demo](https://berkcapaci.developerakademie.net/ElPolloLoco/index.html) · [Features](#features) · [Controls](#controls) · [Architecture](#architecture)

</div>

---

## Live Demo

Play the game directly in your browser: **[berkcapaci.developerakademie.net/ElPolloLoco](https://berkcapaci.developerakademie.net/ElPolloLoco/index.html)**

---

## About

**El Pollo Loco** is a 2D side-scrolling platform game built as a JavaScript and Object-Oriented Programming learning project.

Play as **Pepe**, collect coins and bottles, defeat chicken enemies, and take down the **Endboss**.

The project combines player movement, animations, gravity, collision detection, collectibles, throwable bottles, enemy AI, a boss fight, sound management, a shop system, pause functionality, and mobile controls — all implemented without any external JavaScript framework.

**Core focus areas:**

| Area | Description |
|---|---|
| Object-Oriented Programming | Classes, inheritance, and clean separation of responsibilities |
| Game Engine Basics | Canvas rendering, game loop, gravity, collision systems |
| Reusability | Shared base classes for drawable and movable objects |
| UI / UX | Responsive design, DOM interaction, mobile controls |

---

## Table of Contents

1. [Features](#features)
2. [Controls](#controls)
3. [Game Objective](#game-objective)
4. [Game Mechanics](#game-mechanics)
5. [Game States](#game-states)
6. [Architecture](#architecture)
7. [Project Structure](#project-structure)
8. [Technologies](#technologies)
9. [Getting Started](#getting-started)
10. [Credits](#credits)
11. [License](#license)

---

## Features

<table>
<tr>
<td valign="top" width="33%">

**Gameplay**
- Playable Pepe character
- Walking, jumping and gravity
- Idle and long-idle animations
- Hurt and death states
- Character health system
- Collision detection with offsets

</td>
<td valign="top" width="33%">

**Enemies & Combat**
- Regular chicken enemies
- Small chickens spawned by the Endboss
- Chicken jumping attack
- Bottle throwing with cooldown
- Bottle rotation and splash animation

</td>
<td valign="top" width="33%">

**Endboss**
- Walk, alert, attack, hurt and dead states
- Distance-based detection
- Adjustable movement speed
- Dedicated attack collision area
- Health bar and small-chicken spawning

</td>
</tr>
<tr>
<td valign="top" width="33%">

**Collectibles & Economy**
- Coin collection and counter
- Bottle collection and counter
- In-game shop with purchases
- Persistent sound settings via `localStorage`

</td>
<td valign="top" width="33%">

**Audio**
- Background music and sound effects
- Independent music / effects volume
- Global mute toggle

</td>
<td valign="top" width="33%">

**Interface & Platform**
- Start screen and main menu
- Pause system
- Win / lose screens with restart
- Fullscreen mode
- Mobile controls and landscape layout
- Controls, sound settings and impressum screens

</td>
</tr>
</table>

---

## Controls

### Desktop

| Action | Key |
|---|---|
| Move left | `Arrow Left` |
| Move right | `Arrow Right` |
| Jump | `Space` |
| Throw bottle | `D` |
| Open / close shop | `S` |
| Pause / resume | `Esc` |
| Fullscreen | Fullscreen button |
| Mute / unmute | Sound button |

### Mobile

On-screen buttons provide **move left**, **move right**, **jump**, **throw bottle**, **shop**, and **pause**. The game is designed for landscape orientation on mobile devices.

---

## Game Objective

The objective is to reach and defeat the Endboss.

```
Start Menu
    │
    ▼
Gameplay
    │
    ▼
Collect Coins / Bottles
    │
    ▼
Fight Chickens
    │
    ▼
Reach Endboss ──► Alert ──► Attack ──► Throw Bottles ──► Hurt ──► Defeated
    │
    ▼
Death Animation
    │
    ▼
You Win
```

If Pepe's energy reaches zero, a death animation plays and the **You Lost** screen is shown instead.

---

## Game Mechanics

### Pepe (Character)

Controlled by `character.class.js`. Handles movement, jumping, gravity, direction, collision offsets, health, hurt/death states, and a full animation set (idle, walk, jump, hurt, death), along with the coin and bottle inventory.

### Chickens & Small Chickens

Regular chickens roam the level and damage Pepe on contact; they can be defeated by jumping on them or hitting them with a bottle. Small chickens are additional enemies spawned by the Endboss during the fight and can be defeated with bottles as well.

### Endboss

The Endboss runs through five states — `WALK`, `ALERT`, `ATTACK`, `HURT`, `DEAD`. It detects Pepe by distance, moves toward him, blocks his path, and only deals damage when its dedicated attack collision area overlaps Pepe. It has its own health bar, attack cooldown, and can spawn small chickens.

### Collision System

Rectangular collision detection is used throughout, with adjustable offsets (`top`, `bottom`, `left`, `right`) so the visible sprite and the physical hitbox can differ. Separate collision checks exist for:

- Character vs. Chicken
- Character vs. Endboss
- Character vs. Coin
- Character vs. Bottle
- Bottle vs. Chicken
- Bottle vs. Small Chicken
- Bottle vs. Endboss

### Coins & Bottles

Coins and bottles are scattered through the level. Collecting a coin removes it from the level, increases Pepe's coin inventory, and updates the coin counter. Bottles work the same way and can be thrown once available — each throw checks the inventory and cooldown, spawns a `ThrowableObject`, applies gravity and rotation, checks for enemy collisions, and plays a splash animation on impact.

### Shop

Accessible from the main menu or during gameplay. Opening it freezes the game and enemies, hides mobile controls, and displays the current coin balance.

| Item | Price |
|---|---|
| 1 Bottle | 3 Coins |
| 5 Bottles | 10 Coins |
| Coin Magnet | 15 Coins *(Coming Soon)* |

### Sound System

`sound-manager.class.js` centralizes all audio — background music, jump, bottle throw/break, chicken death, Pepe hurt/death/snore, and the full set of Endboss and win/lose sounds. Music volume, effects volume, and global mute are controlled independently and persisted with `localStorage`.

---

## Game States

| State | Description |
|---|---|
| **Main Menu** | Access to Play, Shop, Sound Settings, Controls, and Impressum |
| **Playing** | Normal gameplay |
| **Paused** | Gameplay and enemy behavior stop; player can resume or return to menu |
| **Shop** | Current game is temporarily frozen while the shop is open |
| **Won** | Endboss reaches zero energy, death animation finishes, win sound and screen appear |
| **Lost** | Pepe's energy reaches zero and the death sequence finishes |

---

## Architecture

### Object-Oriented Structure

```
DrawableObject
      │
      ▼
MovableObject
      │
      ├── Character
      ├── Chicken
      ├── SmallChicken
      ├── Endboss
      └── ThrowableObject

DrawableObject
      ├── BackgroundObject
      ├── Cloud
      ├── Coin
      ├── Bottle
      ├── StatusBar
      ├── CoinCounter
      ├── BottleCounter
      └── EndbossBar
```

`World` is the central controller that ties the character, level, enemies, collectibles, camera, HUD, sound, and game loop together.

### Key Classes

| File | Responsibility |
|---|---|
| `drawable-object.class.js` | Base class: image loading, caching, rendering, animation frames |
| `movable-object.class.js` | Base class: movement, gravity, speed, direction, collisions, energy |
| `character.class.js` | Pepe's player-specific behavior |
| `chicken.class.js` / `small-chicken.class.js` | Enemy behavior |
| `endboss.class.js` | Endboss states, attacks, damage, death |
| `throwable-object.class.js` | Bottle projectile behavior |
| `coin.class.js` / `bottle.class.js` | Collectible items |
| `cloud.class.js` / `background-object.class.js` | Level scenery |
| `status-bar.class.js`, `coin-counter.class.js`, `bottle-counter.class.js`, `endboss-bar.class.js` | HUD elements |
| `world.class.js` | Central game controller |
| `level.class.js` | Level configuration (enemies, clouds, coins, bottles, boundaries) |
| `keyboard.class.js` | Keyboard input state |
| `sound-manager.class.js` | Audio management |

### JavaScript Modules

| File | Responsibility |
|---|---|
| `js/game.js` | Game startup, restart, and lifecycle |
| `js/menu.js` | Menu navigation, screens, pause, fullscreen |
| `js/mobile.js` | Mobile controls, touch input, orientation |
| `js/shop.js` | Shop functionality and state interaction |
| `js/sound-settings.js` | Connects the sound settings UI to `SoundManager` |

### CSS Architecture

| File | Responsibility |
|---|---|
| `css/style.css` | General page layout and base styling |
| `css/game.css` | Game container and in-game styling |
| `css/ui.css` | Menus, buttons, pause, and win/lose screens |
| `css/shop.css` | Shop layout, items, and purchase interface |
| `css/media.css` | Responsive and mobile-specific styling |

---

## Project Structure

```
ElPolloLoco/
│
├── index.html
│
├── css/
│   ├── game.css
│   ├── media.css
│   ├── shop.css
│   ├── style.css
│   └── ui.css
│
├── js/
│   ├── game.js
│   ├── menu.js
│   ├── mobile.js
│   ├── shop.js
│   └── sound-settings.js
│
├── levels/
│   └── level1.js
│
├── models/
│   ├── background-object.class.js
│   ├── bottle-counter.class.js
│   ├── bottle.class.js
│   ├── character.class.js
│   ├── chicken.class.js
│   ├── cloud.class.js
│   ├── coin-counter.class.js
│   ├── coin.class.js
│   ├── drawable-object.class.js
│   ├── endboss-bar.class.js
│   ├── endboss.class.js
│   ├── keyboard.class.js
│   ├── level.class.js
│   ├── movable-object.class.js
│   ├── small-chicken.class.js
│   ├── sound-manager.class.js
│   ├── status-bar.class.js
│   ├── throwable-object.class.js
│   └── world.class.js
│
├── assets/     # fonts and misc. UI images
├── audio/      # sound effects and music
└── img/        # sprites, backgrounds and screens
```

---

## Technologies

- HTML5 & the Canvas API
- CSS3 with Media Queries (responsive design)
- JavaScript (ES6 Classes, Inheritance, OOP)
- DOM manipulation & Pointer Events
- Fullscreen API
- HTML5 Audio API
- `localStorage`

No external JavaScript framework is used.

---

## Getting Started

The project should be run through a local development server rather than opened as a plain file.

```bash
# clone the repository
git clone https://github.com/berkcapaci/El-Pollo-Loco.git

# open the project folder in your editor
cd El-Pollo-Loco/ElPolloLoco
```

Then open `index.html` through a local server — for example, the **Live Server** extension in Visual Studio Code.

Canvas resolution: **720 × 480**

---

## Credits

Game project developed by **Berk Capaci**, created as part of a JavaScript and Object-Oriented Programming learning journey. Intended as a learning and portfolio project.

## License

No license file is currently included in this repository. Add a `LICENSE` file (for example MIT) if you want to define reuse terms for this project.
