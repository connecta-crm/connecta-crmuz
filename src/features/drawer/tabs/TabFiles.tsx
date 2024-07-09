/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Input, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { useCreateFile } from '../../attachments/useCreateFile';

function TabFiles({ user, sourceId, sourceType }) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { createFile, isLoading, error } = useCreateFile(sourceType);

  const handleUpload = (event) => {
    setSelectedFile(event?.file);
  };

  const handleSave = () => {
    if (!selectedFile) {
      message.warning('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('text', title);
    formData.append('rel', sourceId);
    formData.append('endpointType', sourceType);
    formData.append('user', user);
    createFile(formData);
  };

  useEffect(() => {
    if (!isLoading && !error) {
      setSelectedFile(null);
      setTitle('');
    }
  }, [isLoading, error]);

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
        {!selectedFile && (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Upload
                multiple={false}
                maxCount={1}
                beforeUpload={() => false}
                onChange={handleUpload}
              >
                <Button type="primary" size="small">
                  Upload files
                </Button>
              </Upload>
              <p className="ml-10">or drag files here</p>
            </div>
          </div>
        )}
        {selectedFile && (
          <div className="tabs-file__files">
            <div className="file-item">
              <div className="file-item__content">
                <p>
                  <img src="./img/drawer/tab/files.svg" alt="" />
                </p>
                <div className="file-item__text">
                  Insurance for #<span>{selectedFile?.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedFile && (
        <Flex
          style={{
            justifyContent: 'flex-end',
            padding: '0px 10px 8px',
          }}
          gap="small"
          wrap="wrap"
        >
          <div>
            <Button
              size="small"
              onClick={() => {
                setSelectedFile(null);
                setTitle('');
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              type="primary"
              size="small"
              disabled={isLoading}
              loading={isLoading}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </Flex>
      )}
    </>
  );
}

export default TabFiles;

// * delete icon for the future
{
  /* <div className="file-item__delete">
              <img src="./img/drawer/delete-icon.svg" alt="" />
            </div> */
}

{
  /* <Form onFinish={onFinish}>
            <Form.Item
              name="file"
              label="Upload profile picture"
              getValueFromEvent={({ file }) => file.originFileObj}
            >
              <Upload
                {...uploadProps}
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                // fileList={fileList}
              >
                <Button
                  size="small"
                  style={{ color: '#4096ff', borderColor: ' #4096ff' }}
                >
                  + Files
                </Button>
                <button type="submit">submit</button>
              </Upload>
            </Form.Item>
          </Form> */
}
