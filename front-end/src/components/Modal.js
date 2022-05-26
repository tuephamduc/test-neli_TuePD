import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, children }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className='modal' >
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='title'>Edit Task</h4>
          <button onClick={hide} className="btn">X</button>
        </div>
        <div className='modal-body'>
          {children}
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal