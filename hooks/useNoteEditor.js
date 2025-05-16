import { useState } from "react";

const localStorageSetter = (array = []) => {
  localStorage.setItem("noteArray", JSON.stringify(array));
};

export const useNoteEditor = (noteArray = []) => {
  const [localNoteArray, setLocalNoteArray] = useState(noteArray);

  const createNote = (newNoteData) => {
    const newArray = [...localNoteArray, newNoteData];

    setLocalNoteArray(newArray);
    localStorageSetter([...localNoteArray, newNoteData]);
  };

  const deleteNote = (_id) => {
    const newArray = localNoteArray.filter((note) => note._id !== _id);

    setLocalNoteArray(newArray);
    localStorageSetter(newArray);
  };

  const editNote = (noteData) => {
    const newArray = localNoteArray.filter((note) => note._id !== noteData._id);
    const editedArray = [...newArray, noteData];

    setLocalNoteArray(editedArray);
    localStorageSetter(editedArray);
  };

  return { noteArray: localNoteArray, editNote, deleteNote, createNote };
};
