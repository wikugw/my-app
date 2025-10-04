import { Box, Image, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
} from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

import GoogleSvg from '../../../assets/google.svg';
import { actionCodeSettings, auth } from '../../../firebase';
import { Button } from '../../micro/button/Button';
import { Input } from '../../micro/input/Input';
import { Text } from '../../micro/Text';

const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
});

type LoginFormInputs = yup.InferType<typeof schema>;

function LoginView() {
  const methods = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: 'select_account',
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
      window.localStorage.setItem('emailForSignIn', data.email); // save email for later
      alert('Email link sent! Check your inbox or spam.');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={12}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Text variant="paragraphLarge" bold={true}>
        Login
      </Text>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <VStack gap={4} align="stretch" mt={2}>
            <Input name="email" type="email" label="email" />
            <Button type="submit" size={'sm'}>
              {isSubmitting ? 'Sending...' : 'Login with Email'}
            </Button>
          </VStack>
        </form>
      </FormProvider>
      <VStack mt={2} align={'stretch'}>
        <Button size={'sm'} variant="outline" onClick={handleGoogleLogin}>
          <Image src={GoogleSvg} boxSize="20px" />
          Login with Google
        </Button>
      </VStack>
    </Box>
  );
}

export default LoginView;
