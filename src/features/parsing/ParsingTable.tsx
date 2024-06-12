import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { ParsingType } from './Parsing';
import { ParsingTableDataType } from './parsingTableDataType';

export default function ParsingTable({
  count,
  dataSource,
  // isLoading,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: ParsingTableDataType[];
  isLoading: boolean;
  setOpenModal: (a: boolean) => void;
  setEditId: (a: ParsingType | null) => void;
}) {
  console.log(dataSource);

  return (
    <>
      <div className="dt-header ">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Lead Parsing"
          hasActions={false}
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="parsing"
        />
      </div>
      <>
        {dataSource &&
          dataSource.map((item, index) => (
            <div className="table__container mb-20" key={index}>
              <div className="parsing__table__header">
                <span className="parsing__table__title ">{item.name}</span>
              </div>
              <div className="parsing__table__body">
                {item.items.map((el) => (
                  <div
                    className="parsing__card"
                    key={el.id}
                    style={{ width: `${100 / item.items.length}%` }}
                  >
                    <h3 className="pasing__card__title">{el.name}</h3>
                    <ul className="parsing__card__menu">
                      {el.values.map((val) => (
                        <li className="parsing__card__item" key={val.id}>
                          <span
                            onClick={() =>
                              setEditId({
                                value: val?.value,
                                id: val.id,
                                parsing: el.name,
                                group: item.name,
                              })
                            }
                          >
                            {val.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </>
    </>
  );
}
