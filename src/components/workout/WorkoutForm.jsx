import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import classes from "./WorkoutForm.module.css";
import { workoutCards } from "../../../dummy_data/workout";
import { IoTrash, IoAddCircle } from "react-icons/io5";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function WorkoutForm({ id }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ctgList: [],
    desc: "",
    est: "",
    img: null,
    title: "",
    totalEst: "",
    vid: "",
    workoutEsts: [],
    workoutLists: [],
  });

  // Sementara
  useEffect(() => {
    if (id) {
      setFormData(workoutCards.find((workout) => workout.id === parseInt(id)));
    }
  }, []);

  const [imagePreview, setImagePreview] = useState("");

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
    console.log(formData);

    if (id) {
      // Update
    } else {
      // Create
    }
  }

  function handleAddForm() {
    setFormData({
      ...formData,
      workoutLists: [...formData.workoutLists, ""],
      ctgList: [...formData.ctgList, ""],
      workoutEsts: [...formData.workoutEsts, ""],
    });
  }

  function handleRemoveForm(index) {
    const workoutLists = [...formData.workoutLists];
    const ctgList = [...formData.ctgList];
    const workoutEsts = [...formData.workoutEsts];

    workoutLists.splice(index, 1);
    ctgList.splice(index, 1);
    workoutEsts.splice(index, 1);

    setFormData({
      ...formData,
      workoutLists,
      ctgList,
      workoutEsts,
    });
  }

  function handleWorkoutInputChange(event, index) {
    const newWorkoutLists = [...formData.workoutLists];
    newWorkoutLists[index] = event.target.value;
    setFormData({ ...formData, workoutLists: newWorkoutLists });
  }

  function handleCategoryInputChange(event, index) {
    const newCtgList = [...formData.ctgList];
    newCtgList[index] = event.target.value;
    setFormData({ ...formData, ctgList: newCtgList });
  }

  function handleEstimateInputChange(event, index) {
    const newEstimateList = [...formData.workoutEsts];
    newEstimateList[index] = event.target.value;
    setFormData({ ...formData, workoutEsts: newEstimateList });
  }

  function handleDeleteWorkout() {
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
          <label htmlFor="title">Judul</label>
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
          <label htmlFor="desc">Deskripsi</label>
          <textarea
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Dynamic form */}
        {formData.workoutLists.map((workout, index) => (
          <div key={index} className={classes.addForm}>
            <div className={classes.formGroup}>
              <label htmlFor={`workout${index + 1}`}>
                List Olahraga {index + 1}
              </label>
              <input
                type="text"
                name={`workout${index + 1}`}
                id={`workout${index + 1}`}
                value={workout}
                onChange={(event) => handleWorkoutInputChange(event, index)}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor={`category${index + 1}`}>
                Kategori Olahraga {index + 1}
              </label>
              <select
                name={`category${index + 1}`}
                id={`category${index + 1}`}
                value={formData.ctgList[index] || ""}
                onChange={(event) => handleCategoryInputChange(event, index)}
                required
              >
                <option value="">--Pilih Kategori--</option>
                <option value="> 10 menit">{`> 10 menit`}</option>
                <option value="Cardio">Cardio</option>
                <option value="Fat Burn">Fat Burn</option>
              </select>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor={`estimate${index + 1}`}>
                List Waktu Olahraga {index + 1}
              </label>
              <input
                type="text"
                name={`estimate${index + 1}`}
                id={`estimate${index + 1}`}
                value={formData.workoutEsts[index] || ""}
                onChange={(event) => handleEstimateInputChange(event, index)}
                required
              />
            </div>
            {index > 0 && (
              <button
                type="button"
                onClick={handleRemoveForm}
                className={classes.removeFormBtn}
              >
                <IoTrash className={classes.removeIcon} size={16} />
                Hapus
              </button>
            )}
          </div>
        ))}

        <div className={classes.addFormBtnWrapper}>
          <button
            type="button"
            className={classes.addFormBtn}
            onClick={handleAddForm}
          >
            <IoAddCircle className={classes.addIcon} size={24} />
            Tambah Lagi
          </button>
        </div>

        <div className={classes.formGroup}>
          <label htmlFor="totalEst">Total Waktu</label>
          <input
            type="text"
            name="totalEst"
            id="totalEst"
            value={formData.totalEst}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="image">Olahraga Thumbnail</label>
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
            onClick={handleDeleteWorkout}
          >
            <IoTrash className={classes.removeIcon} size={16} />
            Delete
          </button>}
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
