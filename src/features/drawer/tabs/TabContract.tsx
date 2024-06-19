/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UploadProps } from 'antd';
import { Button, Flex, UploadFile } from 'antd';
import { useState } from 'react';

function TabContract() {
  const [fileList, setFileList] = useState<UploadFile[]>(['something', 'smt2']);

  const handleChange: UploadProps['onChange'] = (info) => {};

  return (
    <>
      <div className="tabs-contract tabs-file">
        {fileList.length === 0 ? (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Button
                type="primary"
                size="middle"
                className="d-flex align-center"
              >
                <span>Send a contract</span>{' '}
                <img
                  className="ml-10"
                  src="/img/drawer/tab/down-w.svg"
                  alt="down"
                />
              </Button>
            </div>
          </div>
        ) : (
          <div className="tabs-file__files mt-0">
            {fileList.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-item__content">
                  <p>
                    <img src="./img/drawer/tab/contract-black.svg" alt="" />
                  </p>
                  <div className="file-item__text">
                    <span>Contract is sent for #600000</span>{' '}
                    <span className="ml-5">at 09:37 AM</span>
                    <span className="ml-5">03/15/2024</span>
                  </div>
                </div>
                <div onClick={() => {}} className="">
                  <Button className="ml-10" type="primary" ghost size="small">
                    Track
                  </Button>
                  <Button className="ml-10" type="primary" ghost size="small">
                    SMS
                  </Button>
                  <Button className="ml-10" type="primary" size="small">
                    Not-Signed
                  </Button>
                  <Button
                    className="ml-10"
                    type="primary"
                    size="small"
                    style={{ backgroundColor: 'rgb(66, 125, 157)' }}
                  >
                    Signed
                  </Button>
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
          <span></span>
          <div>
            <Button
              type="primary"
              size="middle"
              className="d-flex align-center"
            >
              <span>Send a new contract</span>{' '}
              <img
                className="ml-10"
                src="/img/drawer/tab/down-w.svg"
                alt="down"
              />
            </Button>
          </div>
        </Flex>
      )}
    </>
  );
}

export default TabContract;
