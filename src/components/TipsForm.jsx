import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { tipsCards } from "../../dummy_data/tips";
import styles from "../components/Loading.module.css";
import Dropzone from "react-dropzone";
import classes from "./TipsForm.module.css";

function TipsForm() {
  const { id } = useParams();

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

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    article: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageDrop = (files) => {
    setFormData({ ...formData, image: files[0] });
    setImagePreview(URL.createObjectURL(files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  // Sementara
  useEffect(() => {
    setFormData(tipsCards.find((tips) => tips.id === parseInt(id)));
  }, []);

  if (!formData) {
    return (
      <div className={styles.loadingCircleContainer}>
        <TailSpin
          height="80"
          width="80"
          color="#FF810D"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
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
        <button className={classes.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TipsForm;
