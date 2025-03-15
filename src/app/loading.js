import Image from "next/image"

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">
            <Image alt={`page loader`} src={`/loader.gif`} width={100} height={100} className="w-auto h-auto aspect-square" />
        </div>
    )
}