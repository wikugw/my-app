import { GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { Button } from "../../micro/button/Button";
import { actionCodeSettings, auth } from "../../../firebase";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../micro/input/Input";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

type LoginFormInputs = yup.InferType<typeof schema>;

function LoginView() {

  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", data.email); // save email for later
      alert("Email link sent! Check your inbox or spam.");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input name="email" type="email" label="email" />
          <Button type="submit">
            {isSubmitting ? "Sending..." : "Login with Email"}
          </Button>
        </form>
      </FormProvider>
      <br />
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
    </>
  )
}

export default LoginView