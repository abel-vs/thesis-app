import GradientText from './GradientText';

function TitleBlock({ title, subtitle = '' }) {
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
