import * as React from 'react';

// Define the component's props for strict type-checking.
interface SunHomeLogoProps {
  /**
   * The primary color. Used for the inner part of the sun's gradient and the house highlight.
   */
  color1: string;
  /**
   * The secondary color. Used for the outer sun gradient and the main body of the house.
   */
  color2: string;
  /**
   * The width and height of the logo in pixels.
   * @default 200
   */
  size?: number;
}

/**
 * A professional, polished logo combining a sun with a house overlay.
 * The house features a subtle highlight, adding depth and cohesion.
 */
const SunHomeLogo: React.FC<SunHomeLogoProps> = ({
  color1,
  color2,
  size = 200,
}) => {
  // Use unique IDs for each gradient to prevent conflicts.
  const sunGradientId = React.useId();
  const houseGradientId = React.useId();

  const longRayRotations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const shortRayRotations = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];
  
  const housePathData = "M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for the sun */}
        <radialGradient id={sunGradientId} cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color1} />
          <stop offset="80%" stopColor={color2} />
        </radialGradient>

        {/* THE EXPERT TOUCH: A new gradient just for the house */}
        <linearGradient id={houseGradientId} x1="0" y1="0" x2="0" y2="1">
          {/* Top of the house catches the light from the sun's core */}
          <stop offset="0%" stopColor={color1} />
          {/* The highlight fades into the main house color */}
          <stop offset="40%" stopColor={color2} />
          {/* The rest of the house is the solid secondary color */}
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>

      {/* Layer 1: The Sun Icon */}
      <g fill={`url(#${sunGradientId})`}>
        <circle cx="100" cy="100" r="60" />
        <g transform="translate(100,100)">
          {longRayRotations.map((r) => <rect key={`l-${r}`} x="-4" y="-72" width="8" height="18" rx="4" transform={`rotate(${r})`}/>)}
          {shortRayRotations.map((r) => <rect key={`s-${r}`} x="-4" y="-64" width="8" height="6" rx="4" transform={`rotate(${r})`}/>)}
        </g>
      </g>
      
      {/* Layer 2: The House Icon, now with its own gradient fill */}
      <g transform="translate(22, 35) scale(6.5)">
        <path
          d={housePathData}
          fill={`url(#${houseGradientId})`} // Apply the new linear gradient
        />
      </g>
    </svg>
  );
};

export default SunHomeLogo;