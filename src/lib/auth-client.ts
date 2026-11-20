import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import * as SecureStore from "expo-secure-store";

import { API_BASE_URL } from "@/constants/config";

export const authClient = createAuthClient({
  baseURL: API_BASE_URL,
  plugins: [
    expoClient({
      scheme: "movies-app",
      storagePrefix: "movies-app",
      cookiePrefix: "movies-app",
      storage: SecureStore,
    }),
    emailOTPClient(),
  ],
});
