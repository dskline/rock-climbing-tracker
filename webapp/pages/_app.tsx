import type { AppProps } from "next/app";

import "@/features/integrations/tailwind/tailwind.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-200 min-h-screen" id="123">
      <Component {...pageProps} />
    </div>
  );
}
