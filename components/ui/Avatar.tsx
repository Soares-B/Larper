
import * as Avatar from "@radix-ui/react-avatar";

export default function AvatarReview({path, name}: {path: string, name: string}){

    return(
        <>
            {path && (<div className="flex gap-5">
                <Avatar.Root className="inline-flex size-[30px] max-[1281px]:size-[25px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                    <Avatar.Image
                        className="size-full rounded-[inherit] object-cover"
                        src={path}
                        alt={name}
                    />
                    <Avatar.Fallback
                        className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
                        delayMs={600}
                    >
                        CT
                    </Avatar.Fallback>
                </Avatar.Root>
            </div>)}
        </>
    );
}
	