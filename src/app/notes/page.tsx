"use client";
import { createNote, deleteNote, fetchNotes } from "@/api/notes";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoSignOut } from "react-icons/go";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

interface IUser {
  userId: string;
  userName: string;
  userEmail: string;
}

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | undefined>();
  const [notes, setNotes] = useState([]);
  const [isNoteModalOpen, setNodeModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: IUser = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Unauthorized: ", error);
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const handleSignOut = () => {
    setUser(undefined);
    router.push("/login");
    toast.success("Sign Out Successful!", { position: "top-right" });
    localStorage.removeItem("token");
  };

  const loadNotes = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    const data = await fetchNotes(token!);
    setNotes(data.notes);
  };

  const handleCreateNote = async (title: string, content: string) => {
    if (!user) return;
    const token = localStorage.getItem("token");
    await createNote(token!, title, content);
    toast.success("Note Created Successfully!", { position: "top-right" });
    loadNotes();
  };
  
  const handleDeleteNote = async (noteId: string) => {
    const token = localStorage.getItem("token");
    await deleteNote(token!, noteId);
    toast.success("Note Deleted Successfully!", { position: "top-right" });
    loadNotes(); // Refresh Notes List
  };

  const handleNoteModalOpen = () => {
    setNodeModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="max-w-4xl mx-auto my-8 flex px-4 max-sm:px-6 justify-between items-center">
        <div className="flex gap-3 max-lg:justify-center">
          <img src="/HD.svg" alt="HD icon" className="w-7" />
          <p className="text-xl font-semibold">Dashboard</p>
        </div>

        <button
          className="flex items-center gap-2 text-blue-600 font-semibold underline underline-offset-2 text-sm"
          onClick={handleSignOut}
        >
          <GoSignOut size={16} />
          Sign Out
        </button>
      </div>

      {/* Welcome */}
      <div className="max-w-4xl mx-auto my-8 px-4 max-sm:px-6">
        <div className="border-2 border-[#d9d9d9] px-6 max-sm:px-4 py-6 bg-white shadow-md rounded-lg flex flex-col gap-1.5 ">
          <h1 className="text-2xl max-sm:text-xl font-semibold ">
            Welcome, {user?.userName}!
          </h1>
          <p className="font-light text-sm">Email: {user?.userEmail}</p>
        </div>
      </div>

      {/* Notes Section  */}
      <div className="max-w-4xl mx-auto my-8 px-4 max-sm:px-6">
        <button
          className="w-full bg-blue-500 text-white py-4 rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition-transform duration-100"
          onClick={handleNoteModalOpen}
        >
          Create Note
        </button>
        <h2 className="mt-6 mb-4 text-xl">Notes</h2>
        {notes?.length === 0 ? (
          <p className="font-light">No notes found</p>
        ) : (
          notes?.map((note: any) => (
            <NoteCard
              key={note._id}
              note={note}
              handleDeleteNote={handleDeleteNote}
            />
          ))
        )}
      </div>

      {isNoteModalOpen && (
        <div className="absolute h-screen w-full bg-black/60 z-10 top-0">
          <NoteModal
            onClose={() => setNodeModalOpen(false)}
            handleCreateNote={handleCreateNote}
          />
        </div>
      )}
    </div>
  );
};

export default page;
