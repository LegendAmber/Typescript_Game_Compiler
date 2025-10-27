//Default game context (2d)
import { point } from "./interface/worldInterface"
import * as Assets from "./interface/constsInterface"
import { camera, ratio, viewport } from "./interface/cameraInterface"
export class GameWindow{
    private renderingContext: CanvasRenderingContext2D;
    private window: HTMLCanvasElement;
    private winFuncIdef: number = 0;
    private StartPoint: point = {x: 0, y: 0};
    private Camera: camera = {originX: 0, originY: 0, Viewport: {width: 1920, height: 1080, Scaling: {pxPerx: 16, pxPery: 9}}}
    constructor(){
        this.window = document.createElement("canvas");
        this.renderingContext = this.window.getContext("2d") as CanvasRenderingContext2D;
        document.body.appendChild(this.window);
    }
    StartAnimation(callback: FrameRequestCallback){
        this.winFuncIdef = requestAnimationFrame(callback);
    }
    StopAnimation(){
        cancelAnimationFrame(this.winFuncIdef);
    }
    PenDown(x: number, y: number){
        this.renderingContext.beginPath();
        this.StartPoint = {x: x, y: y};
        moveTo(this.StartPoint.x, this.StartPoint.y);
    }
    PenUp(){
        this.renderingContext.closePath();
    }
    LineTo(x: number, y: number){
        this.renderingContext.lineTo(x, y);
    }
    DrawRectangle(x: number, y: number, width: number, height: number, type?:string, radius?: number){
        if(Assets.RECTANGLE_TYPE_FILL == type){
            this.renderingContext.fillRect(x, y, width, height);
        }else if(Assets.RECTANGLE_TYPE_LINE == type){
            this.renderingContext.strokeRect(x, y, width, height);
        }else if(Assets.RECTANGLE_TYPE_ROUND == type){
            this.renderingContext.roundRect(x, y, width, height, radius);
        }else{
            this.renderingContext.rect(x, y, width, height);
        }
    }
    MoveTo(x: number, y: number){
        this.renderingContext.moveTo(x, y);
    }
    DrawCircle(x: number, y:number, radius: number){
        this.renderingContext.arc(x, y, radius, 0, 360);
    }
    ClearWindow(){
        this.renderingContext.clearRect(0, 0, this.window.width, this.window.height);
    }
    CameraConfig(Viewport?: viewport, ratio?: ratio){
        if(Viewport){
            this.Camera.Viewport = Viewport;
        }
        if(ratio){
            this.Camera.Viewport.Scaling = ratio;
        }
    }
}
//Webgl2 game context 
export class WebGL2GameWindow{
    private renderingContext: WebGL2RenderingContext;
    private window: HTMLCanvasElement;
    constructor(){
        this.window = document.createElement("canvas");
        this.renderingContext = this.window.getContext("webgl2") as WebGL2RenderingContext;
    }
}

//Webgl game context
export class WebGLGameWindow{
    private renderingContext: WebGLRenderingContext;
    private window: HTMLCanvasElement;
    constructor(){
        this.window = document.createElement("canvas");
        this.renderingContext = this.window.getContext("webgl") as WebGLRenderingContext;
    }
}