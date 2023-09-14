import { useEffect, useState } from "react";
import { BiPlus, BiNote, BiArchive } from "react-icons/bi";
import getInitialData from "../utils/getInitialData";
import NoteCard from "./NoteCard";
import EmptyData from "./EmptyData";
import ModalDelete from "./modals/modalDelete";
import ModalData from "./modals/ModalData";

export const Content = ({ isArchivePage, keyword }) => {
    const [data, setData] = useState(getInitialData() || []);
    const [notes, setNotes] = useState([]);
    const [archive, setArchive] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [deleteId, setDeleteId] = useState();
    const [editId, setEditId] = useState();
    const [openModal, setOpenModal] = useState({
        modalData: false,
        modalDelete: false,
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setNotes(handleSortLatest(data.filter((d) => !d.archived)));
        setArchive(handleSortLatest(data.filter((d) => d.archived)));
    }, [data]);

    useEffect(() => {
        if (keyword) {
            const regex = new RegExp(keyword, "ig");

            let result;
            if (isArchivePage) {
                result = archive.filter((d) => d.title.match(regex));
            } else {
                result = notes.filter((d) => d.title.match(regex));
            }

            setSearchResult(handleSortLatest(result));
        }
    }, [keyword, archive, notes, isArchivePage]);

    const handleSortLatest = (arr) =>
        arr.sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);

            return +dateB - +dateA;
        });

    const handleArchive = (id) => {
        const index = data.findIndex((d) => d.id === id);
        data[index].archived = !data[index].archived;
        setData([...data]);
    };

    const handleDelete = () => {
        setData(data.filter(({ id }) => id !== deleteId));
        handleModal("modalDelete", false);
    };

    const handleModal = (modal, isOpen) => {
        setOpenModal({
            ...openModal,
            [modal]: isOpen,
        });
    };

    const handleAdd = ({ title, body }) => {
        const newNote = {
            id: +new Date(),
            title,
            body,
            archived: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        setData([...data, newNote]);
        handleModal("modalData", false);
    };

    const getDataById = (id) => {
        const index = data.findIndex((d) => d.id === id);
        return {
            title: data[index].title,
            body: data[index].body,
        };
    };

    const handleEdit = ({ title, body }) => {
        const index = data.findIndex((d) => d.id === editId);
        data[index].title = title;
        data[index].body = body;
        data[index].updatedAt = new Date();
        setData([...data]);
        handleModal("modalData", false);
    };

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
                        <button
                            className="inline-flex items-center gap-x-1 bg-green-500 px-3 py-2 rounded-md text-white shadow-md"
                            onClick={() => {
                                handleModal("modalData", true);
                                setIsEdit(false);
                            }}
                        >
                            <BiPlus className="text-xl" /> Add Note
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 items-start">
                    {!keyword ? (
                        isArchivePage ? (
                            archive.length > 0 ? (
                                archive.map((note) => (
                                    <NoteCard
                                        note={note}
                                        key={note.id}
                                        handleArchive={handleArchive}
                                        handleDelete={() => {
                                            handleModal("modalDelete", true);
                                            setDeleteId(note.id);
                                        }}
                                        handleEdit={() => {
                                            handleModal("modalData", true);
                                            setIsEdit(true);
                                            setEditId(note.id);
                                        }}
                                    />
                                ))
                            ) : (
                                <EmptyData text="Archive is Empty" />
                            )
                        ) : notes.length > 0 ? (
                            notes.map((note) => (
                                <NoteCard
                                    note={note}
                                    key={note.id}
                                    handleArchive={handleArchive}
                                    handleDelete={() => {
                                        handleModal("modalDelete", true);
                                        setDeleteId(note.id);
                                    }}
                                    handleEdit={() => {
                                        handleModal("modalData", true);
                                        setIsEdit(true);
                                        setEditId(note.id);
                                    }}
                                />
                            ))
                        ) : (
                            <EmptyData text="No Notes Yet" />
                        )
                    ) : searchResult.length > 0 ? (
                        searchResult.map((note) => (
                            <NoteCard
                                note={note}
                                key={note.id}
                                handleArchive={handleArchive}
                                handleDelete={() => {
                                    handleModal("modalDelete", true);
                                    setDeleteId(note.id);
                                }}
                                handleEdit={() => {
                                    handleModal("modalData", true);
                                    setIsEdit(true);
                                    setEditId(note.id);
                                }}
                            />
                        ))
                    ) : (
                        <EmptyData
                            text={`${
                                isArchivePage ? "Archive" : "Note"
                            } with title ${keyword} Not Found`}
                        />
                    )}
                </div>
                {openModal.modalDelete && (
                    <ModalDelete
                        handleClose={() => handleModal("modalDelete", false)}
                        handleDelete={handleDelete}
                    />
                )}
                {openModal.modalData && (
                    <ModalData
                        handleAdd={handleAdd}
                        isEdit={isEdit}
                        handleClose={() => handleModal("modalData", false)}
                        data={() => getDataById(editId)}
                        handleEdit={handleEdit}
                    />
                )}
            </div>
        </section>
    );
};
