import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { IoSearch } from "react-icons/io5";

const Noteapp = () => {
  const [notes, setNote] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : []
  );
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleInputTitle = (event) => {
    setNewNote({ ...newNote, title: event.target.value });
  };
  const handleInputContent = (event) => {
    setNewNote({ ...newNote, content: event.target.value });
  };
  const addNote = () => {
    if (newNote.title.trim() !== "" || newNote.content.trim() !== "") {
      const noteToadd = {
        ...newNote,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-GB"),
      };
      setNote((n) => [...n, noteToadd]);
      setNewNote({ title: "", content: "" });
    }
  };
  const deleteNote = (id) => {
    setNote(notes.filter((note) => note.id !== id));
  };
  const handleUpdateNote = (updatedNote, id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note
    );
    setNote(updatedNotes);
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  return (
    <div className="min-h-screen dark:bg-black text-black dark:text-white p-6 px-15">
      <div className="flex justify-between mb-2">
        <h1 className="text-3xl font-bold mb-2">Notes</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white cursor-pointer hover:bg-gray-400 transition delay-150 duration-300 ease-in-out"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="relative w-ful mb-4">
        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <IoSearch size={20} />
        </span>
        <input
          id="search-bar"
          type="t
          ext"
          placeholder="Type of Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full outline-none focus:ring-orange-500 transition "
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div
          id="input-field"
          className="bg-teal-400 p-4 rounded-lg w-85 h-56 flex flex-col justify-between shadow-lg"
        >
          <input
            value={newNote.title}
            type="text"
            onChange={handleInputTitle}
            placeholder="Title"
            className="bg-transparent outline-none text-white font-bold placeholder:text-white"
          />
          <textarea
            className="bg-transparent resize-none h-full text-white outline-none placeholder:text-white mt-2"
            placeholder="Write your note..."
            value={newNote.content}
            onChange={handleInputContent}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
          />
          <div className="flex justify-between items-center ">
            <span className="text-white text-sm">
              {200 - newNote.content.length} Remaining
            </span>
            <button
              className="bg-white text-teal-600 px-3 py-1 rounded text-sm"
              onClick={addNote}
            >
              Save
            </button>
          </div>
        </div>
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              note.content.toLowerCase().includes(searchTerm.toLowerCase())
          )

          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              handleUpdateNote={handleUpdateNote}
            />
          ))}
      </div>
    </div>
  );
};

export default Noteapp;
