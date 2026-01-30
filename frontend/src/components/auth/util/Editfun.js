import axios from "axios";
import { BASE_URL } from "../../util/constent";
import reset from "./resetFields";

async function handelEditFuncton(
  skillsRef,
  firstNameRef,
  lastNameRef,
  genderRef,
  ageRef,
  headlineRef,
  professionRef,
  aboutRef,
  githubRef,      // ✅ NEW
  linkedinRef,    // ✅ NEW
  twitterRef,     // ✅ NEW
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
      headline: headlineRef.current.value,
      profession: professionRef.current.value,
      about: aboutRef.current.value,
      skills,
      // ✅ NEW: Social Media
      socialMedia: {
        github: githubRef.current.value,
        linkedin: linkedinRef.current.value,
        twitter: twitterRef.current.value,
      },
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
    headlineRef,
    professionRef,
    aboutRef,
    skillsRef,
    githubRef,      // ✅ NEW
    linkedinRef,    // ✅ NEW
    twitterRef,     // ✅ NEW
  );

  setTimeout(() => {
    navigate("/profile");
  }, 1000);
}

export default handelEditFuncton;
