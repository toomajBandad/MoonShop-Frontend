import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import TagTinyCard from "../components/TagTinyCard/TagTinyCard";
import AddTagForm from "../components/AddTagForm/AddTagForm";
import EditTagForm from "../components/EditTagForm/EditTagForm";

export default function AdminEditTags() {
  const appUrl = import.meta.env.VITE_BACKEND_URL;

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditTagForm, setShowEditTagForm] = useState(false);
  const [showCreateTagForm, setShowCreateTagForm] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const refreshTags = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${appUrl}/tag`);
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching Tags:", error);
    } finally {
      setLoading(false);
    }
  };

  function editTagInfos(tag) {
    setSelectedTag(tag);
    setShowEditTagForm(true);
  }

  function deleteTag(tag) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete "${tag.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${appUrl}/tag/${tag._id}`);
          Swal.fire("Deleted!", "Tag has been deleted.", "success");
          refreshTags();
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete Tag.", "error");
        }
      }
    });
  }

  function handleCreateTag() {
    setShowCreateTagForm(true);
  }

  useEffect(() => {
    refreshTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-5 md:p-10">
      {showCreateTagForm ? (
        <AddTagForm
          setShowCreateTagForm={setShowCreateTagForm}
          onTagAdded={() => {
            setShowCreateTagForm(false);
            refreshTags();
            toast.success("Tag Created Successfully!");
          }}
        />
      ) : showEditTagForm && selectedTag ? (
        <EditTagForm
          tag={selectedTag}
          setShowEditTagForm={setShowEditTagForm}
          onTagUpdated={() => {
            setShowEditTagForm(false);
            setSelectedTag(null);
            refreshTags();
            toast.success("Tag updated successfully!");
          }}
        />
      ) : (
        <>
          <button
            onClick={handleCreateTag}
            className="mb-5 px-4 py-2 bg-red-500 shadow-sm text-white rounded hover:bg-red-600 transition hover:shadow-lg"
          >
            Create New Tag
          </button>

          {loading ? (
            <p className="text-gray-600">Loading Tags...</p>
          ) : tags.length === 0 ? (
            <p className="text-gray-500">No Tags available.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {tags.map((tag) => (
                <TagTinyCard
                  key={tag._id}
                  tag={tag}
                  onRemove={deleteTag}
                  onEdit={editTagInfos}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}