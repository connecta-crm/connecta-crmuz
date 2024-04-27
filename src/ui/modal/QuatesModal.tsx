import { FormEvent } from 'react';
import Modal from './Modal'
export default function QuatesModal() {

  const onSubmit = (e:FormEvent) => {
    e.preventDefault();
    // e.target.reset()
  }

  return (
    <Modal title='New Quates' onSubmit={onSubmit}>
      <h1>
      New Quates
      </h1>
    </Modal>
  )
}
