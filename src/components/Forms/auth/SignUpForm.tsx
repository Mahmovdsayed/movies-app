import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authClient } from '@/lib/auth-client';
import { useToast } from 'heroui-native';
import {
  Host,
  VStack,
  HStack,
  Text,
  TextField,
  SecureField,
  Image,
  Button,
  Spacer,
  useNativeState,
} from '@expo/ui/swift-ui';
import {
  font,
  foregroundStyle,
  textFieldStyle,
  glassEffect,
  padding,
  frame,
  autocorrectionDisabled,
  keyboardType,
  textInputAutocapitalization,
  textContentType,
  buttonStyle,
  controlSize,
  multilineTextAlignment,
} from '@expo/ui/swift-ui/modifiers';
import { signUpSchema } from '@/validations/auth/sign-up.schema';

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const name = useNativeState('');
  const email = useNativeState('');
  const password = useNativeState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (isLoading) return;
    const validation = signUpSchema.safeParse({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (!validation.success) {
      toast.show({
        label: 'Invalid information',
        description: validation.error.issues[0].message,
        variant: 'danger',
        placement: 'top',
      });
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      });

      if (error) {
        toast.show({
          label: 'Sign-up failed',
          description: error.message || 'Could not create account.',
          variant: 'danger',
          placement: 'top',
        });
        return;
      }

      await authClient.emailOtp.sendVerificationOtp({
        email: validation.data.email,
        type: 'email-verification',
      }).catch(() => {});

      toast.show({
        label: 'Account created!',
        description: 'Verification code sent to your email.',
        variant: 'success',
        placement: 'top',
      });

      router.push({
        pathname: '/(auth)/verify-otp',
        params: { email: validation.data.email, type: 'email-verification' },
      });
    } catch (err: unknown) {
      toast.show({
        label: 'Sign-up error',
        description:
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred.',
        variant: 'danger',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Host style={{ width: '100%', height: 400 }}>
      <VStack
        alignment="leading"
        spacing={16}
        modifiers={[
          frame({
            maxWidth: Infinity,
            maxHeight: Infinity,
            alignment: 'center',
          }),
        ]}
      >
        <VStack alignment="leading" spacing={7}>
          <Text
            modifiers={[
              font({ size: 14, weight: 'semibold' }),
              foregroundStyle('primary'),
            ]}
          >
            Full Name
          </Text>

          <HStack
            spacing={12}
            modifiers={[
              frame({ height: 48 }),
              padding({ horizontal: 15 }),
              glassEffect({
                glass: { variant: 'clear', interactive: true },
                shape: 'capsule',
              }),
            ]}
          >
            <Image systemName="person" size={15} color="secondary" />

            <TextField
              placeholder="John Doe"
              text={name}
              modifiers={[
                textFieldStyle('plain'),
                autocorrectionDisabled(),
                textInputAutocapitalization('words'),
                textContentType('name'),
                frame({ maxWidth: Infinity }),
              ]}
            />
          </HStack>
        </VStack>

        <VStack alignment="leading" spacing={7}>
          <Text
            modifiers={[
              font({ size: 14, weight: 'semibold' }),
              foregroundStyle('primary'),
            ]}
          >
            Email address
          </Text>

          <HStack
            spacing={12}
            modifiers={[
              frame({ height: 48 }),
              padding({ horizontal: 15 }),
              glassEffect({
                glass: { variant: 'clear', interactive: true },
                shape: 'capsule',
              }),
            ]}
          >
            <Image systemName="envelope" size={15} color="secondary" />

            <TextField
              placeholder="name@example.com"
              text={email}
              modifiers={[
                textFieldStyle('plain'),
                keyboardType('email-address'),
                autocorrectionDisabled(),
                textInputAutocapitalization('never'),
                textContentType('emailAddress'),
                frame({ maxWidth: Infinity }),
              ]}
            />
          </HStack>
        </VStack>

        <VStack alignment="leading" spacing={7}>
          <Text
            modifiers={[
              font({ size: 14, weight: 'semibold' }),
              foregroundStyle('primary'),
            ]}
          >
            Password
          </Text>

          <HStack
            spacing={12}
            modifiers={[
              frame({ height: 48 }),
              padding({ horizontal: 15 }),
              glassEffect({
                glass: { variant: 'clear', interactive: true },
                shape: 'capsule',
              }),
            ]}
          >
            <Image systemName="lock" size={15} color="secondary" />

            {isPasswordVisible ? (
              <TextField
                placeholder="At least 8 characters"
                text={password}
                modifiers={[
                  textFieldStyle('plain'),
                  autocorrectionDisabled(),
                  textInputAutocapitalization('never'),
                  textContentType('newPassword'),
                  frame({ maxWidth: Infinity }),
                ]}
              />
            ) : (
              <SecureField
                placeholder="At least 8 characters"
                text={password}
                modifiers={[
                  textFieldStyle('plain'),
                  autocorrectionDisabled(),
                  textInputAutocapitalization('never'),
                  textContentType('newPassword'),
                  frame({ maxWidth: Infinity }),
                ]}
              />
            )}

            <Button
              onPress={() => setIsPasswordVisible((visible) => !visible)}
              modifiers={[buttonStyle('plain')]}
            >
              <Image
                systemName={isPasswordVisible ? 'eye.slash' : 'eye'}
                size={15}
                color="secondary"
              />
            </Button>
          </HStack>
        </VStack>

        <Button
          onPress={handleSignUp}
          modifiers={[
            buttonStyle('glassProminent'),
            controlSize('large'),
            frame({ maxWidth: Infinity }),
            frame({ height: 48 }),
          ]}
        >
          <HStack spacing={8}>
            <Spacer />
            <Text modifiers={[font({ size: 15, weight: 'semibold' })]}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Text>
            <Spacer />
          </HStack>
        </Button>

        <Text
          modifiers={[
            font({ size: 11 }),
            foregroundStyle({
              type: 'hierarchical',
              style: 'secondary',
            }),
            multilineTextAlignment('center'),
          ]}
        >
          By creating an account, you agree to our Terms of Service, Privacy
          Policy, and Community Guidelines.
        </Text>
      </VStack>
    </Host>
  );
};

export default SignUpForm;
