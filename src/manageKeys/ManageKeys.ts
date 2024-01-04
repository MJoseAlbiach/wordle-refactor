
import { IManageKeys } from "./IManageKeys";
import { Game } from "../Game.js";
import { solutionWord } from "../manageWords/solutionWord.js";

export class ManageKeys implements IManageKeys {
    #word: string;
    #game: Game;

    constructor() {
        this.#word = ""; 
        this.#game = new Game("");
    }

    get word(): string {
        return this.#word;
    }
    set word(newWord: string) {
        this.#word = newWord;
    }
    get game(): Game {
        return this.#game;
    }
    set game(newGame: Game) {
        this.#game = newGame;
    }
    
    setupClickListeners(game: Game): void {
        const keys = document.getElementsByClassName("key");
        Array.from(keys).forEach(element => {
            element.addEventListener("click", (e) => {
                this.handleKeyClick(game, e);
            });
        });
    }

    setupKeyDownListener(game: Game): void {
        document.addEventListener("keydown", (e) => {
            this.handleKeyDown(game, e);
        });
    }

    setupGameWithListeners(word: string): void {
        const gameInstance = new Game(word);
        this.setupClickListeners(gameInstance);
        this.setupKeyDownListener(gameInstance);
    }

    handleKeyClick(game: Game, e: Event): void {
        const target = e.target as HTMLButtonElement;
        if (target) {
            game.newKeyPressed(target.value);
        }
    }

    handleKeyDown(game: Game, e: KeyboardEvent): void {
        game.newKeyPressed(e.code);
    }
}
