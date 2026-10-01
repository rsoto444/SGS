import { permanentRedirect } from "next/navigation";

// Template placeholder. This directory has no /quote page, so it forwards.
export default function Page() {
  permanentRedirect("/get-matched");
}
