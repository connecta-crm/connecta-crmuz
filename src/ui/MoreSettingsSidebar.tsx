import { Collapse } from 'antd';
import { NavLink } from 'react-router-dom';
import { MenuNestedData, MoreSettingsElements } from '../services/menu/nestedElements';

function MoreSettingsSidebar() {
  const groupedByCategory: { [category: string]: MenuNestedData[] } =
  MoreSettingsElements.reduce(
      (acc: { [category: string]: MenuNestedData[] }, el: MenuNestedData) => {
        const { category } = el;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(el);
        return acc;
      },
      {},
    );
  return (
    <div className="setting__sidebar">
      {Object.entries(groupedByCategory).map(([categoryName, items], index) => (
        <Collapse
          key={categoryName}
          size="large"
          defaultActiveKey={['0']}
          items={[
            {
              key: String(index),
              label: categoryName,
              children: (
                <ul className="setting__sidebar__menu">
                  {items.map((item) => (
                    <li key={item.path}>
                      <NavLink to={item.path}>{item.title}</NavLink>
                    </li>
                  ))}
                </ul>
              ),
            },
          ]}
        />
      ))}
    </div>
  );
}

export default MoreSettingsSidebar;
