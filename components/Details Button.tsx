import { useRouter } from "next/navigation";
import { HoverCard } from "radix-ui";
import { CircleAlert } from 'lucide-react';

export default function Details({theme}: {theme: string}){
    const router = useRouter();

    return(
        <HoverCard.Root>
		<HoverCard.Trigger asChild>
		<button
            className={`inline-flex size-[40px] w-[200px] items-center justify-center rounded-[5px] ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} text-md shadow-blackA4 outline-none hover:bg-violet3 hover:cursor-pointer m-[0px_0px_0px_5px]`}
            aria-label="Full Search"
            onClick={() => router.push('/Details')}
        >
            Detailed Search
        </button>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content
				className={`w-fit rounded-md ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}
				sideOffset={5}
			>
				<div className="flex flex-col gap-[7px]">
					<div className="flex flex-col gap-[15px]">
						<div className="m-0 text-[15px] text-mauve12">
							<CircleAlert className="inline scale-[.75]"></CircleAlert> Books and Music are disabled due avaliability of data
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="fill-white" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
    );
}