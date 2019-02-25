import {
    Trait
} from '../Entity.js'

export default class Go extends Trait {
    constructor() {
        super('go')
        this.dir = 0
        this.acceleration = 400
        this.deceleration = 300
        this.dragFactor = 1/5000
        this.distance = 0
        this.heading = 1
    }

    update(entity, deltaTime) {
        const absoluteX = Math.abs(entity.vel.x)
        if (this.dir !== 0) {
            entity.vel.x += this.acceleration * deltaTime * this.dir
            this.heading = this.dir
            
        } else if(entity.vel.x !== 0) {
            //*** calculate deceleration */
            const calculatedDeceleration = Math.min(absoluteX, this.deceleration * deltaTime)
            //* return deceleration according the direction.
            const getDecelerationByDirection = () => entity.vel.x > 0 ? -calculatedDeceleration : calculatedDeceleration
            //*** add deceleration to velocity */
            entity.vel.x += getDecelerationByDirection()
        } else {
            this.distance = 0
        }
        /*** 
         * *entity.vel.x * Math.abs(entity.vel.x) 
         * *this is to mantain negative number, beause if you -1 * -1 = 1, 
         * *but if you -1 *  Math.abs(-1) = -1
         * */
        const drag = this.dragFactor * entity.vel.x * absoluteX
        entity.vel.x -= drag
        this.distance += absoluteX * deltaTime
    }
}
