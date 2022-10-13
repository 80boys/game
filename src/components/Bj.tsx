import React, { useCallback, useEffect, useState } from "react"
import { RefObject } from "react"
import { InitProps, LocalVar } from "../utils/Types"
import "./BJ.css"
import Bimg from "../assets/images/map.png"
import Hunter from "../assets/images/hunter.png"
function Bj(props:InitProps){
    const [canvas] = useState(document.createElement("canvas")) 
    const [ctx] = useState(canvas.getContext("2d"))
    const [Var, setVar] = useState({
        rate : 0,
        onload : false,
        img : new Image(),
        genie: new Image(),
        init: false,
        step: 0,
        maxCount: 0,
        minCount: 0
    })
    const container:RefObject<HTMLDivElement> = React.createRef()
    useEffect(()=>{
        init()
        console.log("init")
    },[props.height])
    const init = ()=>{
        canvas.width  = props.width
        canvas.height = props.height
        Var.img.src = Bimg
        Var.genie.src = Hunter
        Var.img.onload = ()=>{
            Var.onload = true
            Var.step = props.step
            Var.rate = Number.parseFloat((Var.img.height / props.height).toFixed(2))
            Var.maxCount = Math.floor(Var.img.width / Var.step)
            Var.minCount = Math.floor((Var.img.width - props.width * Var.rate) / Var.step)
            setVar(Var)
            drawBj(Var.step, 0 )
        }
    }
    useEffect(()=>{
        if ( props.state === false ) {
            //run 不是单例
            if ( Var.init === false ) {
                run(0, props.state)
            }
        } 
    }, [props.state])

    const run = ( num:number = 0, state:boolean=false)=>{
        //debugger
        if ( state === true ) {
            return
        }
        if ( num > Var.maxCount ) {
            num = 0 
        }
        setTimeout(()=>{
            if ( drawBj(Var.step * num, num ) ) {
                drawJl()
                run( num+1, state ) 
            } else {
                run( num, state ) 
            }
        }, 10)
    }
    let count = 0
    let frame = 20
    const drawJl = () => {
        if ( count < frame ) {
            ctx?.drawImage(Var.genie, 
                98, 234, 98, 118,
                50 / Var.rate, 278 / Var.rate, 96 / Var.rate, 118 / Var.rate
            )
        }
        if ( count > frame && count < frame * 2 ) {
            ctx?.drawImage(Var.genie, 
                110, 0, 98, 118,
                50 / Var.rate, 278 / Var.rate, 96 / Var.rate, 118 / Var.rate
            )
        }
        count++
        if ( count > frame * 2 ) {
            count = 0
        }
    }
    const drawBj = ( step:number = 0, num: number ): boolean => { 
        //debugger
        if ( Var.onload === true ) {
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