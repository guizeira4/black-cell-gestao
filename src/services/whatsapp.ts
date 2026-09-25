/** Server-side adapter contract. Keep provider credentials only in environment variables. */
export type ChargeMessage = { to: string; body: string; installmentId: string; kind: 'due_today' | 'overdue' }
export interface WhatsAppAdapter { send(message: ChargeMessage): Promise<{ id: string }> }
/** Development implementation: does not send anything. Replace in the API route with Cloud API adapter. */
export const mockWhatsApp: WhatsAppAdapter = { async send(message) { console.info('[WhatsApp mock]', message); return { id: `mock-${Date.now()}` } } }
