import Entity from './Entity.js'
import Go from './traits/Go.js'
import Jump from './traits/Jump.js'
import {loadSpriteSheet} from './loaders.js'
import createAnim from './anim.js'

export function createMario() {
    return loadSpriteSheet('mario')
    .then(sprite => {
        const mario = new Entity()
        mario.size.set(14, 16)

        mario.addTrait(new Go())
        mario.addTrait(new Jump())

        const runAnim = createAnim(['run-1','run-2','run-3'], 10)

        function routeFrame(mario) {
            /*** sets default frame */
            var frame = 'idle'
            /*** checks if shows jump sprite animation */
            if(!mario.jump.ready) {
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