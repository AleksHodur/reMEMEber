/* export type Card = {
    src: string,
    matched: boolean,
    id: number
} */

import { Card } from './classes';

export type SingleCardProps = {
    card: Card,
    handleChoice: (card: Card) => void,
    flipped: boolean,
    disabled: boolean
}