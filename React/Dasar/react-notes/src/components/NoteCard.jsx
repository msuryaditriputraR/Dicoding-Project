/* eslint-disable react/prop-types */
import { BiArchive, BiTrash, BiEdit } from "react-icons/bi";
import showFormattedDate from "../utils/showFormattedDate";

const NoteCard = ({ note }) => {
    const { title, body, createdAt } = note;

    return (
        <article className="border border-slate-300 flex flex-col rounded-md shadow-md py-4 px-6">
            <h3 className="font-semibold text-xl text-green-500">{title}</h3>
            <span className="text-slate-500 text-sm">
                {showFormattedDate(createdAt)}
            </span>
            <p className="border-t my-2 py-2 text-slate-600 leading-[1.6]">
                {body}
            </p>
            <div className="mt-auto flex justify-center gap-x-3 text-xl">
                <button
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-emerald-500 shadow-md"
                    aria-label="Archive Note"
                    title="Archive Note"
                >
                    <BiArchive />
                </button>
                <button
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-yellow-500 shadow-md"
                    aria-label="Edit Note"
                    title="Edit Note"
                >
                    <BiEdit />
                </button>
                <button
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-white bg-red-500 shadow-md"
                    aria-label="Delete Note"
                    title="Delete Note"
                >
                    <BiTrash />
                </button>
            </div>
        </article>
    );
};

export default NoteCard;
