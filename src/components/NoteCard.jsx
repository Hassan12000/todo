import React, { useEffect, useState, useRef } from "react";
import { FiEdit } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const NoteCard = ({ note, deleteNote, handleUpdateNote }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isContentOpen, setContentOpen] = useState(false);
  const [isShiftHold, setIsShiftHold] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });
  const inputRef = useRef(null);
  const handleEditNote = () => {
    if (isEditable) {
      handleUpdateNote(editedNote, note.id);
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  };
  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
    }
  }, [isEditable]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`bg-yellow-300 p-4 rounded-lg w-85 ${
        !isMobile && "h-56"
      } flex flex-col justify-between shadow-lg`}
    >
      {isEditable ? (
        <>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent font-bold text-lg text-black outline-none"
            value={editedNote.title}
            onChange={(e) => {
              setEditedNote({ ...editedNote, title: e.target.value });
            }}
          />
          <textarea
            value={editedNote.content}
            className="bg-transparent resize-none h-full text-black outline-none placeholder:text-white mt-2"
            onChange={(e) => {
              setEditedNote({ ...editedNote, content: e.target.value });
            }}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter" && !isShiftHold) {
                handleEditNote();
              }

              if (e.key === "Shift") setIsShiftHold(true);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !isShiftHold) {
                setEditedNote({ title: "", content: "" });
              }
              if (e.key === "Shift") setIsShiftHold(false);
            }}
          />
        </>
      ) : (
        <>
          <div>
            <div className="flex justify-between gap-4">
              <h2 className="text-lg font-bold text-black truncate">
                {note.title.length > 0
                  ? note.title
                  : note.content.split(" ")[0]}
              </h2>
              {isMobile && (
                <button
                  className="text-black"
                  onClick={() => setContentOpen((prev) => !prev)}
                >
                  {isContentOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              )}
            </div>
            {isMobile ? (
              isContentOpen && (
                <p className="text-black mt-1 whitespace-pre-wrap min-h-40">
                  {note.content}
                </p>
              )
            ) : (
              <p className="text-black mt-1 whitespace-pre-wrap min-h-40">
                {note.content}
              </p>
            )}
          </div>
        </>
      )}
      <div className="flex justify-between items-center text-sm text-black mt-2">
        <span>{note.date}</span>

        {isContentOpen && (
          <div className="flex items-center space-x-2">
            <button onClick={handleEditNote}>
              {isEditable ? (
                <LuSave size={20} className="text-gray-500 cursor-pointer" />
              ) : (
                <FiEdit size={20} className="text-gray-500 cursor-pointer" />
              )}
            </button>

            <button
              onClick={() => deleteNote(note.id)}
              className="text-sm text-black hover:text-red-600 cursor-pointer"
            >
              <FaDeleteLeft size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
