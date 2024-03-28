'use client';
import React, { useEffect, useState } from 'react';
import CodeEditorWindow from './CodeEditorWindow';
import { Base64 } from 'js-base64';
import axios from 'axios';
import { languageOptions } from '../constants/languageOptionsSimple';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { defineTheme } from '../lib/defineTheme';
import useKeyPress from '../hooks/useKeyPress';

import OutputWindow from './OutputWindow';
import CustomInput from './CustomInput';
import OutputDetails from './OutputDetails';
import { Button } from 'antd';
import { on } from 'events';

const codeDefault = ``;

interface IProps {
  onChange: (value: string) => void;
}

const LandingSimple = ({ onChange }: IProps) => {
  const [code, setCode] = useState(codeDefault);
  const [customInput, setCustomInput] = useState('');
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress('Enter');
  const ctrlPress = useKeyPress('Control');

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enterPress', enterPress);
      console.log('ctrlPress', ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  const onCodeChange = (action, data) => {
    switch (action) {
      case 'code': {
        setCode(data);
        onChange(data);
        break;
      }
      default: {
        console.warn('case not handled!', action, data);
      }
    }
  };

  const handleCompile = () => {
    console.log('hey');
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: Base64.encode(code),
      stdin: Base64.encode(customInput),
    };

    console.log(formData);
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': 'e7dfcf81c0mshcae51c008c2f116p127c51jsn60248be650f4',
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log('res.data', response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;

        // get error status
        // let status = err.response ? err.response.status: null;

        // console.log("status", status);
        if (err.response && err.response.status === 429) {
          console.log('too many requests', err.response.status);

          showErrorToast(`Quota of 100 requests exceeded for the Day!`, 10000);
        }
        setProcessing(false);
        console.log('catch block...', error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': 'e7dfcf81c0mshcae51c008c2f116p127c51jsn60248be650f4',
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;
      console.log(statusId);
      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log('response.data', response.data);
        return;
      }
    } catch (err) {
      console.log('err', err);
      setProcessing(false);
      showErrorToast();
    }
  };

  useEffect(() => {
    defineTheme('oceanic-next').then((_) =>
      setTheme({ value: 'oceanic-next', label: 'Oceanic Next' }),
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: 'top-right',
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* <div className="h-4 w-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div> */}
      <div>
        <CodeEditorWindow
          code={code}
          onChange={onCodeChange}
          language={language?.value}
          theme={theme.value}
        />
        <div className="mb-4 mt-4">
          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />
        </div>
        <Button
          className="mb-4 w-full"
          onClick={handleCompile}
          disabled={!code}
        >
          {processing ? '执行中...' : '执行代码'}
        </Button>
        <OutputWindow outputDetails={outputDetails} />
        {outputDetails && <OutputDetails outputDetails={outputDetails} />}
      </div>
    </>
  );
};
export default LandingSimple;
