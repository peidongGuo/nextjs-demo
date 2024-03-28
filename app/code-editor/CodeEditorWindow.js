import React, { useState } from 'react';

import Editor from '@monaco-editor/react';

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || '');

  const handleEditorChange = (value) => {
    setValue(value);
    onChange('code', value);
  };
  const editorOptions = {
    minimap: {
      enabled: false, // 禁用代码小地图
    },
    glyphMarginWidth: 40, // 代码行数边栏的宽度
    // 其他选项...
  };
  return (
    <div className="overlay shadow-4xl h-[300px] h-full w-full overflow-hidden rounded-md">
      <Editor
        width={`100%`}
        language={language || 'C++'}
        value={value}
        theme={theme}
        defaultValue="// Start Code Here"
        onChange={handleEditorChange}
        options={editorOptions}
      />
    </div>
  );
};
export default CodeEditorWindow;
