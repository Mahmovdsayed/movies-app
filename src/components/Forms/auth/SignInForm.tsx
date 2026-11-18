
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
import { signInSchema } from '@/validations/auth/sign-in.schema';

const SignInForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const email = useNativeState('');
    const password = useNativeState('');

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        if (isLoading) return;
        const validation = signInSchema.safeParse({
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

            const { data, error } = await authClient.signIn.email({
                email: validation.data.email,
                password: validation.data.password,
            });

            if (error) {
                const isEmailNotVerified =
                    error.code === 'EMAIL_NOT_VERIFIED' ||
                    (error.message && error.message.toLowerCase().includes('not verified')) ||
                    (error.message && error.message.toLowerCase().includes('verification'));

                if (isEmailNotVerified) {
                    await authClient.emailOtp.sendVerificationOtp({
                        email: validation.data.email,
                        type: 'email-verification',
                    }).catch(() => {});

                    toast.show({
                        label: 'Verification required',
                        description: 'Please verify your email to continue.',
                        variant: 'warning',
                        placement: 'top',
                    });

                    router.push({
                        pathname: '/(auth)/verify-otp',
                        params: {
                            email: validation.data.email,
                            type: 'email-verification',
                        },
                    });
                    return;
                }

                toast.show({
                    label: 'Sign-in failed',
                    description: error.message || 'Invalid email or password.',
                    variant: 'danger',
                    placement: 'top',
                });
                return;
            }

            if (data?.user && !data.user.emailVerified) {
                await authClient.signOut().catch(() => {});
                await authClient.emailOtp.sendVerificationOtp({
                    email: validation.data.email,
                    type: 'email-verification',
                }).catch(() => {});

                toast.show({
                    label: 'Verification required',
                    description: 'Please verify your email to continue.',
                    variant: 'warning',
                    placement: 'top',
                });

                router.push({
                    pathname: '/(auth)/verify-otp',
                    params: {
                        email: validation.data.email,
                        type: 'email-verification',
                    },
                });
                return;
            }

            toast.show({
                label: 'Welcome back!',
                description: 'You have signed in successfully.',
                variant: 'success',
                placement: 'top',
            });

            await authClient.getSession();
            router.replace('/(tabs)/home');

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : '';
            const isEmailNotVerified =
                errorMessage.toLowerCase().includes('not verified') ||
                errorMessage.toLowerCase().includes('verification');

            if (isEmailNotVerified) {
                await authClient.emailOtp.sendVerificationOtp({
                    email: validation.data.email,
                    type: 'email-verification',
                }).catch(() => {});

                toast.show({
                    label: 'Verification required',
                    description: 'Please verify your email to continue.',
                    variant: 'warning',
                    placement: 'top',
                });

                router.push({
                    pathname: '/(auth)/verify-otp',
                    params: {
                        email: validation.data.email,
                        type: 'email-verification',
                    },
                });
                return;
            }

            toast.show({
                label: 'Sign-in error',
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
        <Host style={{ width: '100%', height: 330 }}>
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
                    <Text modifiers={[
                        font({ size: 14, weight: 'semibold' }),
                        foregroundStyle('primary'),
                    ]}>
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
                    <Text modifiers={[
                        font({ size: 14, weight: 'semibold' }),
                        foregroundStyle('primary'),
                    ]}>
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
                                placeholder="Enter your password"
                                text={password}
                                modifiers={[
                                    textFieldStyle('plain'),
                                    autocorrectionDisabled(),
                                    textInputAutocapitalization('never'),
                                    textContentType('password'),
                                    frame({ maxWidth: Infinity }),
                                ]}
                            />
                        ) : (
                            <SecureField
                                placeholder="Enter your password"
                                text={password}
                                modifiers={[
                                    textFieldStyle('plain'),
                                    autocorrectionDisabled(),
                                    textInputAutocapitalization('never'),
                                    textContentType('password'),
                                    frame({ maxWidth: Infinity }),
                                ]}
                            />
                        )}

                        <Button
                            onPress={() =>
                                setIsPasswordVisible((visible) => !visible)
                            }
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
                    onPress={handleSignIn}
                    modifiers={[
                        buttonStyle('glassProminent'),
                        controlSize('large'),
                        frame({ maxWidth: Infinity }),
                        frame({ height: 48 }),
                    ]}
                >
                    <HStack spacing={8}>
                        <Spacer />
                        <Text modifiers={[
                            font({ size: 15, weight: 'semibold' }),
                        ]}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Text>
                        <Spacer />
                    </HStack>
                </Button>
                <Text modifiers={[
                    font({ size: 11 }),
                    foregroundStyle({
                        type: 'hierarchical',
                        style: 'secondary',
                    }),
                    multilineTextAlignment('center'),
                ]}>
                    By signing in, you agree to our Terms of Service, Privacy
                    Policy, and Community Guidelines.
                </Text>

            </VStack>
        </Host>
    );
};

export default SignInForm;
