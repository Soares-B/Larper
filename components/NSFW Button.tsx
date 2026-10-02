import { useState } from "react";
import { HoverCard } from "radix-ui";
import { HatGlasses } from "lucide-react";

export default function NSFWButton({theme, NSFW, setNSFW}: {theme: string, NSFW: boolean, setNSFW: any}){
    const [on, setOn] = useState(false)

    return(
        <HoverCard.Root>
		<HoverCard.Trigger asChild>
		    <button
                className={`inline-flex rounded-[5px] max-[1025px]:text-sm w-fit p-3 items-center justify-center ${
                    theme === "dark" ? on ? "bg-[#ffffff66]" : "bg-[#ffffff11]"  : on ? "bg-[#00000066]" : "bg-[#00000022]"
                } ${theme === "dark" ? "text-[var(--text)]" : theme === "light" ? "text-[var(--textLight)]" : "text-[var(--textLight)]"} text-violet11 shadow-blackA4 outline-none hover:bg-violet3 hover:cursor-pointer max-[769px]:scale-[.75]`}
                onClick={() => {
                    setOn(!on)
                    setNSFW(!NSFW)
                }}
                >
                <HatGlasses />
            </button>
		</HoverCard.Trigger>
		<HoverCard.Portal>
			<HoverCard.Content
				className={`w-fit rounded-md ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all`}
				sideOffset={5}
			>
				<div className="flex flex-col gap-[7px]">
					<div className="flex flex-col gap-[15px]">
						<div className="m-0 text-[15px] max-[1025px]:text-xs text-mauve12">
							Enable NSFW Content
						</div>
					</div>
				</div>

				<HoverCard.Arrow className="fill-white" />
			</HoverCard.Content>
		</HoverCard.Portal>
	</HoverCard.Root>
    );
}