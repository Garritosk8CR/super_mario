import Entity from './Entity.js'
import Go from './traits/Go.js'
import Jump from './traits/Jump.js'
import {loadSpriteSheet} from './loaders.js'
import createAnim from './anim.js'

const FAST_DRAG = 1/5000
const SLOW_DRAG = 1/1000
export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity()
        mario.size.set(14, 16)
        mario.addTrait(new Go())
        mario.addTrait(new Jump())
        mario.turbo = function setTurboState(turboOn) {
            this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG
        }

        /*** lower number means faster frame rate */
        var frameRate = 6
        const runAnim = createAnim(['run-1','run-2','run-3'], frameRate)

        function routeFrame(mario) {
            /*** sets default frame */
            var frame = 'idle'
            /*** checks if shows jump sprite animation */
            if(mario.jump.falling) {
                frame = 'jump'
            }
            /*** checks if its moving */
            else if(mario.go.distance > 0) {
                /***checks if should show break sprite  */
                if( (mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0) ) {
                    frame = 'break'
                }
                else {
                    /*** gets current run frame to display */
                    frame = runAnim(mario.go.distance)
                }
            }
            return frame
        }
        mario.draw = function drawMario(context) {
            sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0)
        }
        return mario
    })
}