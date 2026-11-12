interface DisplayTitleProps {
  light: string;
  bold?: string;
  as?: "h1" | "h2";
  className?: string;
}

/** Grand titre 60 px Light en capitales, avec une partie optionnelle en gras (ex. AX + 400) */
export default function DisplayTitle({ light, bold, as: Tag = "h2", className = "" }: Readonly<DisplayTitleProps>) {
  return (
    <Tag className={`text-[clamp(2.5rem,5vw,3.75rem)] leading-none font-light uppercase tracking-[0.03em] text-fg ${className}`}>
      {light}
      {bold && <span className="font-bold">{bold}</span>}
    </Tag>
  );
}
