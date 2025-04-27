import Link from "next/link";

export default function ThankYouPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-background text-white px-6">
        <h1 className="text-4xl font-bold mb-4 text-[#00FFFF]">Thank You!</h1>
        <p className="text-muted-foreground text-lg text-center max-w-md">
          Your answers have been submitted successfully. We appreciate your participation!
        </p>
  
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-[#00FFFF] text-black rounded-full font-semibold hover:brightness-110 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  