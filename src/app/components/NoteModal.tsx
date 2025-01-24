import { createNote } from "@/api/notes";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";

interface NoteModalProps {
  handleCreateNote: (title: string, content: string) => void;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ handleCreateNote, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNewNote = async (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateNote(title, content);
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="bg-white p-4 min-w-[300px] rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Create Note</h1>
          <button onClick={onClose}>
            <MdOutlineCancel size={24} className="text-red-500" />
          </button>
        </div>
        <form onSubmit={handleCreateNewNote}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="content"
              id="content"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <label
              htmlFor="content"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Content
            </label>
          </div>

          <button className=" w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-sm py-2 px-3 rounded-lg text-white">
            + Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
