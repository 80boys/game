export type InitProps = {
    step: number,
    width:number,
    height:number,
    state: boolean
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