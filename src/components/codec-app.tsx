import { LinkLab } from "@/components/link-lab";

export function CodecApp() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:px-6 md:py-5">
          <p className="text-xs tracking-[0.22em] text-subtle uppercase">
            Analog · not a dark-photon modem
          </p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0 max-w-2xl">
              <h1 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                Two-field codec
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Tony Eugene Ford. Bits live in Δφ, in the cross term. Public
                intensity may look like noise. Detect-and-stop on excess noise
                in ρ̂ — not a shield, not QCAUS cosmology.
              </p>
            </div>
            <a
              href="/"
              className="text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              QCAUS lab
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6">
        <div className="rounded-xl bg-card p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:p-5">
          <LinkLab />
        </div>

        <footer className="border-t border-border pb-10 pt-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Tony Eugene Ford ·{" "}
            <a
              className="text-foreground underline-offset-2 hover:underline"
              href="mailto:tlcagford@protonmail.com"
            >
              tlcagford@protonmail.com
            </a>
            {" · "}
            <a
              className="text-foreground underline-offset-2 hover:underline"
              href="https://github.com/tlcagford"
            >
              github.com/tlcagford
            </a>
            . Dual licence: academic and non-commercial use is free; commercial
            use needs a licence from the author.
          </p>
          <p className="mt-3">
            Laboratory analog of two coherent modes plus a PDP equalizer. Not
            Holdom conversion, not a dark-photon modem, not a phone plugin.
            Fiber and laser can stand in for CV-QKD. Radio cannot. Heal the
            channel; never the key.
          </p>
        </footer>
      </main>
    </div>
  );
}
