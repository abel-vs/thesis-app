import GradientText from './GradientText';

interface TitleBlockProps {
  title: string;
  subtitle?: string;
}

function TitleBlock({ title, subtitle = '' }: TitleBlockProps) {
  return (
    <>
      <h1 className="text-5xl font-bold">
        <GradientText text={title} />
      </h1>
      <p className="mt-3 text-xl">{subtitle}</p>
    </>
  );
}

export default TitleBlock;
