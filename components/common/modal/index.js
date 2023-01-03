import { createPortal } from "react-dom";
//import usePortal from "../../../hooks/usePortal";
import usePortal from "../../hooks/usePortal";

const Modal = ({ id, children }) => {
  const target = usePortal(id);

  return createPortal(children, target);
};

export default Modal;
