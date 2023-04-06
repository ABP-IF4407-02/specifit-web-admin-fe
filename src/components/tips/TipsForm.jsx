import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import classes from "./TipsForm.module.css";
import { tipsCards } from "../../../dummy_data/tips";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { IoTrash } from "react-icons/io5"

function TipsForm({ id }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    article: "",
    image: null,
  });

  // Sementara
  useEffect(() => {
    if (id) {
      setFormData(tipsCards.find((tips) => tips.id === parseInt(id)));
    }
  }, []);

  /*
    useEffect(() => {
      async function fetchTipsData() {
        try {
          const response = await fetch(`/api/tips/${id}`);
          const data = await response.json();
          setTipsData(data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchTipsData();
    }, [id]);
    */

  const [imagePreview, setImagePreview] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleImageDrop(files) {
    setFormData({ ...formData, image: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    if (id) {
      // Update
    } else {
      // Create
    }
  }

  function handleDeleteTips() {
    // Delete

    // Navigate to home
    navigate("/dashboard");
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
          {id && <button
            className={classes.deleteBtn}
            type="button"
            onClick={handleDeleteTips}
          >
            <IoTrash className={classes.removeIcon} size={16} />
            Delete
          </button>}
        </div>
      </form>
    </div>
  );
}

export default TipsForm;
