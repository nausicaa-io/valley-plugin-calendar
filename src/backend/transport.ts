export type CalendarRequest = (url: URL, headers?: Record<string, string>) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>
