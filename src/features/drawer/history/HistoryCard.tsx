import { Radio } from 'antd';
import { NoteItemType } from './History';

export type HistoryCardProps = {
  type: string;
  item: NoteItemType;
};
function HistoryCard({ type, item }: HistoryCardProps) {
  return (
    <div className="card mb-10">
      <div className="card__row">
        <div className="card__col">
          <div className="card__icon">
            <img src={`./img/drawer/tab/${type}.svg`} alt="" />
          </div>
        </div>
        <div className="card__col w-100">
          <div className="card__body">
            <div className="card__left">
              <div className="card__texts d-flex align-center mb-5">
                <div className="card__text">
                  <Radio>
                    <div dangerouslySetInnerHTML={{ __html: item?.title }} />
                  </Radio>
                </div>
              </div>
              <div className="card__bottom d-flex align-center">
                <p>12.31.2024 at 3:40</p>
                <p>Ali Brain</p>
                <p>Call was scheduled on {item?.createdAt}</p>
              </div>
            </div>
            <div className="card__right d-flex align-center">
              <p className="card__action">
                <img src="./img/drawer/extract.svg" alt="" />
              </p>
              <p className="card__action">
                <img src="./img/drawer/pen.svg" alt="" />
              </p>
              <p className="card__action">
                <img src="./img/drawer/delete-icon.svg" alt="" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
