// components/ExampleCarouselImage.jsx
import Image from 'react-bootstrap/Image';

/**
 * Rend une image de 800 × 400 générée par Holder.js
 * (seulement pour avoir un aperçu visuel rapide).
 * @param {string} text  Le texte affiché dans l’image factice.
 */
export default function ExampleCarouselImage({ text = '' }) {
  return (
    <Image
      src={`/Marrakech_banner.jpg?text=${encodeURIComponent(text)}`}
      alt={text}
      fluid        // occupe toute la largeur disponible
    />
  );
}
