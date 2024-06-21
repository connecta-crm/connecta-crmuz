import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MoreSettingsSidebar from '../ui/MoreSettingsSidebar';
export default function MoreSettings() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/automation/status-automation');
  }, []);
  return (
    <div className="setting">
      <MoreSettingsSidebar />
      <div className="setting__content">
        <Outlet />
      </div>
    </div>
  );
}
