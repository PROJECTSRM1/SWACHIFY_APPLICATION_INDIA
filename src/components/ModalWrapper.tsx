import type { ReactNode } from "react";


import { Modal } from "antd";


interface ModalWrapperProps {
children: ReactNode;
onClose?: () => void;
}


const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
return (
<Modal
open
centered
footer={null}
onCancel={onClose}
width="70vw"
style={{ top: 20 }}
getContainer={false}
destroyOnClose
>
{children}
</Modal>
);
};


export default ModalWrapper;