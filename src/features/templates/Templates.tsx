import { useEffect, useState } from 'react';
import { useTemplateDetails } from './useTemplateDetails';
import { useTemplates } from './useTemplates';
import TemplatesTable from './TemplatesTable';
import TemplatesModal from '../../ui/modal/TemplatesModal';
export default function Templates() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { template, isLoadingTeam } = useTemplateDetails(editId);
  const { templates, isLoading } = useTemplates(true);

  useEffect(() => {
    if (template) {
      setOpenModal(true);
    }
  }, [template]);

  return (
    <>
      <div className="templates">
        <TemplatesTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={templates}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={templates?.length}
        />
        <TemplatesModal
          setEditId={setEditId}
          template={template}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
