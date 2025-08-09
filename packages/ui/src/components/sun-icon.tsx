import * as React from 'react';

// Define the component's props for strict type-checking.
interface SunIconProps {
  /**
   * The primary (inner) color of the sun's gradient.
   */
  color1: string;
  /**
   * The secondary (outer) color of the sun's gradient.
   */
  color2: string;
  /**
   * The width and height of the icon in pixels.
   * @default 48
   */
  size?: number;
}

/**
 * A self-contained React component that renders a sun logo SVG.
 * Its gradient is controlled explicitly via `color1` and `color2` props.
 */
const SunIcon: React.FC<SunIconProps> = ({
  color1,
  color2,
  size = 48,
}) => {
  // Use React's useId() hook to generate a unique ID for the gradient.
  // This is crucial to prevent ID conflicts if multiple icons are on the same page.
  const gradientId = React.useId();

  // Helper arrays to make the JSX cleaner and avoid repetition.
  const longRayRotations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const shortRayRotations = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id={gradientId} // Use the unique ID here
          cx="50%"
          cy="50%"
          r="50%"
          gradientUnits="userSpaceOnUse"
        >
          {/* The gradient colors are now taken directly from props */}
          <stop offset="0%" stopColor={color1} />
          <stop offset="80%" stopColor={color2} />
        </radialGradient>
      </defs>

      <g fill={`url(#${gradientId})`}>
        {/* The central body of the sun */}
        <circle cx="100" cy="100" r="60" />

        {/* Group for all the rays, centered for easy rotation */}
        <g transform="translate(100,100)">
          {/* Long Rays */}
          <g>
            {longRayRotations.map((rotation) => (
              <rect
                key={`long-${rotation}`}
                x="-4"
                y="-72"
                width="8"
                height="18"
                rx="4"
                transform={`rotate(${rotation})`}
              />
            ))}
          </g>

          {/* Short Rays */}
          <g>
            {shortRayRotations.map((rotation) => (
              <rect
                key={`short-${rotation}`}
                x="-4"
                y="-64"
                width="8"
                height="6"
                rx="4"
                transform={`rotate(${rotation})`}
              />
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SunIcon;