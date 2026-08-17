El Pollo Loco

A browser-based 2D jump-and-run game developed with HTML, CSS and JavaScript.

Play as Pepe, collect coins and bottles, defeat enemies and finally defeat the Endboss.

Live Demo

Play El Pollo Loco

About

El Pollo Loco is a 2D side-scrolling platform game created as a JavaScript and Object-Oriented Programming learning project.

The game combines player movement, animations, gravity, collision detection, collectibles, throwable bottles, enemy AI, an Endboss fight, sound management, a Shop system, pause functionality and mobile controls.

The project focuses on:

Object-Oriented Programming
Classes and inheritance
Separation of responsibilities
Reusable game logic
Canvas rendering
Collision systems
DOM interaction
Responsive design
Features
Start screen and main menu
Playable Pepe character
Walking, jumping and gravity
Idle and long-idle animations
Pepe snoring
Hurt and death states
Character health system
Collision detection with collision offsets
Chicken enemies
Small Chickens spawned by the Endboss
Chicken jumping attack
Bottle attacks
Coin collection
Bottle collection
Coin counter
Bottle counter
Bottle inventory
Bottle throwing cooldown
Bottle rotation and splash animations
Endboss health system
Endboss health bar
Endboss walking state
Endboss alert state
Endboss attack state
Endboss hurt state
Endboss death state
Endboss movement and speed control
Endboss attack collision
Endboss collision offset
Endboss movement blocking
Endboss Small Chicken spawning
Win and lose states
Win and lose screens
Restart without page reload
Pause system
Shop system
Bottle purchases
Sound effects
Background music
Music and effects volume settings
Global mute
Persistent sound settings with localStorage
Fullscreen mode
Mobile controls
Mobile landscape orientation
Responsive layout
Controls screen
Sound settings screen
Impressum screen
Controls
Desktop
Action	Control
Move left	Arrow Left
Move right	Arrow Right
Jump	Space
Throw bottle	D
Open / close Shop	S
Pause / resume	ESC
Fullscreen	Fullscreen button
Mute / unmute	Sound button
Mobile

Mobile controls provide:

Move left
Move right
Jump
Throw bottle
Shop
Pause

The game is designed for landscape orientation on mobile devices.

Game Objective

The objective is to reach and defeat the Endboss.

The gameplay flow is:

Start Menu
    ↓
Gameplay
    ↓
Collect Coins / Bottles
    ↓
Fight Chickens
    ↓
Reach Endboss
    ↓
Endboss Alert
    ↓
Endboss Attack
    ↓
Throw Bottles
    ↓
Endboss Hurt
    ↓
Endboss Defeated
    ↓
Death Animation
    ↓
You Win

If Pepe loses all energy:

Gameplay
    ↓
Pepe takes damage
    ↓
Energy reaches 0
    ↓
Pepe Death Animation
    ↓
You Lost
Game Mechanics
Pepe

The Character class controls the player.

Pepe has:

Movement
Jumping
Gravity
Direction handling
Collision detection
Collision offsets
Health
Hurt state
Death state
Idle animations
Walking animation
Jump animation
Hurt animation
Death animation
Coin inventory
Bottle inventory

Collision offsets reduce the effective collision area of the sprite so that the complete image rectangle is not automatically treated as the physical body.

Chicken

Regular Chicken enemies move through the level and can damage Pepe.

They can be defeated by:

Jumping on them
Hitting them with a bottle

Chicken collision areas are separated from their visual sprite when necessary.

Small Chicken

Small Chickens are additional enemies spawned by the Endboss during the boss fight.

They can also be defeated using throwable bottles.

Endboss

The Endboss has several states:

WALK
ALERT
ATTACK
HURT
DEAD

The Endboss:

Detects Pepe based on distance
Moves towards Pepe
Has an adjustable movement speed
Stops Pepe from moving through the boss
Attacks only when Pepe is physically close enough
Uses a dedicated attack collision area
Has collision offsets
Can receive bottle damage
Can spawn Small Chickens
Has an attack cooldown
Has a health bar
Has hurt and death animations

The Endboss does not damage Pepe from a large distance. Damage is applied when the attack collision condition is met.

Collision System

The project uses rectangular collision detection.

Collision areas can be adjusted using offsets:

top
bottom
left
right

This allows the visible sprite and the actual gameplay collision area to be separated.

Different collision systems are used where necessary:

Character vs Chicken
Character vs Endboss
Character vs Coin
Character vs Bottle
Bottle vs Chicken
Bottle vs Small Chicken
Bottle vs Endboss

This makes collisions more precise and avoids relying only on the full sprite dimensions.

Coin System

Coins can be collected throughout the level.

When Pepe collects a coin:

The coin is removed from the level.
Pepe's coin inventory increases.
The Coin Counter is updated.

Coins can also be used in the Shop.

Bottle System

Bottles can be collected throughout the level.

Collected bottles are added to Pepe's inventory.

A bottle can only be thrown when Pepe has at least one bottle available.

When throwing a bottle:

The game checks the bottle inventory.
The throw cooldown is checked.
A ThrowableObject is created.
The bottle is spawned in front of Pepe.
The bottle moves through the level.
Gravity affects the bottle.
The bottle rotates.
Enemy collisions are checked.
The bottle breaks when it hits an enemy.
Damage is applied.
The splash animation is displayed.
The bottle is removed.

