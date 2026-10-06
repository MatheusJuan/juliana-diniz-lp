import Image from "next/image";

// Fundo de bloco com carregamento preguiçoso e redimensionado pelo Next (em vez de CSS background, que baixa tudo de uma vez).
// O pai precisa de `relative isolate`; o recorte herda o arredondamento do pai.
export default function BgImage({
  src,
  sizes,
  position = "center",
  veil,
  className = "",
}: {
  src: string;
  sizes: string;
  position?: string;
  veil?: string; // gradiente CSS opcional por cima da imagem
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] ${className}`}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      {veil && <div className="absolute inset-0" style={{ background: veil }} />}
    </div>
  );
}
