export class Film {

    public episode_id: number;
    public title: string;
    public director: string;
    public opening_crawl: string;
    public imgUrl: string;
    public characters: string[];

    constructor(film: Partial<Film>) {
        if (film) {
            this.title = film.title;
            this.episode_id = film.episode_id;
            this.director = film.director;
            this.opening_crawl = film.opening_crawl;
            this.imgUrl = film.imgUrl;
            this.characters = film.characters;
        }
    }

}
