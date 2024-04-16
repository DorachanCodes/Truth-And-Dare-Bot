# Truth And Dare Bot

This is a Telegram bot for playing Truth or Dare with your friends on Telegram. The bot randomly selects two players, one to ask Truth/Dare and the other to answer. It also handles passing turns and providing questions or dares based on player choices.

## Features

- Start a game by sending `/start`.
- Join the game by sending `/join` within 30 seconds of starting.
- Randomly selects players and assigns roles (asker or answerer).
- Handles Truth or Dare questions and answers.
- Allows players to pass their turn.
- Provides questions or dares based on player choices and maturity level.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/DorachanCodes/truth-and-dare-bot.git
    ```

2. Install dependencies:

    ```bash
    cd truth-and-dare-bot
    npm install
    ```

3. Set up your Telegram bot:

    - Create a new bot and get the token from BotFather.
    - Replace `"YOUR_TOKEN"` in `index.js` with your bot token.

4. Run the bot:

    ```bash
    node index.js
    ```

## Usage

- Start the bot by running `node index.js`.
- Open Telegram and start a conversation with your bot.
- Send `/start` to start the game.
- Send `/join` within 30 seconds to join the game.
- Follow the bot's instructions to play Truth or Dare.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

