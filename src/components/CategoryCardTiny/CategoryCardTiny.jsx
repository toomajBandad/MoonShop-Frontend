import { FaTrash, FaEdit } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";

export default function CategoryCardTiny({ category, onRemove, onEdit }) {
  const hasImage = Boolean(category?.image);

  return (
    <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 p-2 max-w-md">
      <div className="flex items-center gap-3 w-full">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
          {hasImage ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <CiImageOff className="text-gray-400 text-4xl" />
          )}
        </div>

        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            {category.name}
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div>
              <strong>Desc:</strong> {category.desc}
            </div>
            <div>
              <strong>Parent:</strong> {category.parentId?.name}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 flex gap-1 text-sm">
            {onEdit && (
              <button
                className=" bg-gray-100 text-gray-700 p-1.5 rounded-full hover:bg-gray-200 hover:cursor-pointer transition"
                onClick={() => onEdit(category)}
              >
                <FaEdit />
              </button>
            )}
            {onRemove && (
              <button
                className=" bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200 hover:cursor-pointer transition"
                onClick={() => onRemove(category)}
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
