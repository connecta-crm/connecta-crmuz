import { Button } from 'antd';
import React, { useState } from 'react';
import arrow from '../../../public/img/down-arrow.svg';
import pen from '../../../public/img/drawer/pen.svg';
export default function UpCollapse({
  children,
  title,
  hasButton = false,
  hasEdit = false,
  showEdit,
}: {
  children: React.ReactNode;
  title: string;
  hasButton?: boolean;
  hasEdit?: boolean;
  showEdit?: () => void;
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
          <Button disabled={false} type="primary" danger size="small">
            CD Price
          </Button>
        )}
        {hasEdit && (
          <div className="edit-btn" onClick={showEdit}>
            <img src={pen} />
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
