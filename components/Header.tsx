import GradientText from './GradientText';
import Steps from './Steps';

function Header() {
  return (
    <div className="flex items-center p-5">
      <a className="flex-none text-4xl font-bold " href="/">
        Tool <GradientText text="X" />
      </a>
      <div className="flex-1" />
      <div className="flex-auto">
        <Steps />
      </div>
      <div className="flex-1 bg-red-200 w-10 h-10" />
    </div>
  );
}

export default Header;