A short cooldown prevents continuous bottle throwing.

Shop

The Shop can be opened from the main menu or during gameplay.

During active gameplay:

The game is frozen.
Enemies are frozen.
Mobile controls are hidden.
The current coin balance is displayed.
Bottles can be purchased.
The game resumes after closing the Shop.
Shop Items
Item	Price
1 Bottle	3 Coins
5 Bottles	10 Coins
Coin Magnet	15 Coins

The Coin Magnet is currently displayed as a Coming Soon feature.

Sound System

The SoundManager handles the game's audio.

It manages:

Background music
Jump sound
Bottle throw sound
Bottle break sound
Chicken death sound
Pepe hurt sound
Pepe death sound
Pepe snoring sound
Endboss alert sound
Endboss attack sound
Endboss hurt sound
Endboss death sound
Win sound
Lose sound

The player can independently control:

Music volume
Effects volume
Global mute

Sound preferences are stored using localStorage.

Game States
Main Menu

Provides access to:

Play
Shop
Sound Settings
Controls
Impressum
Playing

Normal gameplay.

Paused

Gameplay and enemy behavior are stopped.

The player can continue or return to the menu.

Shop

The current game is temporarily frozen while the Shop is open.

Won

The player wins after:

The Endboss reaches zero energy.
The Endboss death animation finishes.
The game enters the win state.
The win sound is played.
The win screen is displayed.
Lost

The player loses after Pepe's energy reaches zero and the death sequence finishes.

Project Structure
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
├── assets/
├── audio/
└── img/

The asset folders contain the images, sounds and font files used by the game.

JavaScript Architecture

The project is structured using classes and modules.

Base Classes
drawable-object.class.js

Base class for drawable objects.

Handles:

Image loading
Image caching
Rendering
Animation images
movable-object.class.js

Base class for moving objects.

Handles:

Movement
Gravity
Speed
Direction
Collision detection
Collision offsets
Energy
Damage
Hurt and death states
Game Objects
character.class.js

Controls Pepe and his player-specific behavior.

chicken.class.js

Controls regular Chicken enemies.

small-chicken.class.js

Controls Small Chickens spawned by the Endboss.

endboss.class.js

Controls Endboss movement, states, attacks, damage and death.

throwable-object.class.js

Controls bottles thrown by Pepe.

coin.class.js

Represents collectible coins.

bottle.class.js

Represents collectible bottles.

cloud.class.js

Represents clouds in the level.

background-object.class.js

Represents background elements.

HUD
status-bar.class.js

Displays Pepe's health.

coin-counter.class.js

Displays the collected coin amount.

bottle-counter.class.js

Displays the collected bottle amount.

endboss-bar.class.js

Displays the Endboss health.

Game Management
world.class.js

The central game controller.

It connects and manages:

Character
Level
Enemies
Collision systems
Coins
Bottles
Throwable objects
Camera
Rendering
HUD
Game loop
Win and lose states
Pause behavior
Shop freezing
Sound interaction
level.class.js

Stores the level configuration:

Enemies
Clouds
Background objects
Coins
Bottles
Level boundaries
keyboard.class.js

Stores keyboard input states.

sound-manager.class.js

Central audio manager for music and sound effects.

JavaScript Modules
js/game.js

Controls game startup, restart and the main game lifecycle.

js/menu.js

Handles menu navigation, screens, pause, fullscreen and UI navigation.

js/mobile.js

Handles mobile controls, touch interaction and landscape orientation.

js/shop.js

Handles Shop functionality, purchases and Shop/game state interaction.

js/sound-settings.js

Connects the sound settings interface with the SoundManager.

Level Design
levels/level1.js

Contains the complete Level 1 design.

It defines:

Background objects
Clouds
Chickens
Small Chicken spawning support
Coins
Bottles
Endboss
Enemy placement
Collectible placement
Level length

Helper functions are used to keep the level design readable and reusable.

CSS Architecture
css/style.css

General page layout and base styling.

css/game.css

Game container and game-specific styling.

css/ui.css

Menus, buttons, settings, controls, pause and win/lose screens.

css/shop.css

Shop layout, items, prices and purchase interface.

css/media.css

Responsive and mobile-specific styling.

HTML
index.html

The main entry point of the application.

It contains the game's:

Start screen
Canvas
Pause screen
Win screen
Lose screen
Shop
Sound settings
Controls
Impressum
Mobile controls
Orientation screen

The canvas size is:

720 × 480

The HTML also defines the JavaScript loading order.

Object-Oriented Structure

The main inheritance structure is:

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

Other drawable objects include:

DrawableObject
├── BackgroundObject
├── Cloud
├── Coin
├── Bottle
├── StatusBar
├── CoinCounter
├── BottleCounter
└── EndbossBar

The World class coordinates these objects and their interactions.

Technologies

The project uses:

HTML5
CSS3
JavaScript
HTML Canvas API
JavaScript Classes
Object-Oriented Programming
Inheritance
DOM manipulation
Pointer Events
Fullscreen API
HTML5 Audio API
localStorage
CSS Media Queries
Responsive Web Design

No external JavaScript framework is required.

Development

The project should be run using a local development server.

For example, Visual Studio Code with the Live Server extension can be used.

Open:

index.html

through the local server.

Credits

Game project developed by Berk Capaci.

Created as part of a JavaScript and Object-Oriented Programming learning journey.

The project is intended as a learning and portfolio project.
