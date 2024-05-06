import { isAxiosError } from 'axios';
import { ErrorAlert } from '../UI';

export const NewsError = ({ error }: { error: Error }) => {
  let errMsg = error.message;

  if (isAxiosError(error)) {
    errMsg = error.response?.data.message;
  }

  return <ErrorAlert errorTitle='Error' errorMessage={errMsg} />;
};
