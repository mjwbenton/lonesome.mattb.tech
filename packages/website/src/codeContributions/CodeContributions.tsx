import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import Tile, { Wall } from "component/Tile";
import { useCodeContributions } from "./codeContributionsDataProvider";
import { RiGitCommitLine, RiGitRepositoryLine } from "react-icons/ri";
import Icon from "component/Icon";

export default function CodeContributions() {
  const { loading, codeContributions } = useCodeContributions();

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <Wall>
        <Tile>
          <Icon component={RiGitCommitLine} />
          <strong>{codeContributions?.commits}</strong> Commits
        </Tile>
        <Tile>
          <Icon component={RiGitRepositoryLine} />
          <strong>{codeContributions?.repositoriesCommittedTo}</strong>{" "}
          repositories committed to
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
