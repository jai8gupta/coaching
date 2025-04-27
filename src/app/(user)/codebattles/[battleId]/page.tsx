import ClientBattleQuestions from "@/components/codebattles/ClientBattleQuestions";
import React from "react";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    battleId: string;
  }>;
};
export const revalidate = 60

const BattleQuestionsPage = async ({ params }: Props) => {
  const { battleId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return redirect("/codebattles");
  }
  const user_email = session?.user?.email;
  const serverData = await getDataFromServer(battleId, user_email!);


  return <ClientBattleQuestions notEligibility={!serverData?.eligibilty?.success && serverData?.eligibilty?.reason === "NOT_ELIGIBLE"} battleId={battleId} data={serverData?.battles?.data || []} />;
};

export default BattleQuestionsPage;

const getDataFromServer = async (battleId: string, user_email: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_CODEBATTLES_SVC}/api/battles/${battleId}/questions`;
  const response = await fetch(apiUrl, { cache: "no-store" });
  const checkEligiblity = await (await fetch(`${process.env.NEXT_PUBLIC_CODEBATTLES_SVC}/api/battles/eligible`, { 
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      battleId,
      user_email
    })
  })).json();

  const data = {
    battles: await response.json(),
    eligibilty: checkEligiblity
  }
  return data;
};
