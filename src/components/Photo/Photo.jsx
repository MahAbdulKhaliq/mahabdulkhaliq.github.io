import { useState } from 'react'
import './Photo.css'

// Shows the image, or a labelled empty frame until the file is added.
export default function Photo({ src, alt, className = '' }) {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <div className={`photo photo-empty ${className}`}>
        <span>Add {src.replace(/^\.\//, 'public/')}</span>
      </div>
    )
  }
  return (
    <img
      className={`photo ${className}`}
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
    />
  )
}
