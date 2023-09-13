import { useState } from "react";
import { BiX } from "react-icons/bi";

const ModalData = ({ handleAdd, handleClose }) => {
    const [value, setValue] = useState({
        title: "",
        body: "",
    });

    return (
        <div className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-md bg-black/30 grid place-items-center z-50">
            <article className="relative bg-white p-8 border border-slate-300 rounded-xl shadow-md min-w-[560px]">
                <button
                    className="absolute w-8 h-8 bg-red-500 text-white text-2xl rounded-full flex items-center justify-center right-5 top-5"
                    title="Close Modal"
                    aria-label="Close Modal"
                    onClick={handleClose}
                >
                    <BiX />
                </button>
                <h2 className="text-2xl font-semibold text-center">Add Note</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd(value);
                    }}
                >
                    <div className="my-6">
                        <div className="flex flex-col gap-y-2 mb-4">
                            <div className="flex justify-between items-center">
                                <label
                                    htmlFor="title"
                                    className="font-medium text-lg"
                                >
                                    Title
                                </label>
                                <p
                                    className={`text-sm ${
                                        value.title.length === 50
                                            ? "text-red-500"
                                            : "text-black"
                                    }`}
                                >
                                    Character : {50 - value.title.length}
                                </p>
                            </div>
                            <input
                                type="text"
                                placeholder="Note Title"
                                id="title"
                                className="border-2 border-slate-300 p-3 outline-green-500 shadow-sm rounded-md"
                                value={value.title}
                                onInput={(e) => {
                                    if (e.target.value.length <= 50) {
                                        setValue({
                                            ...value,
                                            [e.target.id]: e.target.value,
                                        });
                                    }
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label
                                htmlFor="body"
                                className="font-medium text-lg"
                            >
                                Note
                            </label>
                            <textarea
                                id="body"
                                cols="30"
                                rows="10"
                                placeholder="Write your note here..."
                                className="border-2 border-slate-300 p-3 outline-green-500 shadow-sm rounded-md"
                                value={value.note}
                                onInput={(e) =>
                                    setValue({
                                        ...value,
                                        [e.target.id]: e.target.value,
                                    })
                                }
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-green-500 text-white py-2 px-6 uppercase font-semibold text-xl rounded-md"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default ModalData;
