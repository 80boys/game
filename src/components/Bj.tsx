import React, { useEffect} from "react"
import { RefObject } from "react"
import { InitProps, LocalVar } from "../utils/Types"
import Bimg from "../assets/images/map.png"
function Bj(props:InitProps){
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const Var:LocalVar = {
        rate : 0,
        onload : false,
        img : new Image(),
        init: false,
        step: 0,
        maxCount: 0,
        minCount: 0
    } 
    const container:RefObject<HTMLDivElement> = React.createRef()
    useEffect(()=>{
        init()
    },[props.height])
    const init = ()=>{
        canvas.width  = props.width
        canvas.height = props.height
        Var.img.src = Bimg
        Var.img.onload = ()=>{
            Var.onload = true
            Var.step = props.step
            Var.rate = Number.parseFloat((Var.img.height / props.height).toFixed(2))
            Var.maxCount = Math.floor(Var.img.width / Var.step)
            Var.minCount = Math.floor((Var.img.width - props.width * Var.rate) / Var.step)
            test()
        }
    }
    const test = ( num:number = 0)=>{
        if ( num > Var.maxCount ) {
            num = 0 
        }
        setTimeout(()=>{
            if ( drawBj(Var.step * num, num ) ) {
                 test( num+1 ) 
            } else {
                test( num ) 
            }
        }, 10)
    }
    const drawBj = ( step:number = 0, num: number, stop:boolean = false): boolean => { 
        if ( Var.onload === true && stop === false ) {
            if ( container != null && container.current != null &&
                Var.init === false ) {
                Var.init = true
                container.current.append(canvas)
            }
            if ( ctx !== null ) {
                ctx.drawImage(Var.img, 
                    step, 0, 
                    props.width * Var.rate,    Var.img.height, 

                    0, 0,
                    props.width, props.height
                    ); 
                if ( num > Var.minCount ) {
                    ctx.drawImage(Var.img,
                        0, 0, 
                        (num - Var.minCount) * Var.step,
                        Var.img.height,
                        
                        props.width - (((num - Var.minCount) * Var.step) / Var.rate), 0,
                        (num - Var.minCount) * Var.step / Var.rate,
                        props.height
                    );
                }
            }
        }
        return true
    }
    return <div ref={container} ></div> 
}
export default Bj