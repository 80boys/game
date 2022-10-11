export type InitProps = {
    step: number,
    width:number,
    height:number
}
export type LocalVar = {
    rate : number,
    onload : Boolean,
    img : HTMLImageElement,
    init: Boolean,
    step: number,
    maxCount: number,
    minCount: number
}