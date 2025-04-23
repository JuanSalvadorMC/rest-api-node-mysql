export class Categoria {
    cat_id?: number;
    cat_nom: string;
    cat_obs?: string;

    constructor(cat_id: number | undefined, cat_nom: string, cat_obs?: string) {
        this.cat_id = cat_id;
        this.cat_nom = cat_nom;
        this.cat_obs = cat_obs;
    }
}
