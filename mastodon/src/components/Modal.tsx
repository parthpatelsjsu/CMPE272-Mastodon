// Props interface for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

// A reusable modal component with translucent backdrop effect
// Used for confirmation dialogs that require user decision
export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    // Main backdrop with blur effect
    <div className="fixed inset-0 backdrop-blur-sm bg-white/40 flex items-center justify-center z-50">
      {/* Modal content container */}
      <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200/90 backdrop-blur-sm text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 cursor-pointer shadow-md"
            onClick={onClose}
          >
            No, Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-md hover:bg-red-600 transition duration-300 cursor-pointer shadow-md"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};
