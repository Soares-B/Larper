import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import {
	HamburgerMenuIcon,
	CheckIcon,
} from "@radix-ui/react-icons";


export default function Menu ({filters, setFilters, theme}: {filters: any, setFilters: any, theme: string}) {

  return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className={`inline-flex size-[35px] w-[40px] items-center justify-center rounded-full ${theme === 'dark' ? 'bg-[var(--background)]' : theme === 'light' ? 'bg-[var(--backgroundLight)]' : 'bg-[var(--backgroundTransparent)]'} ${theme === 'dark' ? 'text-[var(--text)]' : theme === 'light' ? 'text-[var(--textLight)]' : 'text-[var(--textLight)]'} text-violet11 shadow-[0_0px_2px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_5px] hover:cursor-pointer focus:shadow-black m-[0px_20px_20px_0px]`}
					aria-label="Customise options"
				>
					<HamburgerMenuIcon />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="min-w-[220px] rounded-md bg-black text-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade hover:cursor-pointer"
					sideOffset={5}
				>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.anime}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							anime: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Anime{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.manga}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							manga: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Manga{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.game}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							game: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Game{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.book}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							book: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Book{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.serie}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							serie: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Serie{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.movie}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							movie: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Movie{" "}
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						checked={filters.music}
						onCheckedChange={(value) =>
							setFilters((prev: any) => ({
							...prev,
							music: value,
							}))
						}
					>
						<DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
							<CheckIcon />
						</DropdownMenu.ItemIndicator>
						Music{" "}
					</DropdownMenu.CheckboxItem>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}