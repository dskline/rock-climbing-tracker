// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_PUBLIC_KEY) {
    throw new Error('Missing the .env.local file?');
  }

  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_PUBLIC_KEY
  );

  const { data } = await supabase.from('test_view').select('*');

  if (data) {
    res.status(200).json(data)
  }
}
