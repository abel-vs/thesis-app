import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Alert } from 'flowbite-react';

function Dropzone({ file, setFile, acceptedTypes }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFile(acceptedFiles[0]);
    let message = acceptedFiles.length > 0 ? null : rejectedFiles.length > 0 ? 'Wrong file type' : null;
    setErrorMessage(message);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: acceptedTypes,
  });

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="dropzone-content relative border-2 border-dashed rounded-xl h-48 w-full mt-6 p-6 aspect-square flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer">
          {file && (
            <Image
              src={'/cross.svg'}
              alt="delete"
              height={16}
              width={16}
              className="absolute top-4 right-4"
              onClick={(e) => {
                setFile(null);
                e.stopPropagation();
              }}
            />
          )}
          <Image src={file ? '/document.svg' : '/square-plus.svg'} alt="upload" height={50} width={50} />
          <br />
          {isDragActive ? (
            "Drop it like it's hot!"
          ) : file ? (
            <code className="font-bold text-center">{file.name}</code>
          ) : (
            'Select File or Drag and Drop'
          )}
        </div>
      </div>
      {errorMessage && (
        <>
          <Alert className="mt-6" color="failure" onDismiss={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </>
      )}
    </>
  );
}

export default Dropzone;
