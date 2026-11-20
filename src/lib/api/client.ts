import { API_BASE_URL } from "@/constants/config";
import { authClient } from "@/lib/auth-client";

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<T> {
  const cookie = await authClient.getCookie();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(payload?.message ?? "Something went wrong", response.status);
  }

  return payload.data as T;
}
