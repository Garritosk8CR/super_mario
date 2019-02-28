import {Sides, Trait} from '../Entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump')

        this.ready = 0
        this.duration = 0.5
        this.engageTime = 0
        this.velocity = 200
        this.requestTime = 0
        this.gracePeriod = 0.150
    }

    get falling() {
        return this.ready < 0
    }

    start() {
        this.requestTime = this.gracePeriod 
    }

    obstruct(entity, side) {
        if(side === Sides.BOTTOM) {
            this.ready = 1
        }
        else if( side === Sides.TOP) {
            /*** stops jumping if its hitting an object above the character. */
            this.cancel()
        }
    }

    cancel() {
        this.engageTime = 0
        this.requestTime = 0
    }

    update(entity, deltaTime) {
        if(this.requestTime > 0) {
            if(this.ready > 0) {
                this.engageTime = this.duration
                this.requestTime = 0
            }
            this.requestTime -= this.deltaTime
        }
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity
            this.engageTime -= deltaTime
        }
        this.ready--;
    }
}
