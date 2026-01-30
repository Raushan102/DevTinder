function reset(
  firstNameRef,
  lastNameRef,
  emailRef,
  passwordRef,
  genderRef,
  ageRef,
  headlineRef,
  professionRef,
  aboutRef,
  skillsRef,
  githubRef,      // ✅ NEW
  linkedinRef,    // ✅ NEW
  twitterRef,     // ✅ NEW
) {
  firstNameRef?.current && (firstNameRef.current.value = "");
  lastNameRef?.current && (lastNameRef.current.value = "");
  emailRef?.current && (emailRef.current.value = "");
  passwordRef?.current && (passwordRef.current.value = "");
  genderRef?.current && (genderRef.current.value = "");
  ageRef?.current && (ageRef.current.value = "");
  headlineRef?.current && (headlineRef.current.value = "");
  professionRef?.current && (professionRef.current.value = "");
  aboutRef?.current && (aboutRef.current.value = "");
  skillsRef?.current && (skillsRef.current.value = "");
  githubRef?.current && (githubRef.current.value = "");      // ✅ NEW
  linkedinRef?.current && (linkedinRef.current.value = "");  // ✅ NEW
  twitterRef?.current && (twitterRef.current.value = "");    // ✅ NEW
}

export default reset;
