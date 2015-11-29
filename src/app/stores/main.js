'use strict'
import riot from 'riot';

import Store from './store';

export default class MainStore extends Store {
    constructor() {
        super();
        console.log("Init MainStore");
        this.state="mall";

        this.on("fruit_swap", (fruit) => { 
            this.state ='mall';
            this.trigger("main_state_updated", "mall");
        });
    }     

};

