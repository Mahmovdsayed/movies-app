import {
    Host,
    Button,
    HStack,
    Spacer,
    Text,
    Image,
} from '@expo/ui/swift-ui';

import {
    buttonStyle,
    controlSize,
    frame,
} from '@expo/ui/swift-ui/modifiers';
import { useRouter } from 'expo-router';

const JoinViaEmailButton = () => {
    const { push } = useRouter();

    return (
        <Host style={{ width: '100%', height: 44 }}>
            <Button
                onPress={() => push('/(auth)/sign-in')}
                modifiers={[
                    buttonStyle("glassProminent"),
                    controlSize("large"),
                    frame({ maxWidth: Infinity }),
                    frame({ height: 44 }),
                ]}
            >
                <HStack spacing={8}>
                    <Spacer />
                    <Image
                        systemName="envelope.fill"
                        size={16}
                    />
                    <Text>Continue with Email</Text>
                    <Spacer />
                </HStack>
            </Button>
        </Host>
    );
};

export default JoinViaEmailButton;