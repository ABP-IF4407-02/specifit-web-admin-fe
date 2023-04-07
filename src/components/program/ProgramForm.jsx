import { useState, useEffect, useContext } from "react";
import Dropzone from "react-dropzone";
import classes from "./ProgramForm.module.css";
import { IoTrash, IoAddCircle } from "react-icons/io5";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

function ProgramForm({ id }) {
  const [dayCount, setDayCount] = useState(0);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    ctgList: "",
    desc: "",
    img: null,
    title: "",
    workouts: [[""]],
  });

  const [workoutCards, setWorkoutCards] = useState(null);

  useEffect(() => {
    async function getProgramById() {
      try {
        const response = await axios.get(
          `http://178.128.103.166/api/workoutprogram/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(response.data.data.workouts[0])) {
          setFormData(parseResponse(response.data.data));
          setDayCount(response.data.data.workouts[0].length);
        } else {
          setFormData(response.data.data);
          setDayCount(response.data.data.workouts.length);
        }
        setImagePreview(`http://178.128.103.166/${response.data.data.img}`);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    async function getWorkouts() {
      try {
        const response = await axios.get("http://178.128.103.166/api/workout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkoutCards(response.data.data.data);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }

    getWorkouts();

    if (id) {
      getProgramById();
    }
  }, []);

  function parseResponse(data) {
    const parsedWorkouts = data.workouts[0];
    const parsedCtgList = data.ctgList[0];

    const parsedData = {
      ...data,
      ["workouts"]: parsedWorkouts,
      ["ctgList"]: parsedCtgList,
    };

    return parsedData;
  }

  function convertFormData(data) {
    const newData = new FormData();
    for (let key in data) {
      if (Array.isArray(data[key])) {
        for (let i = 0; i < data[key].length; i++) {
          if (Array.isArray(data[key][i])) {
            // Check if the value is a nested array
            for (let j = 0; j < data[key][i].length; j++) {
              newData.append(`${key}[${i}][]`, data[key][i][j]);
            }
          } else {
            newData.append(`${key}[]`, data[key][i]);
          }
        }
      } else {
        newData.append(key, data[key]);
      }
    }
    return newData;
  }

  async function createProgram(data) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://178.128.103.166/api/workoutprogram",
        data,
        config
      );
      console.log(response.data);
      alert("Create Program Berhasil");
      navigate("/dashboard/program");
    } catch (error) {
      console.error(error);
    }
  }

  async function editProgram(data) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `http://178.128.103.166/api/workoutprogram/edit/${id}`,
        data,
        config
      );
      console.log(response.data);
      alert("Edit Program Berhasil");
      navigate("/dashboard/program");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProgram() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://178.128.103.166/api/workoutprogram/${id}`,
        config
      );
      console.log(response.data);
      alert("Delete Program Berhasil");
      navigate("/dashboard/program");
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
    console.log(formData);

    if (id) {
      // Update
      editProgram(formDataObj);
    } else {
      // Create
      createProgram(formDataObj);
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
    deleteProgram();
    // Navigate to home
    navigate("/dashboard/program");
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
        <div className={classes.formGroup}>
          <label htmlFor="ctgList">Kategori Program</label>
          <input
            type="text"
            name="ctgList"
            id="ctgList"
            value={formData.ctgList}
            onChange={handleInputChange}
            required
          />
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
                    {workoutCards &&
                      workoutCards.map((workout, index) => (
                        <option key={workout._id} value={workout._id}>
                          {index}. {workout.title}
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
