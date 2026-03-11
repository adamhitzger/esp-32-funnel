import Link from "next/link";
import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { CodeBlock } from "@/components/code-block";
import { urlFor } from "./image";

export const components: Partial<PortableTextComponents> = {
    list: {
        bullet: ({ children }) => (
            <ul className="my-6 ml-6 list-disc space-y-3 text-foreground/80 leading-relaxed">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="my-6 ml-6 list-decimal space-y-3 text-foreground/80 leading-relaxed">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="pl-2 leading-relaxed">{children}</li>
        ),
        number: ({ children }) => (
            <li className="pl-2 leading-relaxed">{children}</li>
        ),
    },
    block: {
        normal: ({ children }) => (
            <p className="mb-6 leading-relaxed text-foreground/80">{children}</p>
        ),
        h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground leading-tight">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-foreground leading-tight">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground leading-snug">
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-foreground leading-snug">
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 className="text-base md:text-lg font-semibold mt-5 mb-2 text-foreground">
                {children}
            </h5>
        ),
        h6: ({ children }) => (
            <h6 className="text-sm md:text-base font-semibold mt-4 mb-2 text-foreground">
                {children}
            </h6>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-8 pl-6 border-l-4 border-electric-cyan/50 italic text-foreground/80 leading-relaxed bg-secondary/30 py-4 pr-4 rounded-r-lg">
                {children}
            </blockquote>
        ),
    },
    marks: {
        em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
        ),
        strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
        ),
        u: ({ children }) => (
            <span className="underline underline-offset-4">{children}</span>
        ),
        strike: ({ children }) => (
            <s className="line-through text-foreground/80/70">{children}</s>
        ),
        code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-secondary text-electric-cyan font-mono text-sm">
                {children}
            </code>
        ),
        link: ({ children, value }) => {
            const ytb: boolean = value.href.startsWith("https://www.youtube.com/embed/");
            if (ytb) {
                return (
                    <div className="my-8">
                        <iframe 
                            src={value?.href} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            className="mx-auto w-full max-w-2xl h-64 md:h-96 rounded-xl border border-border"
                        />
                    </div>
                );
            }
            return (
                <Link 
                    href={value?.href} 
                    className="text-electric-cyan underline underline-offset-4 hover:text-electric-cyan/80 transition-colors"
                >
                    {children}
                </Link>
            );
        }
    },
    types: {
        image: ({ value }: { value: any }) => (
            <figure className="my-8">
                <Image
                    width={800}
                    height={600}
                    src={String(urlFor(value))}
                    alt={value.alt || "ESP32 Blog image"}
                    className="rounded-xl w-full max-w-2xl mx-auto border border-border"
                />
                {value.caption && (
                    <figcaption className="mt-3 text-center text-sm text-foreground/80">
                        {value.caption}
                    </figcaption>
                )}
            </figure>
        ),
        code: ({value}: {value: any}) => (
            <div className="my-8">
                <CodeBlock
                    language={value.language}
                    filename={value.filename || `example.${value.language}`}
                    highlightLines={value.highlightedLines}
                    code={value.code}
                />
            </div>
        )
    },
}