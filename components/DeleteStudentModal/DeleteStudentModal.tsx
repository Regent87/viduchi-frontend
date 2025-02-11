"use client";

import { DeleteStudentModalProps } from "./DeleteStudentModal.props";
import styles from './DeleteStudentModal.module.css';
import { Modal } from "../site/ModalForm/ModalForm";
import { deleteStudent } from "@/api/client/students";
import { Button } from "../Button/Button";

export const DeleteStudentModal = ({ isOpen, onClose, id }: DeleteStudentModalProps) => {
    const handleDelete = async () => {
        await deleteStudent(Number(id));
        onClose();
    }

    return (
        <Modal
            className={styles.white}
            isOpen={isOpen}
            onClose={onClose}
            title="+ Точно удалить ученика?" >
            <form>
                <div className={styles.buttons}>
                    <Button
                        onClick={() => onClose()}
                        className={styles.apply}
                        appearance="ghost">
                            Нет
                    </Button>
                    <Button
                        onClick={() => handleDelete()}
                        className={styles.reset}
                        appearance="primary">
                            Да
                    </Button>
                </div>
            </form>

        </Modal>
    )
}
