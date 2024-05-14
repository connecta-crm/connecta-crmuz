import { ReactNode } from 'react';

type DrawerMainHeaderProps = {
  label: string;
  children?: ReactNode;
};

function DrawerMainHeader({ label, children }: DrawerMainHeaderProps) {
  return (
    <div className="box-header d-flex align-center justify-between">
      <span className="box-header__label">{label}</span>
      <div className="d-flex align-center">{children}</div>
    </div>
  );
}

export default DrawerMainHeader;
