import { memo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './modal.module.css';

const modalRoot = document.getElementById('modal-root');

function Modal({ close, children }) {
  const closeModal = useCallback (e => {
    if (e.code === 'Escape') {
      close();
      return;
    }
    if (e.target === e.currentTarget) {
      close();
    }
  }, [close]);

useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);




    return createPortal(
      <div className={s.overlay} onClick={closeModal}>
        <div className={s.modal}>{children}</div>
      </div>,
      modalRoot
    );

}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default memo(Modal);
