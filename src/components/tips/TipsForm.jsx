import { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import classes from "./TipsForm.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

function TipsForm({ id }) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    article: "",
    img: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    async function getTipsById() {
      try {
        const response = await axios.get(
          `http://178.128.103.166/api/tips/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData(response.data.data);
        setImagePreview(`http://178.128.103.166/${response.data.data.img}`);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
    if (id) {
      getTipsById();
    }
  }, []);

  function convertFormData(data) {
    const newData = new FormData();
    for (let key in data) {
      newData.append(key, data[key]);
    }
    return newData;
  }

  async function createTips(data) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://178.128.103.166/api/tips",
        data,
        config
      );
      console.log(response.data);
      alert("Create Tips Berhasil");
      navigate("/dashboard/tips");
    } catch (error) {
      console.error(error);
    }
  }

  async function editTips(data) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `http://178.128.103.166/api/tips/edit/${id}`,
        data,
        config
      );
      console.log(response.data);
      alert("Edit Tips Berhasil");
      navigate("/dashboard/tips");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTips() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://178.128.103.166/api/tips/edit/${id}`,
        config
      );
      console.log(response.data);
      alert("Delete Tips Berhasil");
      navigate("/dashboard/tips");
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageDrop(files) {
    setFormData({ ...formData, img: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formDataObj = convertFormData(formData);

    if (id) {
      // Update
      editTips(formDataObj);
    } else {
      // Create
      createTips(formDataObj);
    }
  }

  function handleDeleteTips() {
    // Delete
    deleteTips();
    navigate("/dashboard/tips");
  }

  if (!formData) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.formCard}>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="title">Tips Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="author">Tips Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="article">Tips Article</label>
          <textarea
            name="article"
            id="article"
            value={formData.article}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="image">Tips Thumbnail</label>
          <Dropzone
            onDrop={handleImageDrop}
            accept={{
              "image/jpeg": [".jpeg", ".png", ".jpg"],
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className={classes.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {imagePreview ? (
                  <img
                    className={classes.preview}
                    src={imagePreview}
                    alt="preview"
                  />
                ) : (
                  <p>Select a JPG file to upload, or drag and drop it here</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <div className={classes.submitGroup}>
          <button className={classes.submitBtn} type="submit">
            Submit
          </button>
          {id && (
            <button
              className={classes.deleteBtn}
              type="button"
              onClick={handleDeleteTips}
            >
              <IoTrash className={classes.removeIcon} size={16} />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TipsForm;
