import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import NoteDetail from "./NoteDetail";

interface NoteCardProps {
  note: any;
  handleDeleteNote: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, handleDeleteNote }) => {
  const [isNodeDetailsModalOpen, setIsNodeDetailsModalOpen] = useState(false);
  const [noteToOpen, setNoteToOpen] = useState();
  const handleDelete = (noteId: string) => {
    handleDeleteNote(noteId);
  };
  const openNote = (note: any) => {
    setIsNodeDetailsModalOpen(true);
    setNoteToOpen(note);
    console.log(note);
  };
  return (
    <div>
      <div
        className="p-4 border-2 border-[#d9d9d9] mb-3 rounded-lg shadow-md flex justify-between gap-2 items-center hover:scale-[98%] transition-all duration-200 cursor-pointer"
        onClick={() => openNote(note)}
      >
        <p className="max-w-[70%] truncate">{note.title}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(note._id);
          }}
        >
          <RiDeleteBin6Line size={20} className="hover:text-red-500" />
        </button>
      </div>
      {isNodeDetailsModalOpen && (
        <div className="absolute h-screen w-full bg-black/60 z-10 top-0 left-0">
          <NoteDetail
            note={noteToOpen}
            onClose={() => setIsNodeDetailsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default NoteCard;
