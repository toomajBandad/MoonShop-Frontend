import { FaTrash, FaEdit } from "react-icons/fa";

export default function TagTinyCard({ tag, onRemove, onEdit }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 p-2 max-w-md">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            {tag.name}
          </h2>

          <div className="absolute bottom-0 right-0 flex gap-1 text-sm">
            {onEdit && (
              <button
                className=" bg-gray-100 text-gray-700 p-1.5 rounded-full hover:bg-gray-200 hover:cursor-pointer transition"
                onClick={() => onEdit(tag)}
              >
                <FaEdit />
              </button>
            )}
            {onRemove && (
              <button
                className=" bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200 hover:cursor-pointer transition"
                onClick={() => onRemove(tag)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
