const createAnim = ( frames, frameLen ) =>
      distance =>
        frames[Math.floor(distance / frameLen) % frames.length]
        
export default createAnim