import EmbeddedWrapper from "component/EmbeddedWrapper";
import { TopRightSpinner } from "component/Spinner";
import { useRecordings } from "./recordingsDataProvider";
import Infoline from "component/Infoline";

export default function Recordings() {
  const { loading, recordings } = useRecordings();

  if (!recordings) {
    return null;
  }

  return (
    <EmbeddedWrapper>
      <TopRightSpinner show={loading} />
      <div className="space-y-16">
        {recordings?.map((recording) => (
          <div key={recording.url}>
            <video
              controls
              className="aspect-square w-full bg-light-1 dark:bg-dark-1 border-2 border-light-1 dark:border-dark-1"
            >
              <source src={recording.url} type="video/mp4" />
            </video>
            <Infoline>{recording.name}</Infoline>
          </div>
        ))}
      </div>
    </EmbeddedWrapper>
  );
}
