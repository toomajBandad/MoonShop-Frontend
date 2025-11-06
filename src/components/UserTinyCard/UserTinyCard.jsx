import { FaTrash, FaEdit } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";

export default function UserTinyCard({ user, onRemove, onEdit }) {
  const hasImage = Boolean(user?.image);

  return (
    <div className="flex items-center border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 p-2 max-w-md">
      <div className="flex items-center gap-3 w-full">
        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
          {hasImage ? (
            <img
              src={user.image}
              alt={user.username}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <CiImageOff className="text-gray-400 text-4xl" />
          )}
        </div>

        <div className="flex-grow space-y-1 text-sm relative">
          <h2 className="text-base font-semibold text-gray-800">
            {user.username}
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 flex gap-1 text-sm">
            {onEdit && (
              <button
                className=" bg-gray-100 text-gray-700 p-1.5 rounded-full hover:bg-gray-200 hover:cursor-pointer transition"
                onClick={() => onEdit(user)}
              >
                <FaEdit />
              </button>
            )}
            {onRemove && (
              <button
                className=" bg-red-100 text-red-700 p-1.5 rounded-full hover:bg-red-200 hover:cursor-pointer transition"
                onClick={() => onRemove(user)}
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
