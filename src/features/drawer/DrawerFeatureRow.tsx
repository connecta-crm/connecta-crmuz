import { ReactNode } from 'react';

type DrawerFeatureRowProps = {
  children: ReactNode;
};
function DrawerFeatureRow({ children }: DrawerFeatureRowProps) {
  return (
    <div className="detail-inner">
      <div className="detail-inner__form">{children}</div>
    </div>
  );
}

export default DrawerFeatureRow;
