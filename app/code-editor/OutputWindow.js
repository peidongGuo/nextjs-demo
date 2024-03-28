import React from 'react';
import { decode } from 'js-base64';
const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 text-xs font-normal text-red-500">
          {decode(outputDetails?.compile_output)}
          {/* {outputDetails?.compile_output} */}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 text-xs font-normal text-green-500">
          {decode(outputDetails.stdout) !== null
            ? `${decode(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 text-xs font-normal text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 text-xs font-normal text-red-500">
          {decode(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <div className="h-36 w-full overflow-y-auto rounded-md bg-[#dddddd] text-sm font-normal text-white">
      {outputDetails ? <>{getOutput()}</> : null}
    </div>
  );
};

export default OutputWindow;
