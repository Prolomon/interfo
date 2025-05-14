import Image from "next/image";
import { images } from "@/constants";
// import { BarLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-auto h-auto inline-grid place-content-center">
        <Image
          unoptimized
          alt={`page loader`}
          src={images.logo}
          width={100}
          height={100}
          className="w-24 h-24 aspect-square mx-auto"
        />
        {/* <BarLoader color="#f59e0b" loading speedMultiplier={1} width={200} /> */}
      </div>
    </div>
  );
}
