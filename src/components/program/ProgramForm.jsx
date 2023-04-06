import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import classes from "./ProgramForm.module.css";
import { programCards } from "../../../dummy_data/program";
import { workoutCards } from "../../../dummy_data/workout";
import { IoTrash, IoAddCircle } from "react-icons/io5";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function ProgramForm({ id }) {
  const [dayCount, setDayCount] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ctgList: [[]],
    desc: "",
    est: "",
    img: null,
    title: "",
    workouts: [[""]],
  });

  // Sementara
  useEffect(() => {
    if (id) {
      setFormData(programCards.find((program) => program.id === parseInt(id)));
      setDayCount(formData.workouts.length);
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

    // Add Categories

    console.log(formData);

    if (id) {
      // Update
    } else {
      // Create
    }
  }

  function handleAddDay() {
    setFormData({
      ...formData,
      workouts: [...formData.workouts, [""]],
    });
    setDayCount(dayCount + 1);
  }

  function handleAddWorkout(index) {
    const newWorkout = [...formData.workouts];
    newWorkout[index] = [...newWorkout[index], ""];
    setFormData({ ...formData, workouts: newWorkout });
  }

  function handleWorkoutInputChange(event, dayIndex, workoutIndex) {
    const newWorkout = [...formData.workouts];
    newWorkout[dayIndex][workoutIndex] = event.target.value;
    setFormData({ ...formData, workouts: newWorkout });
  }

  function handleRemoveDay(index) {
    const workouts = [...formData.workouts];

    workouts.splice(index, 1);

    setFormData({
      ...formData,
      workouts,
    });
    setDayCount(dayCount - 1);
  }

  function handleRemoveWorkout(dayIndex, workoutIndex) {
    const workouts = [...formData.workouts];

    workouts[dayIndex].splice(workoutIndex, 1);

    setFormData({
      ...formData,
      workouts,
    });
  }

  function handleDeleteProgram() {
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
        {formData.workouts.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className={classes.titleGroup}>
              <p className={classes.dayTitle}>Hari {dayIndex + 1}</p>
              {dayIndex > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveDay(dayIndex)}
                  className={classes.removeDayBtn}
                >
                  <IoTrash
                    className={classes.removeIcon}
                    size={16}
                    style={{ paddingLeft: 8 }}
                  />
                </button>
              )}
            </div>

            {day.map((workout, workoutIndex) => (
              <div key={workoutIndex} className={classes.addForm}>
                <div className={classes.formGroup}>
                  <label htmlFor={`workout${workoutIndex + 1}`}>
                    Olahraga {workoutIndex + 1}
                  </label>
                  <select
                    name={`workout${workoutIndex + 1}`}
                    id={`workout${workoutIndex + 1}`}
                    value={day[workoutIndex] || ""}
                    onChange={(event) =>
                      handleWorkoutInputChange(event, dayIndex, workoutIndex)
                    }
                    required
                  >
                    <option value="">--Pilih Olahraga--</option>
                    {workoutCards.map((workout) => (
                      <option key={workout.id} value={workout.id}>
                        {workout.id}. {workout.title}
                      </option>
                    ))}
                  </select>
                  {workoutIndex > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveWorkout(dayIndex, workoutIndex)
                      }
                      className={classes.removeFormBtn}
                    >
                      <IoTrash className={classes.removeIcon} size={16} />
                      Hapus Olahraga
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className={classes.btnGroup}>
              <button
                type="button"
                onClick={() => handleAddWorkout(dayIndex)}
                className={classes.addFormBtn}
              >
                <IoAddCircle className={classes.addIcon} size={16} />
                Tambah Olahraga
              </button>
              <button
                type="button"
                onClick={handleAddDay}
                className={classes.addFormBtn}
              >
                <IoAddCircle className={classes.addIcon} size={16} />
                Tambah Hari
              </button>
            </div>
          </div>
        ))}

        <div className={classes.formGroup}>
          <label htmlFor="est">Total Waktu</label>
          <input
            type="text"
            name="est"
            id="est"
            value={formData.est}
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
          {id && (
            <button
              className={classes.deleteBtn}
              type="button"
              onClick={handleDeleteProgram}
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

export default ProgramForm;
