import React, { useCallback, useState } from 'react';
import { useDropzone } from 'React-dropzone';
import Image from 'next/image';
import PropTypes from 'prop-types';

function Dropzone({ file, setFile, acceptedTypes }) {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: acceptedTypes,
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="dropzone-content relative border-2 border-dashed rounded-xl h-48 w-full mt-6 p-6 aspect-square flex flex-col justify-center items-center hover:bg-gray-100 cursor-pointer">
        <svg alt="upload" height={16} width={16} color="red" className="absolute top-4 right-4 fill-red-500">
          {' '}
          /cross.svg
        </svg>
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
  );
}

export default Dropzone;
