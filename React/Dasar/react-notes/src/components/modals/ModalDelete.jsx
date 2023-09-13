const ModalDelete = ({ handleClose, handleDelete }) => {
    return (
        <div className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-md bg-black/30 grid place-items-center">
            <article className="bg-white p-10 border border-slate-300 rounded-xl shadow-md text-center">
                <h2 className="text-xl mb-8">
                    Are you sure delete this note ?
                </h2>
                <div className="inline-flex gap-x-4">
                    <button
                        className="border-slate-300 border-2 py-2 px-4 rounded-md"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </article>
        </div>
    );
};

export default ModalDelete;
