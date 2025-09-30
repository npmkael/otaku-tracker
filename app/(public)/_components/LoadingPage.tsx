import Image from "next/image";

export const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center">
        <Image
          src="/loading-totoro.gif"
          alt="Loading"
          width={100}
          height={100}
        />
        <span className="text-muted-foreground">Loading...</span>
      </div>
    </div>
  );
};
