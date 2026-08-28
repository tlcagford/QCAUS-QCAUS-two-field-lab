import { createFileRoute } from "@tanstack/react-router";
import { CodecApp } from "@/components/codec-app";

export const Route = createFileRoute("/codec")({
  component: CodecPage,
  head: () => ({
    meta: [
      { title: "Two-field codec" },
      {
        name: "description",
        content:
          "Analog two-mode codec: bits in the interference term, abort on excess noise. Not a dark-photon modem.",
      },
    ],
  }),
});

function CodecPage() {
  return <CodecApp />;
}
