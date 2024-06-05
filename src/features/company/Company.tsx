import { useEffect, useState } from 'react';
import CompanyTable from './CompanyTable';
import { useCompany } from './useCompany';
import { useCompanyDetails } from './useCompanyDetails';
import CompanyModal from '../../ui/modal/СompanyModal';
export default function Company() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { company, isLoadingTeam } = useCompanyDetails(editId);
  const { companys, isLoading } = useCompany(true);

  useEffect(() => {
    if (company) {
      setOpenModal(true);
    }
  }, [company]);

  return (
    <>
      <div className="company">
        <CompanyTable
          setEditId={setEditId}
          dataSource={companys ? [companys] : []}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={1}
        />
        <CompanyModal
          setEditId={setEditId}
          company={company}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
