import { useEffect, useState } from 'react';
import ParsingModal from '../../ui/modal/ParsingModal';
import ParsingTable from './ParsingTable';
import { useParsing } from './useParsing';
export type ParsingType = {
  value: string;
  id: string;
  parsing: string;
  group: string;
};
export default function Parsing() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<ParsingType | null>(null);

  const { parsings, isLoading } = useParsing(true);

  useEffect(() => {
    if (editId) {
      setOpenModal(true);
    }
  }, [editId]);

  return (
    <>
      <div className="parsing">
        <ParsingTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={parsings}
          isLoading={isLoading}
          count={parsings?.length}
        />
        <ParsingModal
          setEditId={setEditId}
          parsing={editId}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
