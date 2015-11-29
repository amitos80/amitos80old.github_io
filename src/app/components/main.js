import riot from 'riot';
import componentFactory from '../component-factory';

import mycanvas from './mycanvas';

componentFactory.createComponent('main', `

<mycanvas></mycanvas>


<style>
    main {
        display: block;

    }
</style>
 
 `,
 function(opts) {
    this.on('mount', () => {
        console.log("Main mounted");
    });

    //this.on('update', () => {
    //    console.log("Main on update");
    //});

    this.dispatcher.on('main_state_updated', () => {
        console.log("Main on main_state_updated");
        this.update();
    });
});
