# Crosswordly Frontend

> Springboard Capstone Project 2 Frontend React Application

## Table of Contents

- [Description](#description)
  - [Technologies](#technologies)
- [Installation](#installation)
- [Components](#components)
  - [Form Components](#form-components)
    - [GameSetupForm](#gamesetupform)
    - [GuessForm](#guessform)
    - [LoginForm](#loginform)
    - [RegisterForm](#registerform)
  - [Game Components](#game-components)
    - [Cell](#cell)
    - [Board](#board)
    - [Game](#game)
    - [GameContext](#gamecontext)
    - [ScoreBoard](#scoreboard)
    - [VictoryView](#victoryview)
    - [Instructions](#instructions)
  - [Word Components](#words)
    - [DefinitionList](#definitionlist)
    - [WordList](#wordlist)
    - [WordHistory](#wordhistory)
  - [User Components](#user-components)
    - [GuestView](#guestview)
    - [UserContext](#usercontext)
    - [UserTable](#usertable)
    - [UserView](#userview)

## Description

Crosswordly is a minigame where crossword puzzles are randomly generated using words created from a fixed set of letters. In other words, using "likeable" as a seed word will generate puzzles that may contain "like", "able" and any other words you can construct using only those letters. This is a great way to learn new words, so word definitions are shown whenever you guess valid words.

Definitions are provided by [FreeDictionaryAPI](https://www.dictionaryapi.dev/), and words are validated based on the 140k words found in [Princeton's WordNet library](https://www.npmjs.com/package/wordnet). Since not all words in WordNet are present in FreeDictionaryAPI, blank definitions will provide links to Google's definition search engine.

[Back To Top](#crosswordly-frontend)

### Technologies

- react 17.0.2
- react-bootstrap 2.2.3
- react-dom 17.0.2
- react-scripts 5.0.0
- axios 0.26.1
- bootstrap 5.1.3
- jose 4.6.1
- uuid 8.3.2
- web-vitals 2.1.4

[Back To Top](#crosswordly-frontend)

### Installation

To start the application, run the following commands in a Linux environment.

Install dependencies:  
```npm install```

Start app:  
```npm start```

Optionally, run tests with:  
```npm test```

[Back To Top](#crosswordly-frontend)

# Components

## App Component

Main App component which renders all following components at the root route. Its hooks are passed down through [UserContext](#usercontext) and [GameContext](#gamecontext) components.

|Hook Name|Type|Description|
|---|---|---|
|setupFormData|Object|contains names and values of [GameSetupForm component](#gamesetupform), and is used in rendering of [Game component](#game)|
|gameStart|boolean|true when game is on, and false when game is over.|
|user|Object|contains user data excluding their password|

[Back To Top](#crosswordly-frontend)

## Form Components

### GameSetupForm

Form on landing page specifying the letters as a "seed" used to generate the crossword, using setter functions taken from GameContext context.

[Back To Top](#crosswordly-frontend)

### GuessForm

Form used in-game for user to guess words. Only allows user to type characters from the letters subset created in GameSetupFrom.

|Prop Name|Type|Description|
|---|---|---|
|letterMap|Object|hook from Game component - tracks which letters and how many are present|
|setLetterMap|Function|hook setter from Game component - sets letterMap hook|
|letters|String|string of letters the user can construct words from|
|guess|string|hook from Game component - guess input from user|
|setGuess|Function|hook setter from Game component - sets guess hook|
|handleGuess|Function|asynchronous form submission handler function from Game component - calls backend API to check whether the word is valid, and to fetch any definitions. Populates [WordHistory Component](#wordhistory) |

[Back To Top](#crosswordly-frontend)

### LoginForm

Form for user login authentication.

|Hook Name|Type|Description|
|---|---|---|
|formData|Object|Mapping of form input names and values|

|Context Prop Name|Type|Description|
|---|---|---|
|setUser|Function|setter for user data in [UserContext](#usercontext)|

[Back To Top](#crosswordly-frontend)

### RegisterForm

Form handling user registration.

|Hook Name|Type|Description|
|---|---|---|
|formData|Object|Mapping of form input names and values|

[Back To Top](#crosswordly-frontend)

## Game Components

### Cell

Board component's child representing indivual table cells.

|Prop Name|Type|Description|
|---|---|---|
|letter|String or undefined|Character to represent. When undefined, Cell is rendered as a blank, transparent tile|
|isActive|boolean|When letter prop is present, Cell will be rendered with a black background, and when active will reveal the letter.|


[Back To Top](#crosswordly-frontend)

### Board

Table representing the crossword puzzle. Parent of [Cell component](#cell).

|Prop Name|Type|Description|
|---|---|---|
|rows|2D Array|Array of Arrays representing the crossword puzzle.|
|activeCells|2D Array|Array of Arrays with boolean values. If a value is true, then the correspondant Cell will be active. If false, then Cell will be inactive. When null, Cell will be invisible / blank.|

[Back To Top](#crosswordly-frontend)

### Game

Wrapper component for all game-related components and logic. Hosts several hooks passed down to child components.

|Prop Name|Type|Description|
|---|---|---|
|word|String|letters used for generating the board|
|maxWords|number|upper limit for words present on crossword puzzle|

|Hook Name|Type|Description|
|---|---|---|
|gameData|Object|contains crossword puzzle and word data from backend|
|rootWord|String|used in generating crossword puzzle. Mostly used as a hook if user opts to play using a completely random word.|
|wordsFound|Object|tracks valid words that have been guessed. Used as key-value mapping to shorten word search.|
|guess|string|prop for [GuessForm](#guessform) component representing user's input when guessing words|
|letterMap|Object|prop for [GuessForm](#guessform) component representing user's input when guessing words|
|activeCells|2D Array|Passed down as a prop to [Board component](#board) Array of Arrays with boolean values. If a value is true, then the correspondant Cell will be active. If false, then Cell will be inactive. When null, Cell will be invisible / blank.|
|wordHistory|Array|contains all guessed words and their definitions - passed down to [WordHistory component](#wordhistory)|
|score|Integer|Current Game instance's score. Passed down as prop to [ScoreBoard component](#scoreboard)|

[Back To Top](#crosswordly-frontend)

### GameContext

Passes setGameStart and setSetupFormData hook setter from [App component](#app) to facilitate the app's single-page status.

[Back To Top](#crosswordly-frontend)

### ScoreBoard

Scoreboard displaying current score in-game. When a user is logged in, also displays their high score. Gets user data using [UserContext](#usercontext).

|Prop Name|Type|Description|
|---|---|---|
|score|Integer|Current game score|

[Back To Top](#crosswordly-frontend)

### VictoryView

Replaces ScoreBoard component when all words on crossword have been found. Displays score, and a little new high score alert whenever a user surpasses their own high score.

|Prop Name|Type|Description|
|---|---|---|
|score|Integer|Current game score|

|Hook Name|Type|Description|
|---|---|---|
|setGameStart|Function|setter for gameStart hook, taken from [GameContext](#gamecontext)|
|user|Object|user data from [UserContext](#usercontext)|
|user|Function|user data setter from [UserContext](#usercontext)|

[Back To Top](#crosswordly-frontend)

## Instructions

Short paragraph for basic game how to play instructions.

[Back To Top](#crosswordly-frontend)

## Word Components

### DefinitionList

Lists all definitions found for a word. If this word was not found by the API, will direct user to a Google link.

|Prop Name|Type|Description|
|---|---|---|
|definitions|Array|Array of objects containing definitions, parts of speech of words in [WordHistory component](#wordhistory)|

[Back To Top](#crosswordly-frontend)

### WordList

Lists all valid words the user has guessed so far.

|Prop Name|Type|Description|
|---|---|---|
|words|Array|contains words from [WordHistory component](#wordhistory)|

[Back To Top](#crosswordly-frontend)

### WordHistory

Generates tabular representation of all guessed words in game, and displays only one definition at a time. Leveraged using react-bootstrap's Tab component. Displays placeholder paragraph when no valid words have been guessed yet. 

|Prop Name|Type|Description|
|---|---|---|
|words|Array|Array of objects containing words, definitions, parts of speech of words gathered from FreeDictionaryAPI external API.|

[Back To Top](#crosswordly-frontend)

## User Components

### GuestView

Displays small nav bar displaying one view at a time to prevent too much clutter. There are for 3 types of users:

- guest: displays [GameSetupForm](#gamesetupform)
- returning user: displays [LoginForm](#loginform)
- new user: displays [RegisterForm](#registerform)

[Back To Top](#crosswordly-frontend)

### UserContext

Provides context for easily passing logged-in user data throughout the application.

[Back To Top](#crosswordly-frontend)

### UserTable

Displays logged in user's high score.

|Prop Name|Type|Description|
|---|---|---|
|highScore|Integer|logged in user's current high score|

[Back To Top](#crosswordly-frontend)

### UserView

Home page view whenever a user is logged in. Displays [GameSetupForm](#gamesetupform), [UserTable](#usertable), and a log out button.

|Hook Name|Type|Description|
|---|---|---|
|user|Object|user data, taken from [UserContext](#usercontext)|
|setUser|Function|user data setter function, taken from [UserContext](#usercontext). Here, it is used to set user to null upon log out|

[Back To Top](#crosswordly-frontend)