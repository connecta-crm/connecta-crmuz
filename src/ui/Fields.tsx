import { useState } from 'react';
import arrow from '../../public/img/drawer/down-arrow-bold.svg';
import { FieldsTableDataType } from '../features/fields/fieldsTableDataType';
import { useFields } from '../features/fields/useFields';
import DownCollapse from './form/DownCollapse';
import UpCollapse from './form/UpCollapse';
export default function Fields({
  setContent,
  content,
}: {
  setContent: (a: string) => void;
  content: string;
}) {
  const [open, setOpen] = useState(false);
  const { fields } = useFields(open);

  // document
  //   .querySelector('.ant-modal-content')
  //   ?.addEventListener('click', () => {
  //     setOpen(false);
  //   });

  return (
    <div className="fields" onClick={() => setOpen(!open)}>
      <div className="fields__header">
        <div className="fields__title">Insert a field</div>
        <img src={arrow} alt="" />
      </div>
      {open && (
        <div onClick={(e) => e.stopPropagation()} className="fields__dropdown">
          {fields ? (
            fields.map((item: FieldsTableDataType, index: number) => (
              <DownCollapse
                key={index}
                border={true}
                title={item.title}
                notImg={true}
              >
                {item.block.map((el, i: number) => (
                  <UpCollapse title={el.blockName} key={i}>
                    {el.data.map((t, k: number) => (
                      <div
                        key={k}
                        className="fields__row"
                        onClick={() => {
                          setContent(content ? content + t.value : t.value);
                          setOpen(false);
                        }}
                      >
                        <span className="fields__row__title">{t.key}</span>
                        <span className="fields__row__text">{t.value}</span>
                      </div>
                    ))}
                  </UpCollapse>
                ))}
              </DownCollapse>
            ))
          ) : (
            <div className="d-flex justify-center">No data</div>
          )}
        </div>
      )}
    </div>
  );
}
