import { createClient } from '@insforge/sdk';

// Get these from project configuration
const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL || '';
const insforgeKey = process.env.NEXT_PUBLIC_INSFORGE_KEY || process.env.INSFORGE_API_KEY || '';

export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeKey
});
