import { useState } from "react";

const ModalData = () => {
    const [value, setValue] = useState({
        title: "",
        note: "",
    });

    return (
        <div className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-md bg-black/30 grid place-items-center z-50">
            <article className="bg-white p-8 border border-slate-300 rounded-xl shadow-md min-w-[560px]">
                <h2 className="text-2xl font-semibold text-center">Add Note</h2>
                <form>
                    <div className="my-6">
                        <div className="flex flex-col gap-y-2 mb-4">
                            <label
                                htmlFor="title"
                                className="font-medium text-lg"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Note Title"
                                id="title"
                                className="border-2 border-slate-300 p-3 outline-green-500 shadow-sm rounded-md"
                                value={value.title}
                                onInput={(e) => {
                                    setValue({
                                        ...value,
                                        [e.target.id]: e.target.value,
                                    });
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label
                                htmlFor="note"
                                className="font-medium text-lg"
                            >
                                Note
                            </label>
                            <textarea
                                id="note"
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
