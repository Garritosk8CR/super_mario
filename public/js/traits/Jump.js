import {Trait} from '../Entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump')

        this.ready = false
        this.duration = 0.5
        this.engageTime = 0

        this.velocity = 200
    }

    start() {
        if(this.ready) {
            this.engageTime = this.duration
        } 
    }

    obstruct(entity, side) {
        if(side === 'bottom') {
            this.ready = true
        }
    }

    cancel() {
        this.engageTime = 0
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity
            this.engageTime -= deltaTime
        }
        this.ready = false
    }
}
