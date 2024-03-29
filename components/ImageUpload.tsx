import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ComponentProps {
  value: string;
  disabled: boolean;
  onChange: (base64: string) => void;
  label: string;
}

const ImageUpload = ({ disabled, label, onChange, value }: ComponentProps) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },

    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className='flex items-center justify-center'>
          <Image
            src={base64}
            height='100'
            width='100'
            alt='Updated image'
          />
        </div>
      ) : (
        <p className='text-white'>{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
