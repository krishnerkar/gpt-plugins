import { ReactNode } from "react";

interface PluginModalLayoutProps {
  children: ReactNode;
  onClose: () => void;
}

const PluginModalLayout: React.FC<PluginModalLayoutProps> = ({
  children,
  onClose,
}) => {
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default PluginModalLayout;
