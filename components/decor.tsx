type DecorProps = {
  src: string;
  w: number;
  tilt: number;
  opacity: number;
};

export default function Decor({ src, w, tilt, opacity }: DecorProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative collage asset
    <img
      src={src}
      width={w}
      alt=""
      loading="lazy"
      decoding="async"
      style={{
        transform: `rotate(${tilt}deg)`,
        opacity,
        height: "auto",
      }}
    />
  );
}
