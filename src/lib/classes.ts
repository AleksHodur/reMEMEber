export class Card{
    src: string;
    matched: boolean;
    id: number;
    meme: string;
    part: number;

    constructor(src: string, matched: boolean, id:number, meme:string, part: number){
        this.src = src;
        this.matched = matched;
        this.id = id;
        this.meme = meme;
        this.part = part;
    }
}
/* 
export class DoubleCard extends Card{
    meme: string;
    part: number;

    constructor(src: string, matched: boolean, id:number, meme:string, part: number){
        super(src, matched, id);
        this.meme = meme;
        this.part = part;
    }
} */