import { RiInboxUnarchiveLine } from "react-icons/ri";
import { BiArchive, BiTrash, BiEdit } from "react-icons/bi";
import showFormattedDate from "../utils/showFormattedDate";
import Button from "./Button";

const NoteCard = ({ note, handleArchive, handleDelete, handleEdit }) => {
    const { id, title, body, updatedAt, archived } = note;

    return (
        <article className="border border-slate-300 flex flex-col rounded-md shadow-md py-4 px-6">
            <h3 className="font-semibold text-xl text-green-500 break-words">
                {title}
            </h3>
            <span className="text-slate-500 text-sm">
                {showFormattedDate(updatedAt)}
            </span>
            <p className="border-t my-2 py-2 text-slate-600 leading-[1.6] break-words">
                {body}
            </p>
            <div className="mt-auto flex justify-center gap-x-3 text-xl">
                <Button
                    click={() => handleArchive(id)}
                    ttl={(archived ? "Un" : "") + "Archive Note"}
                    bg={"bg-emerald-500"}
                >
                    {!archived ? <BiArchive /> : <RiInboxUnarchiveLine />}
                </Button>
                <Button
                    click={handleEdit}
                    ttl={"Edit Note"}
                    bg={"bg-yellow-500"}
                >
                    <BiEdit />
                </Button>
                <Button
                    click={handleDelete}
                    ttl={"Delete Note"}
                    bg={"bg-red-500"}
                >
                    <BiTrash />
                </Button>
            </div>
        </article>
    );
};

export default NoteCard;
