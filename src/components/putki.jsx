import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

const NoteApp = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const addNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const noteToAdd = {
        ...newNote,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-GB"),
      };
      setNotes([...notes, noteToAdd]);
      setNewNote({ title: "", content: "" });
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <div className="flex flex-wrap gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}

        {/* Add New Note Card */}
        <div className="bg-teal-400 p-4 rounded-lg w-64 h-56 flex flex-col justify-between shadow-lg">
          <input
            name="title"
            value={newNote.title}
            onChange={handleChange}
            placeholder="Title"
            className="bg-transparent outline-none text-white font-bold placeholder:text-white"
          />
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleChange}
            placeholder="Write your note..."
            className="bg-transparent resize-none h-full text-white outline-none placeholder:text-white mt-2"
          />
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">
              {200 - newNote.content.length} Remaining
            </span>
            <button
              onClick={addNote}
              className="bg-white text-teal-600 px-3 py-1 rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
