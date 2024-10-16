import { getHumeAccessToken } from "../../utils/getHumeAccessToken";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("../../components/hume_ai/Chat"), {
  ssr: false,
});

export default async function Page() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error("Failed to get Hume access token");
  }

  console.log("Rendering voice session page");

  return (
    <div className="flex-grow flex flex-col">
      <Chat accessToken={accessToken} />
    </div>
  );
}
