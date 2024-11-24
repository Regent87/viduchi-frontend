'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalForm.module.css';
import CloseIcon from './close.svg';
import cn from 'classnames';
import { ModalProps } from './ModalForm.props';

export const Modal = ({ isOpen, onClose, title, children, className }: ModalProps): JSX.Element | null => {
  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modal = (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <CloseIcon />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};