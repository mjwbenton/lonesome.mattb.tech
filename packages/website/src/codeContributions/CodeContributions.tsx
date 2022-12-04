import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useCodeContributions } from "./codeContributionsDataProvider";

export default function CodeContributions() {
  const { loading, codeContributions } = useCodeContributions();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <strong>{codeContributions?.commits}</strong> Commits
        </Tile>
        <Tile>
          <strong>{codeContributions?.repositoriesCommittedTo}</strong>{" "}
          repositories committed to
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
