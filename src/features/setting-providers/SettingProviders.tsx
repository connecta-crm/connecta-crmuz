import { useEffect, useState } from 'react';
import ProviderModal from '../../ui/modal/ProviderModal';
import SettingProvidersTable from './SettingProvidersTable';
import { useSettingProviderDetails } from './useSettingProviderDetails';
import { useSettingProviders } from './useSettingProviders';
export default function SettingProviders() {
  const [providerId, setProviderId] = useState<number | null>(null);
  const { provider, isLoadingUser } = useSettingProviderDetails(providerId);
  const [openModal, setOpenModal] = useState(false);
  const { providers, isLoading } = useSettingProviders();

  useEffect(() => {
    if (provider) {
      setOpenModal(true);
    }
  }, [provider]);

  return (
    <>
      <div className="providers">
        <SettingProvidersTable
          setOpenModal={setOpenModal}
          dataSource={providers}
          isLoading={isLoading}
          isLoadingUser={isLoadingUser}
          count={providers?.length}
          setProviderId={setProviderId}
        />
        <ProviderModal
          provider={provider}
          setProviderId={setProviderId}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
