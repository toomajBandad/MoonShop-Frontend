// components/Modal.jsx
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="relative w-full max-w-lg mx-4 sm:mx-0 bg-white rounded-xl shadow-xl p-6 animate-fade-in-scale overflow-y-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
}