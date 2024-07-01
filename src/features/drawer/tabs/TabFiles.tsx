import type { UploadProps } from 'antd';
import { Button, Flex, Input, Upload, UploadFile } from 'antd';
import { useState } from 'react';

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

function TabFiles() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState('');

  const handleChange: UploadProps['onChange'] = (info) => {
    const newFileList = [...info.fileList];

    // You can also implement file status checks here (e.g., uploading, done, error, removed)

    setFileList(newFileList);
    console.log('fileList', fileList);
  };

  // const handleSave = () => {
  //   message.success('File saved successfully');
  //   // Implement file saving logic here
  // };

  // const handleCancel = () => {
  //   setFileList([]);
  //   message.info('Upload cancelled');
  //   // Implement cancellation logic if needed
  // };

  const uploadProps = {
    name: 'files',
    multiple: true,
    fileList: fileList,
    onChange: handleChange,
    beforeUpload: () => false, // Return false to prevent auto uploading
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  return (
    <>
      <div className="tabs-file">
        <div className="tabs-file__head">
          <Input
            value={title}
            placeholder="Title"
            style={{
              border: 'none',
              outline: 'none',
              height: '100%',
              boxShadow: 'none',
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {fileList.length === 0 ? (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Upload
                {...uploadProps}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                fileList={fileList}
                onChange={handleChange}
              >
                <Button type="primary" size="small">
                  Upload files
                </Button>
              </Upload>

              <p className="ml-10">or drag files here</p>
            </div>
          </div>
        ) : (
          <div className="tabs-file__files">
            {fileList.map((file) => (
              <div key={file.uid} className="file-item">
                <div className="file-item__content">
                  <p>
                    <img src="./img/drawer/tab/files.svg" alt="" />
                  </p>
                  <div className="file-item__text">
                    Insurance for {<span>{file.name}</span>}
                  </div>
                </div>
                <div
                  onClick={() => uploadProps.onRemove(file)}
                  className="file-item__delete"
                >
                  <img src="./img/drawer/delete-icon.svg" alt="" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {fileList.length !== 0 && (
        <Flex
          style={{
            justifyContent: 'space-between',
            padding: '0px 10px 8px',
          }}
          gap="small"
          wrap="wrap"
        >
          <Upload
            {...uploadProps}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            fileList={fileList}
            onChange={handleChange}
          >
            <Button
              size="small"
              style={{ color: '#4096ff', borderColor: ' #4096ff' }}
            >
              + Files
            </Button>
          </Upload>

          <div>
            <Button size="small">Cancel</Button>
            <Button style={{ marginLeft: '8px' }} type="primary" size="small">
              Save
            </Button>
          </div>
        </Flex>
      )}
    </>
  );
}

export default TabFiles;
