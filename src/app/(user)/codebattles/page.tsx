import { Award, Timer, Flame, Code2, CalendarDays, IndianRupee, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60

export default async function CodeBattlesPage() {
  const battles = await getDataFromServer()

  return (
    <div className="min-h-screen bg-background text-white px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary/90 to-[#00FFFF] bg-clip-text text-transparent">
          Code Battles (Please be Signed In to Participate)
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">
          Compete. Learn. Win. Real-time coding quizzes with real cash rewards!
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="border border-border bg-card rounded-xl p-6 text-sm space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <AlertCircle className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Important Disclaimer</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Participation in Code Battles is completely free. We will never ask you to pay
            any fees, share payment details, or make any purchases to claim your rewards.
            All prizes will be sent to winners via the email address used during login.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Official prize communication will only be sent from our verified email:
            <span className="font-semibold text-primary ml-1">
              theprototypestudio4@gmail.com
            </span>
          </p>
          <p className="text-muted-foreground leading-relaxed italic">
            Please stay alert and avoid sharing sensitive information. If you encounter any
            suspicious messages or activities claiming to be from us, report them immediately at
            <span className="font-semibold text-primary ml-1">
              theprototypestudio4@gmail.com
            </span>
          </p>
          <br />
          Good Luck!!
        </div>
      </div>

      {/* Battle Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20 mb-20">
        {battles?.data?.map((battle: any) => (
          <div
            key={battle.id}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            {(() => {
              const isLive = new Date(battle.dateISO).getTime() >= Date.now();
              const status = isLive ? "Live" : "Coming Soon";
              return (
                <span
                  className={`relative top-4 left-4 z-10 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm
                    ${isLive ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-300"}`}
                >
                  {status}
                </span>
              );
            })()}

            {/* Battle Image */}
            {battle?.image && (
              <div className="relative h-40 w-full">
                <Image
                  src={battle.image}
                  alt={battle.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 space-y-4">
              {/* Title */}
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Award className="h-5 w-5 fill-current text-[#00FFFF]" />
                {battle.title}
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {battle.date}
              </div>

              {/* Prize */}
              <div className="flex items-center gap-2 text-sm text-[#00FFFF] font-medium">
                <IndianRupee className="h-4 w-4" />
                {battle.prize}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  {new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                    timeZone: 'UTC',
                  }).format(new Date(battle.dateISO))}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  {battle.level}
                </span>
                {/* <span className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {battle.duration}
                </span> */}
                <span className="flex items-center gap-1">
                  <Code2 className="h-4 w-4" />
                  {battle.type}
                </span>
              </div>

              {/* CTA */}
              {(() => {
                const isLive = new Date(battle.dateISO).getTime() >= Date.now();
                return isLive ? (
                  <Link
                    href={`/codebattles/${battle.id}`}
                    className="inline-block mt-4 px-4 py-2 bg-[#00FFFF] text-black rounded-full text-sm font-semibold hover:brightness-110 transition"
                  >
                    Join Battle
                  </Link>

                ) : (
                  <Link
                    href={`/codebattles`}
                    className="inline-block mt-4 px-4 py-2 bg-[#00FFFF] text-black rounded-full text-sm font-semibold hover:brightness-110 transition"
                  >
                    Upcoming
                  </Link>
                )
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getDataFromServer = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_CODEBATTLES_SVC}/api/battles`
  const response = await fetch(apiUrl);
  const raw = await response.json();

  const transformed = raw?.data?.map((battle: any) => {
    const start = new Date(battle.start_time);
    const end = new Date(battle.end_time);
    const durationMinutes = Math.round((end.getTime() - start.getTime()) / (1000 * 60));

    return {
      id: battle.id,
      title: battle.title,
      dateISO: battle.start_time,
      date: start.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      prize: battle.prize,
      image: battle.image || null,
      duration: `${durationMinutes} min`,
      level: battle?.level || "Intermediate",
      type: battle?.type || "MCQ",
    };
  });

  return { data: transformed };
};
