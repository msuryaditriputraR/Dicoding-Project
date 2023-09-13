import { useState } from "react";
import { BiPlus, BiNote, BiArchive } from "react-icons/bi";
import getInitialData from "../utils/getInitialData";
import NoteCard from "./NoteCard";
import EmptyData from "./EmptyData";

export const Content = ({ isArchivePage }) => {
    const [notes, setNotes] = useState(getInitialData() || []);
    const [archive, setArchive] = useState([]);

    return (
        <section className="py-8">
            <div className="container">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-3xl inline-flex items-center gap-x-1">
                        {!isArchivePage ? (
                            <>
                                My Notes
                                <BiNote />
                            </>
                        ) : (
                            <>
                                My Archive
                                <BiArchive />
                            </>
                        )}
                    </h2>

                    {!isArchivePage && (
                        <button className="inline-flex items-center gap-x-1 bg-green-500 px-3 py-2 rounded-md text-white shadow-md">
                            <BiPlus className="text-xl" /> Add Note
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 items-start">
                    {isArchivePage ? (
                        archive.length > 0 ? (
                            archive.map((note) => {
                                <NoteCard note={note} key={note.id} />;
                            })
                        ) : (
                            <EmptyData text="Archive is Empty" />
                        )
                    ) : notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteCard note={note} key={note.id} />
                        ))
                    ) : (
                        <EmptyData text="No Notes Yet" />
                    )}
                </div>
            </div>
        </section>
    );
};
