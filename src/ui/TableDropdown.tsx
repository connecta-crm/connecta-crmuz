import { FormEvent, useState } from 'react';

function TableDropdown({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const getNodeValue = (e: FormEvent) => {
    e.preventDefault();
    console.log(value);
    setOpen(false);
  };

  return (
    <div className="table__node">
      <div className="table__node__data">
        <div className="table__node__create">
          <img
            src="./img/dt_table/nodeimg.png"
            alt=""
            onClick={() => setOpen(true)}
          />
          {open && (
            <div className="table__node__create-modal">
              <div className="table__node__content">
                <form onSubmit={getNodeValue}>
                  <textarea
                    required
                    onChange={(e) => setValue(e.target.value)}
                    cols={40}
                    rows={4}
                    className="table__node__textarea"
                  ></textarea>
                  <div className="table__node__footer">
                    <button
                      type="button"
                      className="table__node__info"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="table__node__primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="table__node__count">
          <span>{text}</span>
          {text == '0' ? (
            ''
          ) : (
            <div className="table__node__modal">
              <div className="table__node__content">
                <div className="node__date">01/21/2024 09:01 AM Ali Brian</div>
                <p className="node__description">
                  Customer wants to talk to customer
                </p>
              </div>
              <div className="table__node__content">
                <div className="node__date">01/21/2024 09:01 AM Ali Brian</div>
                <p className="node__description">
                  Customer wants to talk to customer
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default TableDropdown;
