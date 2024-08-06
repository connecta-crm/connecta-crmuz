import { Button, Spin } from 'antd';
import React, { useState } from 'react';
import remove from '../../../public/img/delete.svg';
import arrow from '../../../public/img/down-arrow.svg';
import pen from '../../../public/img/drawer/pen.svg';
export default function UpCollapse({
  children,
  title,
  hasButton = false,
  hasEdit = false,
  showEdit,
  isDelete = false,
  removeItem,
  postQuoteCDPrice,
  isFetchingCDPrice
}: {
  children: React.ReactNode;
  title: string;
  hasButton?: boolean;
  hasEdit?: boolean;
  showEdit?: () => void;
  removeItem?: () => void;
  postQuoteCDPrice:()=>void
  isDelete?: boolean;
  isFetchingCDPrice:boolean
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="collapse ">
      <div className="collapse__header d-flex justify-between mb-10">
        <div onClick={() => setShow(!show)} className="d-flex align-center">
          <img className={show ? 'active__drop' : ''} src={arrow} alt="" />
          <span style={{ marginLeft: '10px' }}>{title}</span>
        </div>
        {hasButton && (
          <Button
            disabled={isFetchingCDPrice}
            type="primary"
            danger
            size="small"
            className="remove-item"
            onClick={postQuoteCDPrice}
          >
            {isFetchingCDPrice&&(<Spin size='small' className='mr-5'/>) }
             CD Price
          </Button>
        )}
        {hasEdit && (
          <div className="edit-btn" onClick={showEdit}>
            <img src={pen} />
          </div>
        )}
        {isDelete && (
          <div className="edit-btn" onClick={removeItem}>
            <img src={remove} />
          </div>
        )}
      </div>
      <div
        className={!show ? 'collapse__body' : 'collapse__body collapse__hide'}
      >
        {children}
      </div>
    </div>
  );
}
