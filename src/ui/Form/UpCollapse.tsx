import { Button } from 'antd';
import React, { useState } from 'react';
import arrow from '../../../public/img/down-arrow.svg';
import pen from '../../../public/img/drawer/pen.svg';
import remove from "../../../public/img/delete.svg"
export default function UpCollapse({
  children,
  title,
  hasButton = false,
  hasEdit = false,
  showEdit,
  isDelete=false,
  removeItem
}: {
  children: React.ReactNode;
  title: string;
  hasButton?: boolean;
  hasEdit?: boolean;
  showEdit?: () => void;
  removeItem?: () => void;
  isDelete?:boolean
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
            disabled={false}
            type="primary"
            danger
            size="small"
            className="remove-item"
          >
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
