import React, { useCallback, useEffect, useState } from "react"
import { RefObject } from "react"
import { InitProps } from "../utils/Types"
import Bimg from "../assets/images/map.png"
function Bj(props:InitProps){
    const [canvas, setCanvas] = useState(document.createElement("canvas"))
    const [ctx] = useState(canvas.getContext("2d"))
    const [img] = useState(new Image())
    const [flag, setFlag] = useState(0)
    const rateSize = {
        rate : 0
    }
    const container:RefObject<HTMLDivElement> = React.createRef()
    useEffect(()=>{
        init()
    },[props.height])
    const init = ()=>{
        canvas.width  = props.width
        canvas.height = props.height
        img.src = Bimg
        img.onload = ()=>setFlag(1)
        if ( container != null && container.current != null ) {
            container.current.append(canvas)
            console.log("append")
            rateSize.rate = (img.height / props.height)
            test(0)
            setCanvas(canvas)
        } else {
            throw new Error("容器不存在!")
        }
    }
    const stepSize = 5
    const test = (step:number)=>{
        if ( step < 1250 ) {
            setTimeout(()=>{
                drawBj(false, step)
                test(step + stepSize)
            }, 10) 
        }
    }

    const drawBj = (stop: false, step:number = 0) => { 
        if ( flag === 1 && stop === false ) {
            if ( ctx !== null ) { 
                ctx.drawImage(img, step, 0, props.width * rateSize.rate, img.height, 
                    0, 0, props.width, props.height ); 
                if ( (step + props.width) * rateSize.rate > img.width ) {
                    ctx.clearRect(0, 0, props.width, props.height )
                    ctx.drawImage(img, 0, 0, (step + props.width) * rateSize.rate - img.width, img.height, 
                        props.width - ((step + props.width) * rateSize.rate - img.width - stepSize), 0, props.width / rateSize.rate, props.height );  
                    debugger 
                }
            }
        }
    }
    return <div ref={container} >{flag}</div> 
}
export default Bj