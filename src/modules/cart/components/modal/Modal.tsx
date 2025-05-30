import { Button } from "antd";
import { X } from "lucide-react";
import React, { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

interface ModalProps {
	closeModal: () => void;
	children?: ReactNode;
}

export const Modal = ({ closeModal, children }: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		window.document.body.classList.add("no-scroll");
	}, []);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(closeModal, 500);
		window.document.body.classList.remove("no-scroll");
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	return createPortal(
		<div className={styles.overlay} onClick={handleOverlayClick}>
			<div
				className={`${styles.modal} ${isClosing ? styles.closing : ""}`}
			>
				<div className={styles.modalCart}>
					<h2>Cart</h2>
					<Button
						onClick={handleClose}
						type="text"
						className={styles.closeButton}
					>
						<X />
					</Button>
				</div>
				{children}
			</div>
		</div>,
		document.body,
	);
};
