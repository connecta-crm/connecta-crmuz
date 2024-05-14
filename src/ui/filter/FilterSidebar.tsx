export default function FilterSidebar() {
  return (
    <div className="filter__sidebar">
      <ul className="filter__sidebar__menu">
        <li className="filter__sidebar__item">
          <a href="#" className="active">
            {' '}
            All{' '}
          </a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Leads</a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Quotes</a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Orders</a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Contacts</a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Tasks</a>
        </li>
        <li className="filter__sidebar__item">
          <a href="#">Carriers</a>
        </li>
      </ul>
    </div>
  );
}
