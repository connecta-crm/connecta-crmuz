/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Input, Popconfirm, Select } from 'antd';
import { useState } from 'react';
import Modal from '../../ui/Modal';
import { classNames } from '../../utils/helpers';

const text = 'Are you sure to delete this agent?';
const description = 'Delete the agent';

function InsightGoalModal({ isOpenModal, onCancelModal }) {
  const [fields, setFields] = useState(['1', '2', '3']);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const isLoadingAgentDelete = false;

  const handleSave = () => {
    console.log('save');
  };
  const handleRemoveAgent = () => {
    console.log('handleRemoveAgent');
  };

  const renderFields = () => {
    return fields.map((item, index) => (
      <div
        key={index}
        className={classNames(index !== fields.length - 1 ? 'mb-20' : '')}
      >
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            {index === 0 ? (
              <div
                className="box-header__add"
                style={{ height: 23 }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <img src="./img/plus_bold.svg" alt="" />
              </div>
            ) : (
              <Popconfirm
                placement="top"
                title={text}
                description={description}
                okText={isLoadingAgentDelete ? <LoadingOutlined /> : 'Yes'}
                cancelText="No"
                disabled={isLoadingAgentDelete}
                open={popconfirmOpen}
                onConfirm={handleRemoveAgent}
                onCancel={() => setPopconfirmOpen(false)}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopconfirmOpen(true);
                  }}
                  className="box-header__add"
                  style={{ height: 23 }}
                >
                  <img src="./img/minus_bold.svg" alt="" />
                </div>
              </Popconfirm>
            )}
            <div className="modal__input-label pl-0 ml-5">
              Agent #{index + 1}
            </div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={[]}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Target monthly</div>
          </div>
          <Input
            size="small"
            placeholder="$0,000.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Target ave.dep</div>
          </div>
          <Input
            size="small"
            placeholder="$000.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
          />
        </div>
      </div>
    ));
  };
  return (
    <Modal
      title="New Goal"
      padding="15"
      width="small"
      open={isOpenModal}
      onCancel={() => {
        onCancelModal();
      }}
      onSave={handleSave}
    >
      <>
        <div className="d-flex justify-between mb-15">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Name</div>
          </div>
          <Input
            size="small"
            placeholder="Empty"
            style={{ width: 218, float: 'inline-end', height: 24 }}
          />
        </div>

        {renderFields()}
      </>
    </Modal>
  );
}

export default InsightGoalModal;
