// Notes.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Note.module.css";

import {
  FiSearch,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";

import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsPinAngleFill } from "react-icons/bs";

function Notes() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editPopup, setEditPopup] = useState(false);
  const [editId, setEditId] = useState("");
  const [totalNotes, setTotalNotes] = useState(0);
  const [messagePinned, setMessagePinned] = useState([]);

  const API = "http://localhost:3001/api";



  // GET NOTES
  const getNotes = async () => {

    const res = await axios.get(
      `${API}/note`
    );

    setNotes(res.data);
  };


  useEffect(() => {
    getNotes();
  }, []);




  // ADD NOTE
  const addNote = async () => {

    if (!title || !content) {
      alert("Title and Content required");
      return;
    }

    setLoading(true);

    await axios.post(
      `${API}/notes`,
      {
        title,
        content,
      }
    );

    setTimeout(() => {

      setLoading(false);

      setTitle("");
      setContent("");

      setShowModal(false);

      getNotes("");

    }, 1000);
  };




  // DELETE NOTE
  const confirmDelete = async () => {

    await axios.delete(
      `${API}/note/${deleteId}`
    );

    setDeletePopup(false);

    getNotes();
  };




  // UPDATE NOTE
  const updateNote = async () => {

    setLoading(true);

    await axios.put(
      `${API}/note/${editId}`,
      {
        title,
        content,
      }
    );

    setTimeout(() => {

      setLoading(false);

      setEditPopup(false);

      setTitle("");
      setContent("");

      getNotes();

    }, 1000);
  };




  // SEARCH
  const searchNotes = (e) => {

    const value = e.target.value;

    setSearch(value);

    const filtered = notes.filter(
      (note) =>
        note.title
          .toLowerCase()
          .includes(
            value.toLowerCase()
          )
    );

    if (value === "") {
      getNotes();
    } else {
      setNotes(filtered);
    }
  };


  const pinNote = async (id) => {

    await axios.put(`${API}/pin/${id}`);

    setMessagePinned((prev) => {


      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }


      return [...prev, id];
    });

    getNotes();
  };

  // COUNTS
  const pinnedCount = notes.filter(
    (note) => note.pinned
  ).length;

  // PIN








  return (

    <div className={styles.container}>


      {/* NAVBAR */}
      <nav className={styles.navbar}>

        <div className={styles.logo}>

          <div className={styles.logoIcon}>
            <HiOutlinePencilAlt />
          </div>

          <h2>Inkwell</h2>

        </div>


        <div className={styles.navRight}>

          <div className={styles.searchBox}>

            <FiSearch
              className={styles.searchIcon}
            />

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={searchNotes}
            />

          </div>


          <button
            className={styles.newBtn}
            onClick={() =>
              setShowModal(true)
            }
          >
            <FiPlus />
            New note
          </button>

        </div>

      </nav>




      {/* HERO */}
      <section className={styles.hero}>

        <h1>
          A calmer place
          <span>
            for your thoughts.
          </span>
        </h1>

        <p>
          Capture ideas, draft on the fly,
          and find anything in a beat.
        </p>

      </section>




      {/* EMPTY */}
      {notes.length === 0 && (

        <section className={styles.emptyBox}>

          <div className={styles.emptyIcon}>
            <HiOutlinePencilAlt />
          </div>

          <h2>
            Your notebook is empty
          </h2>

          <p>
            Capture your first thought.
          </p>

          <button
            className={styles.createBtn}
            onClick={() =>
              setShowModal(true)
            }
          >
            <FiPlus />
            Create a note
          </button>

        </section>

      )}




      {/* NOTES */}
      <div className={styles.notesGrid}>

        {notes.map((note) => (

          <div
            className={styles.card}
            key={note._id}
          >

            <div
            >

              <div
                className={styles.cardTop}
              >

                <h3>{note.title}</h3>

                {/* <div className={styles.pinnedFlex}>
                  {messagePinned === note._id && (
                    <p style={{color:"#5B2C1F"}}>Pinned</p>
                  )}

                  <BsPinAngleFill
                    className={`${styles.pin} ${note.pinned
                        ? styles.activePin
                        : ""
                      }`}
                    onClick={() =>
                      pinNote(note._id)
                    }
                  />
                </div> */}

                <div className={styles.pinnedFlex}>

                  <span
                    className={`${styles.pinText} ${messagePinned.includes(note._id)
                      ? styles.showPinText
                      : ""
                      }`}
                  >
                    Pinned
                  </span>

                  <BsPinAngleFill
                    className={`${styles.pin} ${note.pinned
                        ? styles.activePin
                        : ""
                      }`}
                    onClick={() => pinNote(note._id)}
                  />
                </div>

              </div>

              <p>{note.content}</p>

              <small>
                {new Date(
                  note.createdAt
                ).toLocaleString()}
              </small>

            </div>

            <div className={styles.buttonFlex}>
              <button
                className={
                  styles.deleteBtn
                }
                onClick={() => {

                  setEditPopup(true);
                  setEditId(note._id);
                  setTitle(note.title);
                  setContent(note.content);

                }}
              >
                Updated
              </button>




              <button
                className={
                  styles.deleteBtn
                }
                onClick={() => {

                  setDeletePopup(true);

                  setDeleteId(note._id);

                }}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>

        ))}

      </div>






      {/* CREATE MODAL */}
      {showModal && (

        <div
          className={
            styles.modalOverlay
          }
        >

          <div className={styles.modal}>

            <h2>Create Note</h2>

            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Enter content"
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />

            <button
              onClick={addNote}
            >

              {loading ? (
                <div
                  className={
                    styles.loader
                  }
                ></div>
              ) : (
                "Create Note"
              )}

            </button>


            <button
              className={
                styles.closeBtn
              }
              onClick={() =>
                setShowModal(false)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* UPDATE MODAL */}
      {editPopup && (

        <div
          className={
            styles.modalOverlay
          }
        >

          <div className={styles.modal}>

            <h2>Update Note</h2>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
            />

            <button
              onClick={updateNote}
            >

              {loading ? (
                <div
                  className={
                    styles.loader
                  }
                ></div>
              ) : (
                "Update Note"
              )}

            </button>


            <button
              className={
                styles.closeBtn
              }
              onClick={() =>
                setEditPopup(false)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* DELETE POPUP */}
      {deletePopup && (

        <div
          className={
            styles.modalOverlay
          }
        >

          <div
            className={
              styles.deleteModal
            }
          >

            <h2>
              Are you sure?
            </h2>

            <p>
              Do you want to delete
              this note?
            </p>

            <div
              className={
                styles.deleteActions
              }
            >

              <button
                className={
                  styles.yesBtn
                }
                onClick={
                  confirmDelete
                }
              >
                Yes
              </button>

              <button
                className={
                  styles.noBtn
                }
                onClick={() =>
                  setDeletePopup(
                    false
                  )
                }
              >
                No
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Notes;