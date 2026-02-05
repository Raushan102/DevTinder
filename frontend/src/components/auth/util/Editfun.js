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
  githubRef,
  linkedinRef,
  twitterRef,
  dispatch,
  addUser,
  setNotify,
  navigate,
) {
  const skills = skillsRef.current.value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Construct full URLs from usernames
  const githubUsername = githubRef.current.value.trim();
  const linkedinUsername = linkedinRef.current.value.trim();
  const twitterUsername = twitterRef.current.value.trim();

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
      socialMedia: {
        github: githubUsername ? `https://github.com/${githubUsername}` : "",
        linkedin: linkedinUsername ? `https://linkedin.com/in/${linkedinUsername}` : "",
        twitter: twitterUsername ? `https://twitter.com/${twitterUsername}` : "",
      },
    },
    { withCredentials: true },
  );

  dispatch(addUser(res.data.user));
  setNotify({
    open: true,
    type: "success",
    message: "Profile updated successfully!",
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
    githubRef,
    linkedinRef,
    twitterRef,
  );

  setTimeout(() => {
    navigate("/profile");
  }, 1000);
}

export default handelEditFuncton;
