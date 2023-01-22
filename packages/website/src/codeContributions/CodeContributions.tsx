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
          <strong>{codeContributions?.trailing30.commits}</strong> commits
          across {codeContributions?.trailing30.repositories} repositories in
          the last 30 days
          <br />
          <span className="text-xs">
            {codeContributions?.trailing30.percentageChange} change on the same
            time last year
          </span>
        </Tile>
        <Tile>
          <Icon component={RiGitCommitLine} />
          <strong>{codeContributions?.year.commits}</strong> commits across{" "}
          {codeContributions?.year.repositories} repositories so far this year
          <br />
          <span className="text-xs">
            {codeContributions?.year.percentageChange} change on the same time
            last year
          </span>
        </Tile>
      </Wall>
    </EmbeddedWrapper>
  );
}
