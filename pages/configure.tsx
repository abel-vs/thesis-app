import { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Configure() {
  const context = useContext(AppContext);

  return (
    <>
      <h1>Configure</h1>
      <p>{context.modelArchitectureFile !== null ? context.modelArchitectureFile.name : 'No File'}</p>
    </>
  );
}
