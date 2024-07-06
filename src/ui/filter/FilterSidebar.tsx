import { useState } from 'react';
export default function FilterSidebar({
  setType,
}: {
  setType: (a: string) => void;
}) {
  const [active, setActive] = useState<string>('all');
  const onChangeType = (text: string) => {
    setActive(text);
    setType(text);
  };
  return (
    <div className="filter__sidebar">
      <ul className="filter__sidebar__menu">
        <li className="filter__sidebar__item">
          <a
            href="#"
            className={active == 'all' ? 'active' : ''}
            onClick={() => onChangeType('all')}
          >
            All
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a
            href="#"
            className={active == 'leads' ? 'active' : ''}
            onClick={() => onChangeType('leads')}
          >
            Leads
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a
            href="#"
            className={active == 'quotes' ? 'active' : ''}
            onClick={() => onChangeType('quotes')}
          >
            Quotes
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a
            href="#"
            className={active == 'orders' ? 'active' : ''}
            onClick={() => onChangeType('orders')}
          >
            Orders
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#" aria-disabled>
            Contacts
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a aria-disabled href="#">
            Tasks
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a aria-disabled href="#">
            Carriers
          </a>
        </li>
      </ul>
    </div>
  );
}
