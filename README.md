# El Pollo Loco

A browser-based 2D jump-and-run game developed with HTML, CSS and JavaScript.

Play as Pepe, collect coins and bottles, defeat enemies and finally take down the Endboss.

## Live Demo

[Play El Pollo Loco](https://berkcapaci.developerakademie.net/ElPolloLoco/index.html)

## About the Game

El Pollo Loco is a 2D side-scrolling platform game created as a JavaScript learning project.

The game includes a complete game loop, character movement, animations, gravity, collisions, collectible items, throwable bottles, enemy behavior, an Endboss fight, sound effects, background music, a shop system, game-over states and mobile controls.

The project was developed with a focus on object-oriented programming and separation of responsibilities between different classes and modules.

## Features

* Start screen and main menu
* Playable character Pepe
* Left and right movement
* Jumping and gravity
* Character animations
* Enemy collision detection
* Chicken enemies
* Small Chicken enemies spawned by the Endboss
* Endboss with multiple states
* Endboss health bar
* Endboss attack behavior
* Endboss alert behavior
* Endboss hurt animation
* Endboss death animation
* Coin collection
* Bottle collection
* Bottle inventory
* Bottle throwing
* Bottle collision and breaking
* Character health system
* Game win condition
* Game lose condition
* Win and lose screens
* Restart game functionality
* Shop system
* Bottle purchases using collected coins
* Coin counter
* Bottle counter
* Sound effects
* Background music
* Music volume settings
* Sound effects volume settings
* Global mute functionality
* Saved sound settings using localStorage
* Pepe snoring sound
* Fullscreen mode
* Mobile controls
* Mobile landscape orientation handling
* Responsive layout
* Mobile shop controls
* Mobile pause controls
* Controls screen
* Settings screen
* Impressum screen

## Controls

### Desktop

| Action          | Key               |
| --------------- | ----------------- |
| Move left       | Arrow Left        |
| Move right      | Arrow Right       |
| Jump            | Space             |
| Throw bottle    | D                 |
| Open/close shop | Shop button       |
| Pause           | Pause button      |
| Fullscreen      | Fullscreen button |
| Mute            | Sound button      |

### Mobile

The game provides touch controls when played on a compatible mobile device in landscape orientation.

Mobile controls include:

* Move left
* Move right
* Jump
* Throw bottle
* Shop
* Pause

## Game Objective

The main objective is to reach the Endboss and defeat it.

During the level, the player can:

1. Move through the level.
2. Defeat Chicken enemies.
3. Collect coins.
4. Collect bottles.
5. Use collected bottles against enemies.
6. Reach the Endboss.
7. Avoid the Endboss attacks.
8. Reduce the Endboss health to zero.
9. Complete the Endboss death animation.
10. Win the game.

If Pepe loses all of his energy, the game ends with the lose screen.

## Game Mechanics

### Character

The `Character` class controls Pepe's movement and state.

It handles:

* Walking
* Jumping
* Gravity
* Direction
* Collision behavior
* Health
* Hurt state
* Death state
* Walking animations
* Jump animations
* Hurt animations
* Death animations
* Coin inventory
* Bottle inventory

### Enemies

The game contains different enemy types.

#### Chicken

Regular Chicken enemies move through the level and can damage Pepe.

They can also be defeated by throwing bottles or by jumping on them.

#### Small Chicken

Small Chickens can be spawned by the Endboss during the fight.

They behave as additional enemies during the boss battle.

#### Endboss

The Endboss has several states:

* Walking
* Alert
* Attack
* Hurt
* Dead

The Endboss can detect Pepe based on distance and change its behavior accordingly.

The boss also has:

* Health
* Attack cooldown
* Attack range
* Movement limits
* Alert animation
* Attack animation
* Hurt animation
* Death animation
* Boss death sound
* Small Chicken spawning

## Bottle System

Bottles can be collected throughout the level.

Collected bottles are added to Pepe's inventory.

The player can throw a bottle when pressing `D` on desktop or using the throw button on mobile.

Each thrown bottle:

1. Is created in front of Pepe.
2. Moves through the level.
3. Checks for enemy collisions.
4. Breaks when it hits an enemy.
5. Can damage the enemy.
6. Is removed after it is marked for deletion.

There is also a short cooldown between bottle throws.

## Coin System

Coins can be collected throughout the level.

The collected coin amount is displayed by the `CoinCounter`.

Coins can also be used in the Shop to purchase bottles.

## Shop

The game includes a Shop accessible from the main menu and during gameplay.

Current shop items include:

### 1 Bottle

Price:

`3 Coins`

### 5 Bottles

Price:

`10 Coins`

### Coin Magnet

Price:

`15 Coins`

The Coin Magnet is currently marked as:

`Coming Soon`

The shop can be opened during gameplay without losing the current game state.

When the shop is opened from an active game:

* The game is frozen.
* Enemies are frozen.
* Mobile controls are hidden.
* The current coin amount is displayed.
* The player can purchase bottles.
* The game resumes after closing the shop.

## Sound System

The game uses a dedicated `SoundManager` class.

The sound system handles:

* Background music
* Jump sound
* Bottle throw sound
* Bottle break sound
* Chicken death sound
* Pepe hurt sound
* Pepe death sound
* Pepe snoring sound
* Endboss alert sound
* Endboss attack sound
* Endboss hurt sound
* Endboss death sound
* Win sound
* Lose sound

### Sound Settings

The player can independently control:

* Music volume
* Effects volume

The settings are stored in `localStorage`, so the selected volume settings remain available after restarting the game.

The game also provides a global mute function.

## Game States

The game contains several important states.

### Playing

The normal gameplay state.

### Paused

Gameplay movement and enemy behavior are stopped while the game is paused.

### Shop

The game is temporarily frozen while the player is using the shop.

### Won

The player wins after the Endboss is defeated and its death animation has finished.

The win sound is played after the Endboss death sound has completed.

### Lost

The player loses after Pepe dies.

The lose screen is displayed after the death sequence.

## Project Structure

```text
ElPolloLoco/
│
├── index.html
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
└── img/
    ├── 2_character_pepe/
    ├── 3_enemies_chicken/
    ├── 4_enemie_boss_chicken/
    ├── 5_background/
    ├── 6_salsa_bottle/
    ├── 7_statusbars/
    ├── 8_coin/
    ├── 9_intro_outro_screens/
    └── You won, you lost/
```

## JavaScript Architecture

The JavaScript code is separated into classes and modules.

### `models/drawable-object.class.js`

Base class for drawable game objects.

Responsible for:

* Loading images
* Image caching
* Drawing objects
* Animation image handling
* Collision frame drawing

### `models/movable-object.class.js`

Base class for movable objects.

Responsible for:

* Movement
* Gravity
* Speed
* Direction
* Collision detection
* Damage handling

### `models/character.class.js`

Represents Pepe.

Responsible for:

* Player movement
* Jumping
* Animations
* Health
* Death
* Coin collection
* Bottle inventory

### `models/chicken.class.js`

Represents regular Chicken enemies.

Responsible for:

* Chicken movement
* Chicken animation
* Collision behavior
* Chicken death
* Bottle collision

### `models/small-chicken.class.js`

Represents Small Chicken enemies spawned during the Endboss fight.

### `models/endboss.class.js`

Controls the Endboss.

Responsible for:

* Boss movement
* Alert state
* Attack state
* Hurt state
* Death state
* Boss health
* Attack cooldown
* Small Chicken spawning
* Boss sounds

### `models/cloud.class.js`

Represents clouds in the level.

### `models/background-object.class.js`

Represents background elements used to build the level environment.

### `models/bottle.class.js`

Represents collectible bottles placed in the level.

### `models/throwable-object.class.js`

Represents bottles thrown by Pepe.

Responsible for:

* Bottle movement
* Rotation animation
* Collision behavior
* Bottle breaking

### `models/coin.class.js`

Represents collectible coins.

Responsible for coin animation and positioning.

### `models/status-bar.class.js`

Displays Pepe's health.

### `models/coin-counter.class.js`

Displays the current amount of collected coins.

### `models/bottle-counter.class.js`

Displays the current amount of collected bottles.

### `models/endboss-bar.class.js`

Displays the Endboss health bar.

### `models/keyboard.class.js`

Stores the current keyboard input state.

### `models/level.class.js`

Defines the structure of a game level.

The level contains:

* Enemies
* Clouds
* Background objects
* Coins
* Bottles
* Level boundaries

### `models/world.class.js`

The central game controller.

The `World` class connects the different game systems.

It handles:

* Character
* Level
* Enemies
* Collisions
* Coins
* Bottles
* Throwing bottles
* Camera
* Rendering
* HUD
* Game loop
* Win state
* Lose state
* Game pause
* Game resume
* Shop freezing
* Sound interaction

### `models/sound-manager.class.js`

Central audio manager.

Responsible for:

* Playing sounds
* Stopping sounds
* Background music
* Music volume
* Effects volume
* Muting
* Saving sound settings

### `levels/level1.js`

Contains the actual Level 1 design.

It defines:

* Background objects
* Clouds
* Enemies
* Coins
* Bottles
* Endboss
* Enemy placement
* Collectible placement
* Level length

## JavaScript Files

### `js/game.js`

Contains the main game startup and game lifecycle functions.

It connects the HTML interface with the game world.

### `js/menu.js`

Controls menu-related functionality such as:

* Start screen
* Win screen
* Lose screen
* Settings
* Controls
* Impressum
* Pause
* Fullscreen
* Menu navigation

### `js/mobile.js`

Controls the mobile interface.

It handles:

* Mobile movement buttons
* Jump button
* Throw button
* Shop button
* Pause button
* Pointer events
* Touch interaction
* Mobile orientation
* Landscape mode

### `js/shop.js`

Controls the Shop system.

It handles:

* Opening the shop
* Closing the shop
* Freezing the game
* Resuming the game
* Displaying the coin balance
* Buying bottles
* Updating counters

### `js/sound-settings.js`

Controls the sound settings interface.

It connects the volume sliders with the `SoundManager`.

## CSS Architecture

### `css/style.css`

Contains the main page and general layout styling.

### `css/game.css`

Contains the main game container and game-related styling.

### `css/ui.css`

Contains the interface styling for menu and game UI elements.

### `css/shop.css`

Contains the Shop layout and Shop item styling.

### `css/media.css`

Contains responsive styles for different screen sizes and mobile landscape mode.

The responsive layout adapts:

* Game container
* Buttons
* Menu screens
* Shop
* Mobile controls
* Settings
* Controls screen
* Impressum
* Screen spacing

## HTML

### `index.html`

The main entry point of the application.

It contains:

* Start screen
* Game canvas
* Win screen
* Lose screen
* Settings screen
* Controls screen
* Impressum screen
* Shop screen
* Mobile controls
* Menu buttons
* Audio controls
* Script loading order

## Audio Files

The `audio/` directory contains all sound effects and background music used by the game.

```text
background_music.mp3
boss_alert.mp3
boss_attack.mp3
boss_death.mp3
boss_hurt.mp3
bottle_break.mp3
bottle_throw.mp3
chicken_death.mp3
jump.mp3
lose.mp3
pepe_death.mp3
pepe_hurt.mp3
pepe_snore.mp3
win.mp3
```

## Technologies

The project was built using:

* HTML5
* CSS3
* JavaScript
* HTML Canvas API
* Object-Oriented Programming
* DOM manipulation
* Pointer Events
* localStorage
* HTML5 Audio API
* Responsive CSS
* CSS Media Queries

No external JavaScript framework is required.

## Object-Oriented Programming

The project uses classes and inheritance to structure the game.

A simplified class hierarchy looks like this:

```text
DrawableObject
│
└── MovableObject
    │
    ├── Character
    ├── Chicken
    ├── SmallChicken
    ├── Endboss
    └── ThrowableObject
```

Other classes such as `Coin`, `Bottle`, `Cloud`, `StatusBar`, `CoinCounter`, `BottleCounter` and `EndbossBar` extend or use the base game object functionality where appropriate.

The `World` class coordinates these objects and manages their interaction.

## Responsive Design

The game supports desktop and mobile landscape layouts.

On mobile devices, the game provides an on-screen control system instead of requiring a physical keyboard.

The layout adapts to different screen sizes using CSS media queries.

The mobile interface includes:

* Left button
* Right button
* Jump button
* Throw button
* Shop button
* Pause button

The game also detects portrait orientation and can display an orientation screen asking the player to rotate the device.

## Local Storage

The project uses `localStorage` for audio preferences.

The following settings are stored:

* Music volume
* Effects volume
* Mute state

This allows the player's sound preferences to persist between sessions.

## Development

To run the project locally, clone the repository and open `index.html` using a local development server.

A local server is recommended because the game loads many assets such as images, audio files and fonts.

For example, the project can be run with Visual Studio Code and the Live Server extension.

## Important Asset Paths

The game uses relative paths for images, audio and fonts.

The project structure should remain unchanged when deploying the game.

For example:

```text
img/
audio/
css/
js/
models/
levels/
```

must remain available relative to `index.html`.

## Deployment

The game can be deployed to a standard web server that supports static HTML, CSS, JavaScript, image, audio and font files.

When uploading the project to an FTP server, make sure that:

* All image files are uploaded.
* All audio files are uploaded.
* All font files are uploaded.
* Folder names remain unchanged.
* File names remain unchanged.
* Relative paths are preserved.
* Uppercase and lowercase characters in filenames are preserved.

This is especially important because web servers can treat filenames as case-sensitive.

## Credits

Game project developed by Berk Capaci.

The project was created as part of a JavaScript and object-oriented programming learning journey.

## License

This project is intended as a learning and portfolio project.
