/**
 * Created by amit on 29/11/15.
 */
import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc';
import developmentEnv from '../../client/environment';

componentFactory.createComponent('mycanvas', `


    <div class="canvas-container">

    </div>




<style>

    .canvas-container {

    }

    canvas {
        font-family: sans-serif;
        color: #333333;

        display: block;
        margin-top: 10px;
        margin-left:auto;
        margin-right:auto;
        background: #ffffff;
        border: 5px solid #cccccc;
    }
</style>

`,
function(opts) {

    this.draw = (x, y, type) => {
        if (type === "dragstart") {
            this.ctx.beginPath();
            return this.ctx.moveTo(x, y);
        } else if (type === "drag") {
            this.ctx.lineTo(x, y);
            return this.ctx.stroke();
        } else {
            return this.ctx.closePath();
        }
    }

    this.initCanvas = () => {
        let canvas =
            $('<canvas/>', {id:"app-canvas"})
                .width(800)
                .height(400).appendTo('.canvas-container');


        this.ctx = canvas[0].getContext("2d");
        this.ctx.height = 400;
        this.ctx.width = 800;

        this.ctx.fillStyle = "solid";
        this.ctx.strokeStyle = "#ff3344";
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";

        let socket = io.connect(developmentEnv.SERVER_ADDRESS);
        socket.on('draw', (data) => {
            return this.draw(data.x, data.y, data.type);
        });



        $('#app-canvas').live('drag dragstart dragend', (e) => {
            console.log('EVENT = ', e)
            let type, x, y;
            type = e.handleObj.type;

            console.log('canvas canvasOffset = ', canvasOffset)
            //console.log('offset = ', offset)

            //e.offsetX = e.layerX + offset.left;
            //e.offsetY = e.layerY + offset.top;

            //e.offsetX = canvasOffset.left;
            //e.offsetY = canvasOffset.top;

            //e.offsetX = e.layerX;
            //e.offsetY = e.layerY;

            //x = e.offsetX - canvasOffset.left;
            //y = e.offsetY - canvasOffset.top;

            let canvasOffset = $('#app-canvas').offset();
            x = e.pageX - canvasOffset.left; //screen, page
            y = e.pageY - canvasOffset.top;

            //oo
            //e.offsetX = e.layerX;// - canvasOffset.left
            //e.offsetY = e.layerY;// - canvasOffset.top
            //x = e.offsetX
            //y = e.offsetY
            console.log('sending x = ', x, 'y = ', y);
            this.draw(x, y, type);

            socket.emit('drawClick', {
                x: x,
                y: y,
                type: type
            });
        });


    }

    this.on('mount', () => {
        //console.log("my-canvas mounted");

        if(miscUtil.isBrowser()){
            console.log("my-canvas mounted");

            this.initCanvas();
        }
    });




    this.dispatcher.on('main_state_updated', () => {
        console.log("Main on main_state_updated");
        this.update();
    });
});

