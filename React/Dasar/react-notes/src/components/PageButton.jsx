import { BiArchive, BiNote } from "react-icons/bi";

const PageButton = ({ handleSwitchPage, isArchivePage }) => {
    return (
        <button
            className="inline-flex items-center gap-x-1 border shadow-sm cursor-pointer hover:text-green-500 rounded-md px-3 py-2 hover:border-green-500"
            onClick={handleSwitchPage}
        >
            {!isArchivePage ? (
                <>
                    <BiArchive />
                    Archive
                </>
            ) : (
                <>
                    <BiNote />
                    Notes
                </>
            )}
        </button>
    );
};

export default PageButton;
