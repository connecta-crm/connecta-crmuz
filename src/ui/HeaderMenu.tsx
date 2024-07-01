import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDrawerFeature } from '../context/DrawerFeatureContext';
import { getOrderData } from '../features/orders/orderSlice';
import { MenuData, SortByStatusType, getMenuData } from '../services/menu';
import { useAppSelector } from '../store/hooks';
import { classNames } from '../utils/helpers';

type Breadcrumb = {
  title: string;
  path: string;
};

function HeaderMenu({ search }: { search: string | undefined }) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get('status') || '';

  // const [isChangeStatus, setChangeStatus] = useState(false);

  const { closeDrawer } = useDrawerFeature();
  const orderData = useAppSelector(getOrderData);

  const currentPath: MenuData | undefined = getMenuData.find((menu) =>
    pathname.includes(menu.path),
  );

  const [breadcrumbs, setBreadcrumbs] = useState<MenuData[]>([]);

  useEffect(() => {
    type PathElement = MenuData & { elements?: PathElement[] };
    function getPath(
      data: PathElement[],
      path: string,
      parents: PathElement[] = [],
    ): PathElement[] {
      const adjustedPath = path === '/' ? '/leads' : path;

      return data.reduce<PathElement[]>((result, entry) => {
        if (result.length) return result;

        if (entry.path === adjustedPath) {
          return [entry, ...parents];
        }

        if (entry.elements) {
          const nested = getPath(entry.elements, adjustedPath, [
            entry,
            ...parents,
          ]);
          return nested.length > 0 ? nested : result;
        }

        return result;
      }, []);
    }

    const fullBreadcrumb = getPath(getMenuData as PathElement[], pathname);
    setBreadcrumbs(fullBreadcrumb);
  }, [pathname]);

  const handleLink = (item: SortByStatusType) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', item.value);
    const newPath = `${currentPath?.path}?${params.toString()}`;
    return newPath;
  };

  useEffect(() => {
    if (isActive && orderData?.status !== isActive) {
      closeDrawer();
    }
  }, [isActive]);

  return (
    <div className="header__menu menu">
      {!search ? (
        <ul className="menu__list">
          {currentPath?.['status'] ? (
            currentPath['status'].map((item) => (
              <li key={item.id}>
                <Link
                  to={handleLink(item)}
                  className={classNames(
                    isActive === item.value ? '_active' : '',
                    'menu__link',
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <>
              {breadcrumbs.length &&
                breadcrumbs
                  .map((crumb: Breadcrumb, index) => (
                    <li
                      key={index}
                      className={`menu__item_breadcrumb menu__item_breadcrumb_${index + 1}`}
                    >
                      <a className="menu__link">{crumb.title}</a>
                    </li>
                  ))
                  .reverse()}
            </>
          )}
        </ul>
      ) : (
        <Link to={''} className="menu__link _active">
          Global search
        </Link>
      )}
    </div>
  );
}

export default HeaderMenu;
