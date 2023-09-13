import { useState } from "react";
import { BiPlus, BiNote } from "react-icons/bi";
import getInitialData from "../utils/getInitialData";
import NoteCard from "./NoteCard";

export const Content = () => {
    const [notes, setNotes] = useState(getInitialData() || []);

    return (
        <section className="py-8">
            <div className="container">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-3xl inline-flex items-center gap-x-1">
                        My Notes
                        <BiNote />
                    </h2>
                    <button className="inline-flex items-center gap-x-1 bg-green-500 px-3 py-2 rounded-md text-white shadow-md">
                        <BiPlus className="text-xl" /> Add Note
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 items-start">
                    {notes.map((note) => (
                        <NoteCard note={note} key={note.id} />
                    ))}
                </div>
            </div>
        </section>
    );
};
