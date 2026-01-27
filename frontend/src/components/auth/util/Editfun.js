import axios from "axios";
import { BASE_URL } from "../../util/constent";
import reset from "./resetFields";

async function handelEditFuncton(
  skillsRef,
  firstNameRef,
  lastNameRef,
  genderRef,
  ageRef,
  photoUrlRef,
  aboutRef,
  dispatch,
  addUser,
  setNotify,
  navigate,
) {
  const skills = skillsRef.current.value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const res = await axios.patch(
    `${BASE_URL}/profile/edit`,
    {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      gender: genderRef.current.value,
      age: ageRef.current.value ? Number(ageRef.current.value) : undefined,
      photoUrl: photoUrlRef.current.value,
      about: aboutRef.current.value,
      skills,
    },
    { withCredentials: true },
  );
  dispatch(addUser(res.data.user));
  setNotify({
    open: true,
    type: "success",
    message: "profile updated successfully",
  });
  reset(
    firstNameRef,
    lastNameRef,
    genderRef,
    ageRef,
    photoUrlRef,
    aboutRef,
    skillsRef,
  );
  setTimeout(() => {
    navigate("/profile");
  }, 1000);
}

export default handelEditFuncton;
