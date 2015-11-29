import FruitStore from './stores/fruit';
import MainStore from './stores/main';

export default class Stores {
    constructor() {
        this.fruit = new FruitStore();
        this.main = new MainStore();
    }
};
