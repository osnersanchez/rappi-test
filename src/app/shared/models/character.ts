export class Character {

    public name: number;
    public gender: number;
    public eye_color: number;
    public films: string[];

    constructor(character: Partial<Character>) {
        if (character) {
            this.name = character.name;
            this.gender = character.gender;
            this.eye_color = character.eye_color;
            this.films = character.films;
        }

    }
}
