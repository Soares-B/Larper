import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import {
    DotFilledIcon
} from "@radix-ui/react-icons";
import { Palette } from "lucide-react";


export default function Theme({theme, setTheme}: {theme: string, setTheme: any}){
    

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className={`inline-flex size-[35px] w-[40px] items-center justify-center rounded-full ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] hover:cursor-pointer focus:shadow-black`}
					aria-label="Customise options"
				>
					<Palette />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={`min-w-[220px] rounded-md ${theme === "dark" ? "bg-[var(--background)]" : theme === "light" ? "bg-[var(--backgroundLight)]" : theme === 'glass' ? "bg-[var(--backgroundGlass)] backdrop-blur-md" : "bg-[var(--backgroundTransparent)] backdrop-blur-md"} p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade`}
					sideOffset={5}
				>
					<DropdownMenu.Label className={`pl-[25px] text-sm leading-[25px] ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'}`}>
						Themes
					</DropdownMenu.Label>
					<DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
						<DropdownMenu.RadioItem
							className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1`}
							value="dark"
						>
							<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							Dark
						</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
							className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1`}
							value="light"
						>
							<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							Light
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem
							className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1`}
							value="glass"
						>
							<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							Glass
						</DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem
							className={`relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1`}
							value="transparent"
						>
							<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
								<DotFilledIcon />
							</DropdownMenu.ItemIndicator>
							Transparent
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>

					<DropdownMenu.Arrow className="fill-white" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
    );
}