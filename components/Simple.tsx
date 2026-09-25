import { useRouter } from "next/navigation";

export default function Simple({theme}: {theme: string}){
    const router = useRouter();

    return(
        <button
            className={`inline-flex size-[40px] w-[200px] items-center justify-center rounded-[5px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} text-md shadow-blackA4 outline-none hover:bg-violet3 hover:cursor-pointer m-[0px_0px_0px_5px]`}
            aria-label="Full Search"
            onClick={() => router.push('/')}
        >
            Simple Search
        </button>
    );
}