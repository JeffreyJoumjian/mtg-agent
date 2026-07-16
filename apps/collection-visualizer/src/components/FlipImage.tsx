interface FlipImageProps {
  /** Front and back image URLs. */
  front: string | null
  back: string | null
  /** When true, the card is rotated to reveal the back. */
  flipped: boolean
  alt: string
  loading?: 'lazy' | 'eager'
}

/** A card image that rotates in 3D between its two faces. Fills its nearest positioned ancestor, so
 *  the caller supplies the frame (aspect box, rounding, overflow-clip). */
export function FlipImage(props: FlipImageProps) {
  return (
    <div className="absolute inset-0 [perspective:1000px]">
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <Face src={props.front} alt={props.alt} loading={props.loading} />
        <Face src={props.back} alt={props.alt} loading={props.loading} back />
      </div>
    </div>
  )
}

function Face(props: { src: string | null; alt: string; loading?: 'lazy' | 'eager'; back?: boolean }) {
  // Each face is pinned in the shared 3D space; backface-visibility hides whichever is turned away.
  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden]"
      style={props.back ? { transform: 'rotateY(180deg)' } : undefined}
    >
      {props.src && (
        <img src={props.src} alt={props.alt} loading={props.loading} className="absolute inset-0 h-full w-full object-contain" />
      )}
    </div>
  )
}
