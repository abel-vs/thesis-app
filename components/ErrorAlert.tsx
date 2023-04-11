import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface ErrorAlertProps {
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

export default function ErrorAlert({ errorMessage, setErrorMessage }: ErrorAlertProps) {
  return errorMessage ? (
    <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setErrorMessage(null)} className="m-4">
      <span className="pr-4"> {errorMessage} </span>
    </Alert>
  ) : null;
}
