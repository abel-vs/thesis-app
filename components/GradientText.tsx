interface GradientTextProps {
  text: string;
}

function GradientText({ text }: GradientTextProps) {
  return <a className="bg-gradient-to-r from-cyan-500 to-green-500 text-transparent bg-clip-text">{text}</a>;
}

export default GradientText;
