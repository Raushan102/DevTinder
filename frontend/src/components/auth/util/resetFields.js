function reset(
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  genderRef,
  ageRef,
  photoUrlRef,
  aboutRef,
  skillsRef,
) {
  firstNameRef?.current && (firstNameRef.current.value = "");
  lastNameRef?.current && (lastNameRef.current.value = "");
  emailRef?.current && (emailRef.current.value = "");
  passwordRef?.current && (passwordRef.current.value = "");
  genderRef?.current && (genderRef.current.value = "");
  ageRef?.current && (ageRef.current.value = "");
  photoUrlRef?.current && (photoUrlRef.current.value = "");
  aboutRef?.current && (aboutRef.current.value = "");
  skillsRef?.current && (skillsRef.current.value = "");
}

export default reset;
