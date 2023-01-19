import Image from 'next/image';
import styles from '../styles/DropZone.module.css';

const DropZone = ({ file, fileAction, dispatch }) => {
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get file from event on the dataTransfer object
    let file = e.dataTransfer.files[0];
    // dispatch action to add droped file or files to fileList
    dispatch({ type: fileAction, file });
    // reset inDropZone to false
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get file from event on the dataTransfer object
    let file = e.target.files[0];

    // dispatch action to add droped file or files to fileList
    dispatch({ type: fileAction, file });
  };

  return (
    <>
      <input
        id={'fileSelect' + fileAction}
        type="file"
        className={styles.files}
        onChange={(e) => handleFileSelect(e)}
      />
      <div
        className="border-2 border-dashed rounded-xl h-48 w-full mt-6 p-6 aspect-square flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onClick={() => document.getElementById('fileSelect' + fileAction).click()}
      >
        {/* {fileAction} */}

        <Image src="/document.svg" alt="upload" height={50} width={50} />
        <br />
        {file ? <code className="font-bold text-center">{file.name}</code> : 'Select File or Drag and Drop'}
      </div>
    </>
  );
};

export default DropZone;
